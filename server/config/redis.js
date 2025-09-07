 

const Redis = require('@upstash/redis');
const dotenv = require('dotenv/config');

// Ensure your environment variables are loaded and present
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing Upstash Redis credentials in .env file');
}

// Create and export the Redis client instance
module.exports= ({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});