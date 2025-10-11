import { useState, useEffect } from "react"; // 👈 Import useState and useEffect
import axios from "axios"; // 👈 Import axios
import AdminCard from "../../Components/AdminCard";

const AdminItemList = ({ type }) => {
    // State to store the fetched items
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            
            // Determine the API endpoint based on the 'type' prop
            let endpoint = `${API}/item/adminAllItems`; // Default to fetching all items
            
            // You might want specific endpoints for lost/found later, 
            // but for now, we'll fetch all and filter in the front-end (or filter on the server)
            // For simplicity based on your server route:

            if (type === "lost") {
                // If you had a separate backend route for lost items:
                // endpoint = `${API}/item/adminLostItems`; 
            } else if (type === "found") {
                // If you had a separate backend route for found items:
                // endpoint = `${API}/item/adminFoundItems`;
            }

            try {
                // Fetch all items from the server
                const response = await axios.get(endpoint);
                setItems(response.data);
            } catch (err) {
                console.error("Error fetching admin items:", err);
                setError("Failed to fetch items. Please check the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [API, type]); // Dependency array includes API and type

    // Filter items based on the 'type' prop if we fetched all items
    const filteredItems = items.filter(item => {
        if (type === "all") return true;
        return item.type === type;
    });

    // Handle Loading and Error States
    if (loading) {
        return <div style={{ padding: "20px" }}>Loading items...</div>;
    }

    if (error) {
        return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
    }

    if (filteredItems.length === 0) {
        return <div style={{ padding: "20px" }}>No {type} items found.</div>;
    }


    return (
        <div style={{ padding: "20px" }}>
            <h2>
                {type === "lost"
                    ? "Lost Items"
                    : "Found Items"}
            </h2>

            <div className="admin-item-container">
                {/* 🚨 Use filteredItems array to map over 🚨 */}
                {filteredItems.map((item) => {
                    return <AdminCard key={item._id} item={item} type={item.type} />;
                })}
            </div>
            {/* Removed the redundant paragraph, as the cards should now appear */}
        </div>
    );
};

export default AdminItemList; 