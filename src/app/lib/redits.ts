import Redis from 'ioredis';

const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL, {
  password: process.env.UPSTASH_REDIS_PASSWORD,
});

export default redis;
