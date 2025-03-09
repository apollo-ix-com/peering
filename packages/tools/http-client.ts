"use client";

import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
// import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

// Define the structure of error responses
export interface axiosResponse {
  message?: string;
  errors?: Record<string, string[]>;
  data?: Record<string, string[]>;
}

// API base URL (ensure it's set in `.env.local`)
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/";

// Create Axios instance with default configuration
const Axios = axios.create({
  baseURL: apiUrl,
  timeout: 100000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to add Authorization token
Axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    // const token =
    //   typeof window !== "undefined"
    //     ? localStorage.getItem("authToken")
    //     : cookies().get("authToken")?.value; // For server-side access

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor to handle errors globally
Axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<axiosResponse>) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
        case 403:
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            window.location.href = "/login"; // Redirect on client
          } else {
            redirect("/login"); // Redirect on server
          }
          break;

        case 500:
          console.warn("Server error:", error.response.data);
          break;

        case 400:
          console.warn("Validation errors:", error.response.data.errors);
          break;

        default:
          console.warn("Unexpected error:", error.response.data);
          break;
      }
    } else if (error.request) {
      console.warn("Network error:", error.request);
    } else {
      console.warn("Unexpected error:", error.message);
    }

    return Promise.reject(error);
  },
);

// Reusable HTTP client class
export class HttpClient {
  static async get<T>(
    url: string,
    params?: Record<string, unknown>,
  ): Promise<T> {
    const response = await Axios.get<T>(url, { params });

    return response.data;
  }

  static async post<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    const response = await Axios.post<T>(url, data, config);

    return response.data;
  }

  static async put<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    const response = await Axios.put<T>(url, data, config);

    return response.data;
  }

  static async delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    const response = await Axios.delete<T>(url, config);

    return response.data;
  }

  static async patch<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    const response = await Axios.patch<T>(url, data, config);

    return response.data;
  }

  static async options<T>(
    url: string,
    config?: InternalAxiosRequestConfig,
  ): Promise<T> {
    const response = await Axios.options<T>(url, config);

    return response.data;
  }

  static formatSearchParams(params: Record<string, string>): string {
    return Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&");
  }
}

// Error handling utility functions
export function getFormErrors(error: unknown): string | null {
  if (axios.isAxiosError<axiosResponse>(error)) {
    return error.response?.data.message ?? "An unexpected error occurred";
  }

  return null;
}

export function getFieldErrors(
  error: unknown,
): Record<string, string[]> | null {
  if (axios.isAxiosError<axiosResponse>(error)) {
    return error.response?.data.errors ?? null;
  }

  return null;
}
