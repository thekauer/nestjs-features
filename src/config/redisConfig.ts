export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: Number(process.env.REDIS_TTL),
  max: Number(process.env.REDIS_MAX),
};
