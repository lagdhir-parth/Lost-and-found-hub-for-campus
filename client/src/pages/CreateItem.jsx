import { useState, useRef } from "react";
import axios from "axios";
import "../stylesheets/createItem.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const CreateItem = () => {
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    itemName: "",
    location: "",
    description: "",
    category: "",
    type: "",
    postedBy: auth.user._id,
  });
  const [itemImage, setItemImage] = useState(null);
  const fileUploadRef = useRef();
  const [uploadStatusColor, setUploadStatusColor] = useState({
    backgroundColor: "#ff00000a",
    border: "2px dashed red",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
    if (file) {
      setUploadStatusColor({
        backgroundColor: "#0080001a",
        border: "2px dashed green",
      });
      // ✅ Create a local URL for the file to use as the image source (src)
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  const handleDivClick = () => {
    // Programmatically click the hidden file input
    fileUploadRef.current.click();
  };

  const clearForm = () => {
    setFormData({
      itemName: "",
      location: "",
      description: "",
      category: "",
      type: "",
      postedBy: auth.user._id,
    });
    setImagePreviewUrl(null);
    setItemImage(null);
    setUploadStatusColor({
      backgroundColor: "#ff00000a",
      border: "2px dashed red",
    });

    // Reset the file input value using the ref (REQUIRED for file inputs)
    if (fileUploadRef.current) {
      fileUploadRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object (essential for file uploads)
    const data = new FormData();

    // 2. Append all text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // 3. Append the image file.
    // The key MUST match the Multer field name ('item-img')
    if (itemImage) {
      data.append("item-img", itemImage);
    }

    // setFormData({ ...formData, postedBy: auth.user });

    try {
      // Axios automatically sets the correct 'Content-Type': 'multipart/form-data'
      const res = await axios.post(`${API}/item/createItem`, data, {
        withCredentials: true,
      });
      console.log("Item created:", res.data);
      alert("Item successfully created!");
      clearForm();
    } catch (error) {
      alert("Error creating item.");
      clearForm();
    }
  };

  console.log(auth.user)

  return (
    <div className="foundPage-main-content">
      <div className="itemForm-container">
        <form className="create-item-form" onSubmit={handleSubmit}>
          <div className="text-fields">
            <div className="create-item-form-row">
              <label htmlFor="itemName">Item Name:</label>
              <input
                type="text"
                name="itemName"
                id="itemName"
                value={formData.itemName}
                onChange={handleTextChange}
                placeholder="Enter Item Name"
                required
              />
            </div>
            <div className="create-item-form-row">
              <label>Type: </label>
              <div className="type-div">
                <input
                  onChange={handleTextChange}
                  type="radio"
                  name="type"
                  id="lost"
                  value="lost"
                  checked={formData.type === "lost"} // to uncheck button when form clears
                />
                <label htmlFor="lost">Lost</label>
                <input
                  onChange={handleTextChange}
                  type="radio"
                  name="type"
                  id="found"
                  value="found"
                  checked={formData.type === "found"}
                />
                <label htmlFor="found">Found</label>
              </div>
            </div>
            <div className="create-item-form-row">
              <label htmlFor="location">Location: </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleTextChange}
                placeholder="Enter where image found"
                required
              />
            </div>
            <div className="create-item-form-row">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleTextChange}
                placeholder="Write details of image"
                rows="2"
                required
              ></textarea>
            </div>

            <div className="createItem-btns">
              <button type="button" onClick={clearForm}>
                Clear
              </button>
              <button type="submit" onClick={handleSubmit}>
                Create Item
              </button>
            </div>
          </div>
          <div className="image-upload">
            {/* 4. File input with the correct name */}
            <input
              type="file"
              name="item-img"
              ref={fileUploadRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              required
            />
            <div
              onClick={handleDivClick}
              className="upload-file"
              style={uploadStatusColor}
            >
              {/* ✅ CONDITIONAL RENDERING FOR PREVIEW */}
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Item Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "22px",
                  }}
                />
              ) : (
                <>
                  <i
                    className="fa-regular fa-image fa-2xl"
                    style={{
                      color: "grey",
                      fontSize: "60px",
                      marginTop: "20px",
                    }}
                  ></i>
                  <h4
                    style={{
                      color: "grey",
                      fontSize: "20px",
                      marginTop: "10px",
                    }}
                  >
                    Click here to upload item's image
                  </h4>
                </>
              )}
            </div>
            <div className="category-div">
              <label>Categories:</label>
              <div className="category-checkbox-container">
                {/* Define your categories here */}
                {[
                  "Keys",
                  "Wallet",
                  "Electronics",
                  "Apparel",
                  "ID Card",
                  "Bag",
                  "Bottle",
                  "Other",
                ].map((cat) => (
                  <span key={cat} className="checkbox-span">
                    <input
                      type="radio"
                      id={cat}
                      name="category"
                      value={cat}
                      className="category-checkbox"
                      onChange={handleTextChange} // ✅ Use the new handler
                      // ✅ Determine if the radio button should be checked
                      checked={formData.category === cat}
                    />
                    <label htmlFor={cat}>{cat}</label>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
