// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPages.css";
const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default LogOut;
