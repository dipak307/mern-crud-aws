import ioRedis from "ioredis";

const redisClient = new ioRedis({
  host: process.env.REDIS_HOST || "127.0.0.1" || "localhost",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
});


redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
  console.log("Redis connection error:", err);
});

export default redisClient;