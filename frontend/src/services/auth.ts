import api from "./api";

// src/services/auth.ts
export interface LoginResponse {
    token: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
  }
  
  const AUTH_URL = '/auth/login';

  export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
      const res = await api.post(
        AUTH_URL,
        { email, password },
        { withCredentials: true }
      );
      return res.data; // Axios automatically parses JSON
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Axios puts error response inside error.response.data
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  }
  