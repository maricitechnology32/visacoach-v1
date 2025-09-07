const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const Sop = require('../models/sopModel');

// @desc    Submit an SOP file for AI review
// @route   POST /api/sop/review
// @access  Private (Student)
const reviewSop = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an SOP file.' });
  }

  let sopText = '';
  const filePath = req.file.path;

  try {
    // 1. Extract text from the uploaded file
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      sopText = data.text;
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || req.file.mimetype === 'application/msword') {
      const result = await mammoth.extractRawText({ path: filePath });
      sopText = result.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type.' });
    }

    if (sopText.trim().length < 50) {
      return res.status(400).json({ message: 'Extracted text is too short. Please upload a valid SOP.' });
    }

    // 2. The "magic" prompt that instructs the AI
    const systemPrompt = `You are an expert university admissions officer reviewing a Statement of Purpose for an international student. Analyze the provided text based on several criteria: clarity, structure, tone, and grammar. Provide a detailed, constructive review.

    Your final output MUST be a valid JSON object with the following structure, and nothing else:
    {
      "overallScore": <a number from 0 to 100>,
      "strengths": "<a brief paragraph on what the student did well>",
      "areasForImprovement": ["<a bullet point for improvement>", "<another bullet point>"],
      "toneAnalysis": "<a short analysis of the tone, e.g., 'Professional and confident'>",
      "grammarCorrections": [
        {
          "original": "<the original sentence with an error>",
          "corrected": "<the corrected sentence>",
          "explanation": "<a brief explanation of the correction>"
        }
      ]
    }`;

    // 3. Call the OpenRouter API
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        response_format: { type: "json_object" },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: sopText }
        ],
      },
      {
        headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
      }
    );

    const reviewData = JSON.parse(response.data.choices[0].message.content);

    // 4. Save the SOP (with extracted text) and its review
    const newSop = await Sop.create({
      student: req.user.id,
      consultancy: req.user.consultancy,
      content: sopText,
      review: reviewData,
    });

    res.status(201).json(newSop);
  } catch (error) {
    console.error('Error during SOP review:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to process the SOP file.' });
  } finally {
    // 5. Clean up: Delete the temporary file from the server
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting temporary SOP file:", err);
    });
  }
};

// @desc    Get a student's SOP submission history
// @route   GET /api/sop/history
// @access  Private (Student)
const getSopHistory = async (req, res) => {
  try {
    const history = await Sop.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const generateSop = async (req, res) => {
  const { university, major, background, goals } = req.body;

  if (!university || !major || !background || !goals) {
    return res.status(400).json({ message: 'All fields are required to generate a draft.' });
  }

  const systemPrompt = `You are an expert academic advisor. A student has provided the following points for their Statement of Purpose. Write a compelling, structured, and professional SOP draft of about 400-500 words based on their input. The tone should be confident but humble.

  **Student's Input:**
  - University and Program: ${university}, ${major}
  - Background and Key Experiences: ${background}
  - Future Goals After Graduation: ${goals}
  
  Structure the output into an introduction, 2-3 body paragraphs, and a conclusion.`;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
      },
      {
        headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
      }
    );

    const sopDraft = response.data.choices[0].message.content;
    res.status(200).json({ draft: sopDraft });

  } catch (error) {
    console.error('Error with SOP generation API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to generate SOP draft.' });
  }
};

module.exports = { reviewSop, getSopHistory, generateSop };