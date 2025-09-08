// context/AuthContext.tsx
import { createContext, useContext, useState, 
  // useEffect, 
  ReactNode, 
  useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AxiosResponse } from "axios";

type AuthContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any |  null;
  loading?: boolean;
  login?: (token: string) => void;
  logout?: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Optional: decode token or fetch user from API
      const userData = { token }; // simplified example
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (token: string) => {
    // optionally store in localStorage/sessionStorage
    localStorage.setItem("auth_token", token);

    console.log("Fetching user session with token:", token);
    const res: AxiosResponse = await api.get(
      "http://localhost:5000/api/auth/session",
      { withCredentials: true }
    );

    setUser(res.data.user);
  };

  const logout = async () => {
    
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("auth_token");
    setUser(null);
    if(location){
      navigate(location);
    } else {
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
