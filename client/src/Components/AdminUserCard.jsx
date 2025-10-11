import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = ({ user, onDelete }) => {
  const API = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // 🚨 Use the newly created backend route 🚨
      const response = await axios.get(`${API}/auth/adminAllUsers`);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch user list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [API]); // Run once when the component mounts

  // --- Conditional Rendering ---
  if (loading) return <div style={{ padding: "20px" }}>Loading users...</div>;
  if (error)
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;

  // --- Main Content ---
  return (
    <div className="admin-users-list-container" style={{ padding: "20px" }}>
      {/* <h2>Registered Users ({users.length})</h2> */}
      {users.length > 0 ? (
        <div className="admin-user-div">
          <p>
            <span style={{ color: "#eead2b" }}>Name: </span>
            {user.name}
          </p>
          <p>
            <span style={{ color: "#eead2b" }}>Username: </span>
            {user.username}
          </p>
          <p>
            <span style={{ color: "#eead2b" }}>Email: </span>
            {user.email}
          </p>
          {user.m_no ? (
            <p>
              <span style={{ color: "#eead2b" }}>Mobile no.: </span>
              {user.m_no}
            </p>
          ) : (
            ""
          )}

          <button
            className="admin-delete-btn"
            onClick={() => onDelete(user._id)}
            style={{width:'215px'}}
          >
            Delete User
          </button>
        </div>
      ) : (
        <p>No registered users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
