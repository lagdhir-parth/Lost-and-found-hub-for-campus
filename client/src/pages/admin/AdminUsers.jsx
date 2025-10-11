import { useEffect, useState } from "react";
import axios from "axios";
// Assuming you create a new component for user rows/cards
import AdminUserCard from "../../Components/AdminUserCard";

const AdminUsers = () => {
  const API = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all users (You'll need a new backend GET route for this too, e.g., /adminAllUsers)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 🚨 You must have a route like this on your backend: router.get('/adminAllUsers', ...) 🚨
      const response = await axios.get(`${API}/auth/adminAllUsers`);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch user list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [API]);

  // 🚨 NEW FUNCTION: Handles user deletion 🚨
  const handleDeleteUser = async (userId) => {
    try {
      // 1. Call the backend delete endpoint
      const response = await axios.delete(`${API}/auth/deleteUser/${userId}`);

      if (response.data.success) {
        // 2. SUCCESS: Update the local state (UI) by filtering out the deleted user
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        alert("User deleted successfully!");
      } else {
        alert(response.data.message || "Failed to delete user.");
      }
    } catch (err) {
      console.error("Client Error deleting user:", err);
      alert("Error connecting to server for user deletion.");
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading users...</div>;
  if (error)
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;

  return (
    <div className="admin-users-list-container">
      <center><h2>Registered Users</h2></center>
      
      {users.length > 0 ? (
        <div className="user-list">
          {users.map((user) => (
            <AdminUserCard
              key={user._id}
              user={user}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
