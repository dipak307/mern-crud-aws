import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";

const productWorker = new Worker(
  "productQueue",
  async (job) => {
    console.log("Processing job:", job.name);
    console.log("Job data:", job.data);

    // simulate heavy task
    await new Promise((res) => setTimeout(res, 3000));

    console.log("Product job completed");
  },
  {
    connection: redisConnection,
  }
);

productWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

productWorker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed`, err);
});
