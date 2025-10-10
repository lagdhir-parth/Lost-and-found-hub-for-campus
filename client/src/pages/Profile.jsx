import axios from "axios";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import "../stylesheets/profile.css";
import userPlaceholderImg from "../assets/user_placeholder.png";
import ProfileNav from "../Components/ProfileNav";

const dummyNotifications = [
  { id: 1, message: "Your Lost Item 'Keys' was found!", time: "2m ago" },
  { id: 2, message: "New user registered in your area.", time: "1h ago" },
  { id: 3, message: "Item #456 status updated to 'Returned'.", time: "5h ago" },
  { id: 4, message: "Your Lost Item 'Keys' was found!", time: "2m ago" },
  { id: 5, message: "New user registered in your area.", time: "1h ago" },
  { id: 6, message: "Item #456 status updated to 'Returned'.", time: "5h ago" },
];

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API}/notification/my`, {
          withCredentials: true,
        });
        // Make sure to access res.data.notifications, not res directly
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, [API]);

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

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // NEW HANDLER: Toggles the notification panel visibility
  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleNotificationClick = async (id) => {
    try {
      // Optional: mark as read in backend
      await axios.patch(
        `${API}/notification/${id}/read`,
        {},
        { withCredentials: true }
      );

      // Remove it immediately from the frontend state
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const notificationCount = notifications.length;

  return (
    <div className="profile-main-content">
      <div className="user-profile">
        <div className="details">
          <p style={{ fontSize: "40px", color: "#eead2b", fontWeight: "900" }}>
            {auth.user.name}
          </p>
          <p>
            <span>Username: </span>
            {auth.user.username}
          </p>
          <p>
            <span>Email: </span>
            {auth.user.email}
          </p>
          {auth.user.m_no ? (
            <p>
              <span>Mobile no.: </span>
              {auth.user.m_no}
            </p>
          ) : (
            ""
          )}
          <div className="profile-btns">
            <button className="profile-logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="profile-notification-btn"
              aria-label={`You have unread notifications`}
              onClick={togglePanel}
            >
              <span className="notification-badge">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
              <i className="fa-solid fa-bell" style={{ color: "#40260b" }}></i>
            </button>
            {isPanelOpen && (
              <div className="notification-panel">
                <h4>Notifications</h4>
                {notificationCount === 0 ? (
                  <p className="no-notifications">No new notifications.</p>
                ) : (
                  <ul className="notification-list">
                    {notifications.map((notif) => (
                      <li
                        key={notif._id}
                        onClick={() => handleNotificationClick(notif._id)}
                        className="notification-item"
                      >
                        <p>{notif.message}</p>
                        <span className="notification-time">
                          {notif.createdAt}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="avatar">
          <img src={userPlaceholderImg} />
        </div>
      </div>
      <ProfileNav />

      <Outlet />
    </div>
  );
};

export default Profile;
