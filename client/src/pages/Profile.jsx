import axios from "axios";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import "../stylesheets/profile.css";
import userPlaceholderImg from "../assets/user_placeholder.png";
import ProfileNav from "../Components/ProfileNav";
import UserItems from "./userItemPages/userItems";
import UserFoundItem from "./userItemPages/UserFoundItem";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

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
    <div className="profile-main-content">
      <div className="user-profile">
        <div className="details">
          <p style={{fontSize: '40px', color: '#eead2b', fontWeight:'900'}}>{auth.user.name}</p>
          <p><span>Username: </span>{auth.user.username}</p>
          <p><span>Email: </span>{auth.user.email}</p>
          {auth.user.m_no ? <p><span>Mobile no.: </span>{auth.user.m_no}</p> : ""}
          <button className="profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="avatar">
          <img src={userPlaceholderImg} />
        </div>
      </div>
        <ProfileNav/>

      <Outlet/>
    </div>
  );
};

export default Profile;
