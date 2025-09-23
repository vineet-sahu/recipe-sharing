import api from "./api";
export interface LoginResponse {
    token: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
  }
  
  const AUTH_URL = '/auth/login';
  const SIGNUP_URL = '/auth/signup';

  export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
      const res = await api.post(
        AUTH_URL,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  }

  export async function logoutUser(): Promise<void> {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed", error);
      throw new Error("Logout failed");
    }
  }

  
  export async function registerUser({email, password, name}: {email: string, password: string, name: string}): Promise<LoginResponse> {
    try {
      const res = await api.post(
        SIGNUP_URL,
        { email, password, name },
      );
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || "Sign Up failed";
      throw new Error(message);
    }
  }
  