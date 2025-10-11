// src/pages/AdminPanel.jsx
import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "../../Components/AdminNavbar";

const AdminPanel = () => {
  // 1. Get the current location object
  const location = useLocation();

  // 2. Check if the current pathname starts with "/admin"
  const isAdminLanding = location.pathname === ("/admin")
  return (
    <div className="admin-panel">
      <AdminNavbar />
      {isAdminLanding && <div className="admin-landing-msg">
        This is Admin Page.
      </div>}
      
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
