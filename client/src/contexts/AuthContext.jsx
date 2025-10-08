// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
    loading: true,
  });

  // function to check logged in or not
  async function checkAuth() {
    try {
      const res = await axios.get(`${API}/auth/check-auth`, { withCredentials: true });
      setAuth({
        isLoggedIn: res.data.isLoggedIn,
        user: res.data.user || null,
        loading: false,
      });
    } catch (err) {
      setAuth({ isLoggedIn: false, user: null, loading: false });
    }
  }

  useEffect(() => {
    checkAuth(); // check auth on page load
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;
