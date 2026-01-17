import { Queue } from "bullmq";
import  redisConnection  from "../config/redis.js";

const productQueue = new Queue("productQueue", {
    connection: redisConnection,
});
export default productQueue;

