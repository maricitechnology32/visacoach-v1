// server/queues/interviewQueue.js
const { Queue } = require('bullmq');

// NOTE: In production, Redis connection details would come from your .env file
const redisConnection = {
  host: '127.0.0.1',
  port: 6379,
};

const interviewQueue = new Queue('interviews', { connection: redisConnection });

module.exports = interviewQueue;