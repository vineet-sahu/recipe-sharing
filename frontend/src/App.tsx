import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Navbar } from "./components/UI/navbar";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/routes";
import GlobalLoader from "./components/GlobalLoader";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalLoader />
        <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
          <Navbar />
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
