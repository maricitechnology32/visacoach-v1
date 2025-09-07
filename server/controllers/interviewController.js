
// const InterviewSession = require('../models/interviewSessionModel');
// const Profile = require('../models/profileModel');
// const interviewQueue = require('../queues/interviewQueue');
// const axios = require('axios');
// // 

// /**
//  * @desc    Start a new interview session and get Vapi config
//  * @route   POST /api/interviews/start
//  * @access  Private (Student)
//  */
// const startInterviewSession = async (req, res) => {
//   try {
//     const student = req.user;

//     const profile = await Profile.findOne({ user: student._id });
//     if (!profile || !profile.university || !profile.major) {
//       return res.status(400).json({ message: 'Please complete your profile before starting an interview.' });
//     }

//     const session = await InterviewSession.create({
//       student: student._id,
//       consultancy: student.consultancy,
//     });

//     // ==> THIS IS THE FINAL, CORRECT CONFIGURATION <==
//     const vapiConfig = {
//       assistantId: "bc3f0c24-5c87-4c15-87a9-73a893090a40", // Your actual Assistant ID
//       assistant: {
//         metadata: {
//           interviewSessionId: session._id.toString(),
//         },
//         // Vapi will merge these values into your system prompt template
//         variableValues: {
//           university: profile.university,
//           major: profile.major,
//           fundingSource: profile.fundingSource
//         }
//       }
//     };

//     res.status(200).json(vapiConfig);

//   } catch (error) {
//     console.error('Error starting interview session:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// /**
//  * @desc    Handle incoming webhooks from Vapi
//  * @route   POST /api/interviews/webhook
//  * @access  Private (Verified by Vapi JWT)
//  */
// const handleVapiWebhook = async (req, res) => {
//   const { message } = req.body;
//   try {
//     if (message.type === 'end-of-call') {
//       await interviewQueue.add('analyze_interview', {
//         type: 'analyze_interview',
//         data: {
//           interviewSessionId: message.call.metadata.interviewSessionId,
//           transcript: message.transcript, // Pass the final transcript to the job
//         }
//       });
//     }
//     res.status(200).send();
//   } catch (err) {
//     res.status(500).send();
//   }
// };

// module.exports = {
//   startInterviewSession,
//   handleVapiWebhook,
// };

const InterviewSession = require('../models/interviewSessionModel');
const Profile = require('../models/profileModel');
const interviewQueue = require('../queues/interviewQueue');
const redis = require('../config/redis')
/**
 * @desc    Start a new interview session and get Vapi config
 * @route   POST /api/interviews/start
 * @access  Private (Student)
 */
const startInterviewSession = async (req, res) => {
  try {
    const student = req.user;

    // 1. Define a unique cache key for the student's profile
    const cacheKey = `profile:${student._id}`;
    let profile;

    // 2. Check Redis cache first
    const cachedProfile = await redis.get(cacheKey);

    if (cachedProfile) {
      // CACHE HIT: Profile found in Redis
      console.log(`CACHE HIT for user: ${student._id}`);
      profile = JSON.parse(cachedProfile);
    } else {
      // CACHE MISS: Profile not found, fetch from the database
      console.log(`CACHE MISS for user: ${student._id}. Fetching from DB.`);
      profile = await Profile.findOne({ user: student._id });

      if (profile) {
        // Save the profile to Redis for future requests. Expire in 1 hour (3600s).
        await redis.set(cacheKey, JSON.stringify(profile), { ex: 3600 });
      }
    }

    // 3. Validate the profile
    if (!profile || !profile.university || !profile.major) {
      return res.status(400).json({ message: 'Please complete your profile before starting an interview.' });
    }

    // 4. Create the interview session
    const session = await InterviewSession.create({
      student: student._id,
      consultancy: student.consultancy,
    });

    // 5. Prepare the Vapi configuration
    const vapiConfig = {
      assistantId: "bc3f0c24-5c87-4c15-87a9-73a893090a40",
      assistant: {
        metadata: {
          interviewSessionId: session._id.toString(),
        },
        variableValues: {
          university: profile.university,
          major: profile.major,
          fundingSource: profile.fundingSource,
        },
      },
    };

    res.status(200).json(vapiConfig);

  } catch (error) {
    console.error('Error starting interview session:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Handle incoming webhooks from Vapi
 * @route   POST /api/interviews/webhook
 * @access  Private (Verified by Vapi JWT)
 */
const handleVapiWebhook = async (req, res) => {
  const { message } = req.body;
  try {
    if (message.type === 'end-of-call') {
      await interviewQueue.add('analyze_interview', {
        type: 'analyze_interview',
        data: {
          interviewSessionId: message.call.metadata.interviewSessionId,
          transcript: message.transcript,
        },
      });
    }
    res.status(200).send();
  } catch (err) {
    console.error('Error handling Vapi webhook:', err);
    res.status(500).send();
  }
};

module.exports = {
  startInterviewSession,
  handleVapiWebhook,
};