import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const login = () => {
    localStorage.setItem("isAuth", "true");
    setIsAuthenticated(true);
    navigate("/Telehealth/");
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    setIsAuthenticated(false);
    navigate("/Telehealth/signin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
