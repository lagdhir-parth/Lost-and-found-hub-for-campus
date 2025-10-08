import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import "../stylesheets/profile.css";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API}/auth/logout`);
      navigate("/");
      setTimeout(() => {
        setAuth({
          isLoggedIn: false,
          loading: false,
          user: null,
        });
      }, 1);
    } catch (error) {}
  };

  return (
    <div style={{ fontSize: "30px" }}>
      This is profile page
      <i className="fa-solid fa-user" style={{ color: "#FFD43B" }}></i>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button className="profile-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
