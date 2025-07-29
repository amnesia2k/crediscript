import axios, { AxiosError } from "axios";
import { getCookie } from "./get-cookie";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((c) => {
  // const token = localStorage.getItem("token");
  const token = getCookie("token");

  if (token) {
    c.headers.Authorization = `Bearer ${token}`;
  }

  return c;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event("force-logout"));
      // localStorage.removeItem("token");
      // window.location.href = "/secret/login";
    }

    return Promise.reject(error);
  }
);

export const postData = async <T>(path: string, data: unknown): Promise<T> => {
  const res = await api.post<T>(path, data);

  return res.data;
};

export const fetchData = async <T>(path: string): Promise<T> => {
  const res = await api.get(path);

  return res.data;
};

export const updateData = async <T>(
  path: string,
  data: unknown
): Promise<T> => {
  const res = await api.patch(path, data);

  return res.data;
};

export const deleteData = async <T>(path: string): Promise<T> => {
  const res = await api.delete(path);

  return res.data;
};

export function extractApiError(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    (error as AxiosError).response
  ) {
    const axiosError = error as AxiosError;

    const message =
      (axiosError.response?.data as { message: string })?.message ??
      axiosError.response?.statusText ??
      "Unknown server error";

    return message;
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong";
}
