import { useState, useEffect } from "react";
import ItemCard from "../../Components/ItemCard";
import axios from "axios";
import '../../stylesheets/Profile/useritems.css'
import ProfileItemCard from "../../Components/ProfileItemCard";

const UserLostItems = () => {
  const API = import.meta.env.VITE_API_URL;
  const [items, setItems] = useState([]); // ✅ state for items

  useEffect(() => {
    // ✅ fetch data once when component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API}/item/userLostItems`, {
          withCredentials: true,
        });
        setItems(response.data); // ✅ store array in state
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };
    fetchItems();
  }, [API]);
  return (
    <div className="user-items-container">
      {items.map((item) => (
        <ProfileItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default UserLostItems;
