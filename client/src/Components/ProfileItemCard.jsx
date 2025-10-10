import { useContext } from "react";
import "../stylesheets/ItemCard.css";
import { AuthContext } from "../contexts/AuthContext";

const ProfileItemCard = ({ item }) => {
  const API = import.meta.env.VITE_API_URL;
  const imageUrl = item.img ? `${API}${item.img}` : "/placeholder.jpg";

  // Define a style for the badge based on the item type
  const typeBadgeClass = item.type === "lost" ? "lost-badge" : "found-badge";

  return (
    <div className="item-card">
      <div className={`item-type-badge ${typeBadgeClass}`}>
        {item.type ? item.type.toUpperCase() : "ITEM"}
      </div>

      <div className="item-image-container">
        {/* Use the public path stored in the database */}
        <img src={imageUrl} alt={item.itemName} className="item-image" />
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.itemName || "Untitled Item"}</h3>

        <p className="item-location">
          <i className="fa-solid fa-location-dot"></i>
          Location: <span>{item.location || "Unknown"}</span>
        </p>

        <p className="item-description">
          {item.description
            ? item.description.substring(0, 100) +
              (item.description.length > 100 ? "..." : "")
            : "No description provided."}
        </p>

        <div className="item-category-section">
          <i className="fa-solid fa-tag"></i>
          <span className="item-category-label">Category:</span>
          <span className="item-category-value">{item.category}</span>
        </div>

        <div
          className="isReturned-div"
          style={{
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.isReturned ? (
            <h3 style={{ color: "green" }}>Returned</h3>
          ) : (
            <h3 style={{ color: "red" }}>Not Returned</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileItemCard;
