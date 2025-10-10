import { useContext, useState } from "react";
import "../stylesheets/ItemCard.css";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const ItemCard = ({ item }) => {
  const API = import.meta.env.VITE_API_URL;
  const imageUrl = item.img ? `${API}${item.img}` : "/placeholder.jpg";

  // Define a style for the badge based on the item type
  const typeBadgeClass = item.type === "lost" ? "lost-badge" : "found-badge";

  const { auth } = useContext(AuthContext);

  const [isClicked, setIsClicked] = useState(false);

  const [isCurrentUserPoster, setIsCurrentUserPoster] = useState(
    auth.user && item.postedBy && auth.user._id === item.postedBy._id
  );

  useEffect(() => {
    setIsCurrentUserPoster(
      auth.user && item.postedBy && auth.user._id === item.postedBy._id
    );
  });

  const handleClick = async () => {
    if (!auth.isLoggedIn) {
      alert("You must be logged in to claim an item!");
      return;
    }
    setIsClicked(true);

    try {
      const response = await axios.post(
        `${API}/notification/ask-claim`,
        {
          itemId: item._id,
          ownerId: item.postedBy._id,
        },
        { withCredentials: true } // include cookies for session
      );

      if (response.data.success) {
        alert("Claim request sent to the item owner!");
      } else {
        setIsClicked(false);
      }
    } catch (error) {
      console.error("Error sending claim request:", error);
      alert("Failed to send claim request");
    }
  };

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
          className="user-details"
          style={{
            marginTop: "10px",
            borderTop: "1px solid gray",
            padding: "7px 0",
          }}
        >
          <strong>Contact for item:</strong>
          <p>Name: {item.postedBy.name}</p>
          {item.postedBy.m_no ? <p>Mobile no.: {item.postedBy.m_no}</p> : ""}
          <p>Email: {item.postedBy.email}</p>
        </div>
      </div>

      <button
        className={`view-details-btn ${
          isClicked || isCurrentUserPoster ? "claim-sent" : ""
        }`} // 👈 Add conditional class
        onClick={handleClick}
        disabled={isClicked || isCurrentUserPoster} // Simplified boolean prop usage
      >
        <p>
          {isCurrentUserPoster
            ? "You posted this item"
            : isClicked
            ? "Asked for claim"
            : "Ask for claim"}
        </p>
      </button>
    </div>
  );
};

export default ItemCard;
