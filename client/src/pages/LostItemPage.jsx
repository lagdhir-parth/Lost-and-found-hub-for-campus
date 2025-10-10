import { useEffect, useState } from "react";
import ContentBar from "../Components/ContentBar";
import ContentSidePanel from "../Components/ContentSidePanel";
import LostItemCard from "../Components/LostItemCard";
import axios from "axios";
import "../stylesheets/lostItem.css";

const LostItemPage = () => {
  const API = import.meta.env.VITE_API_URL;
  const [items, setItems] = useState([]); // ✅ state for items

  useEffect(() => {
    // ✅ fetch data once when component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API}/item/lostItems`, {withCredentials: true});
        setItems(response.data); // ✅ store array in state
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchItems();
  }, [API]);

  return (
    <div>
      <ContentBar />
      <div className="component-container" style={{ display: "flex" }}>
        <ContentSidePanel />
        <div className="lost-item-main-content">
          <div className="item-list-container">
            {items.map((item) => (
              <LostItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostItemPage;
