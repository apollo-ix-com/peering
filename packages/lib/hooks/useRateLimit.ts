// import { useState, useRef } from "react";

// const MAX_REQUESTS = 5; // Maximum allowed API calls
// const REQUEST_RESET_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

// interface RequestLimits {
//   count: number;
//   firstRequestTimestamp: number;
// }

// const useRateLimit = () => {
//   const [error, setError] = useState<string | null>(null); // To show error if limit is reached
//   const requestLimits = useRef<RequestLimits>({
//     count: 0,
//     firstRequestTimestamp: 0,
//   });

//   // Function to update limits and store in localStorage
//   const updateRequestLimits = (newCount: number) => {
//     const newLimits = {
//       count: newCount,
//       firstRequestTimestamp:
//         newCount === 1
//           ? Date.now()
//           : requestLimits.current.firstRequestTimestamp,
//     };
//     requestLimits.current = newLimits;
//     localStorage.setItem("requestLimits", JSON.stringify(newLimits));
//   };

//   // Function to check if the rate limit has been reached
//   const checkRateLimit = (): boolean => {
//     const { count, firstRequestTimestamp } = requestLimits.current;

//     // If the request count exceeds the limit
//     if (count >= MAX_REQUESTS) {
//       const timeSinceFirstRequest = Date.now() - firstRequestTimestamp;

//       // If the request is within the reset time window
//       if (timeSinceFirstRequest < REQUEST_RESET_TIME) {
//         const remainingTime = Math.ceil(
//           (REQUEST_RESET_TIME - timeSinceFirstRequest) / (1000 * 60) // Time in minutes
//         );
//         setError(
//           `API call limit reached. Please try again in ${remainingTime} minute(s).`
//         );
//         return false;
//       } else {
//         // Reset the counter after the window resets
//         updateRequestLimits(0);
//       }
//     }

//     return true; // Rate limit not reached
//   };

//   return {
//     error,
//     checkRateLimit,
//     updateRequestLimits,
//     count: requestLimits.current.count,
//   };
// };

// export default useRateLimit;
