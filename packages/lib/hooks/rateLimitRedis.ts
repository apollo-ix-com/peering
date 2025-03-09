// import { createClient } from "redis";

// const RATE_LIMIT = 100; // Max requests
// const WINDOW_SIZE = 60 * 1000; // 1 minute window

// // Create a Redis client
// const redisClient = createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379", // Use environment variable for Redis URL
// });

// // Connect to Redis (only once)
// redisClient.on("error", (err) => console.error("Redis Client Error:", err));

// redisClient
//   .connect()
//   .catch((err) => console.error("Failed to connect to Redis:", err));

// /**
//  * Rate limit function to check if a request is allowed.
//  * @param ip - The IP address of the user.
//  * @returns {Promise<boolean>} - `true` if the request is allowed, `false` if rate-limited.
//  */
// export async function rateLimit(ip: string): Promise<boolean> {
//   const userKey = `rate_limit:${ip}`;

//   try {
//     const data = await redisClient.get(userKey);

//     if (!data) {
//       // First request: set the key with an expiration time
//       await redisClient.setEx(userKey, WINDOW_SIZE / 1000, "1");
//       return true; // Allow the request
//     } else {
//       const count = parseInt(data, 10);

//       if (count >= RATE_LIMIT) {
//         return false; // Rate limit exceeded
//       } else {
//         await redisClient.incr(userKey); // Increment the request count
//         return true; // Allow the request
//       }
//     }
//   } catch (err) {
//     console.error("Error in rateLimit function:", err);
//     throw err; // Re-throw the error for handling in the API route
//   }
// }
