// server/jobs/interviewProcessor.js
const { Worker } = require('bullmq');
const axios = require('axios');
const InterviewSession = require('../models/interviewSessionModel');

const redisConnection = { host: '127.0.0.1', port: 6379 };

const interviewProcessor = new Worker('interviews', async (job) => {
  const { type, data } = job.data;

  if (type === 'process_turn') {
    // --- Logic for handling a single conversational turn ---
    const { interviewSessionId, chatHistory } = data;

    // 1. Call OpenRouter to get the next AI response
    const openRouterResponse = await axios.post(/* ... same API call as before ... */);
    const aiResponseText = openRouterResponse.data.choices[0].message.content;

    // 2. Update the database with the latest turn
    await InterviewSession.findByIdAndUpdate(interviewSessionId, {
      $push: {
        transcript: {
          $each: [
            { speaker: 'user', text: chatHistory[chatHistory.length - 1].content },
            { speaker: 'assistant', text: aiResponseText }
          ]
        }
      },
      status: 'in-progress'
    });

    // Vapi requires a specific response format from the webhook
    // Since this worker is detached, we can't respond directly.
    // The controller handles the immediate response. This worker just does the DB work.

  } else if (type === 'analyze_interview') {
    // --- Logic for generating final feedback after the call ends ---
    const { interviewSessionId } = data;
    const session = await InterviewSession.findById(interviewSessionId);

    const fullTranscript = session.transcript.map(t => `${t.speaker}: ${t.text}`).join('\n');

    const feedbackPrompt = `You are an expert visa interview coach. Analyze the following F-1 visa interview transcript. Provide a detailed, constructive review as a JSON object.
    
    Transcript:
    ${fullTranscript}
    
    Your JSON output must have this structure:
    {
      "overallScore": <a number from 0 to 100 assessing readiness>,
      "feedback": {
        "strengths": "<A paragraph on what the student did well, e.g., clear goals, strong ties.>",
        "weaknesses": "<A paragraph on areas for improvement, e.g., vague answers on funding, hesitation.>",
        "redFlags": ["<A bullet point for a potential red flag>", "<another bullet point>"]
      },
      "suggestedAnswers": [
        {
          "question": "<A specific question the user struggled with>",
          "suggestion": "<A model answer or key points to include>"
        }
      ]
    }`;

    const feedbackResponse = await axios.post(/* ... call to OpenRouter with feedbackPrompt, using a powerful model like gpt-4o ... */);
    const feedbackData = JSON.parse(feedbackResponse.data.choices[0].message.content);

    // Update the session with the generated feedback and score
    await InterviewSession.findByIdAndUpdate(interviewSessionId, {
      status: 'completed',
      feedback: JSON.stringify(feedbackData), // Store as a JSON string
      score: feedbackData.overallScore
    });
  }
}, { connection: redisConnection });

console.log('Interview job processor started. 🚀');

module.exports = interviewProcessor;