// import { HttpClient } from "@/packages/tools/http-client";
// import useRateLimit from "@/packages/lib/hooks/useRateLimit";

export const API_ENDPOINTS = {
  PEERING: "peering",
  PEERING_REQUEST: "peerings/request",
};

export interface API_Response<T> {
  status: boolean;
  message: string;
  data: T; // Use a generic type for data
}

export interface NodeFormType {
  id: string;
  nodeId: string;
}

export interface NodeFormInputType {
  nodeId: string;
}

// // Reusable function for API call
// export const updateNodeId = async (data: NodeFormType, uuidId: string) => {
//   try {
//     const response = await HttpClient.put<API_Response<NodeFormInputType>>(
//       `${API_ENDPOINTS.PEERING_REQUEST}/${uuidId}`,
//       data
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
// export const updateNodeId = async (data: any, uuidId: string) => {
//   const { checkRateLimit, error, updateRequestLimits, count } = useRateLimit();

//   // Check if the rate limit allows the request to proceed
//   if (!checkRateLimit()) {
//     throw new Error(error || "Rate limit exceeded");
//   }

//   try {
//     // Call the API
//     const response = await HttpClient.put<API_Response<NodeFormInputType>>(
//       `${API_ENDPOINTS.PEERING_REQUEST}/${uuidId}`,
//       data
//     );

//     // Update request count after a successful API call
//     updateRequestLimits(count + 1);

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
