import { useEffect, useState } from "react";
import AdminCard from "../../Components/AdminCard";
import axios from "axios";

// 🚨 FIX 1: Component should accept props if it needs to use them.
// However, since it's "All Items," we can just remove 'type' from the return message.
const AdminAllItemList = () => {
  const API = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]); // Renamed 'item' to 'items' for clarity
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API}/item/adminAllItems`);
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching admin items:", err);
        setError("Failed to fetch all items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [API]);

  // Render loading/error states
  if (loading) {
    return <div style={{ padding: "20px" }}>Loading all items...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
  }

  const handleDeleteItem = async (itemId) => {
    try {
      // 1. Call the backend delete endpoint
      const response = await axios.delete(`${API}/item/deleteItem/${itemId}`);

      if (response.data.success) {
        // 2. SUCCESS: Update the local state (UI) by filtering out the deleted item
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );

        // Optional: Show a success message to the admin
        alert("Item deleted successfully!");
      } else {
        alert(response.data.message || "Failed to delete item.");
      }
    } catch (err) {
      console.error("Client Error deleting item:", err);
      alert("Error connecting to server for deletion.");
    }
  };

  return (
    <div className="admin-main-container">
      <h2>All items</h2>

      <div className="admin-item-container">
        {/* Check if items array is populated before mapping */}
        {items.length > 0 ? (
          items.map((item) => {
            // FIX 2: Ensure AdminCard receives the item's type for the delete button text
            return <AdminCard key={item._id} item={item} onDelete={handleDeleteItem}/>;
          })
        ) : (
          <p>No items found in the database.</p>
        )}
      </div>
      {/* 🚨 FIX 3: Remove the 'type' variable reference since it doesn't exist 🚨 */}
      <p>List of all items in the system.</p>
    </div>
  );
};

export default AdminAllItemList;
