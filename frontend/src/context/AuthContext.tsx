import { createContext, useContext, useState, 
  ReactNode, 
  useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AxiosResponse } from "axios";

type AuthContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any |  null;
  loading?: boolean;
  afterLogin?: () => void;
  afterLogout?: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSession = async () => {
    try {
      const res: AxiosResponse = await api.get(
        "/auth/session"
      );
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch session", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }
, []);

  const afterLogout = async () => {
    try {
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, afterLogin: fetchSession, afterLogout, loading }}>
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
