import "./MoveItemModal.css";
import React, { useEffect, useState, useContext } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import AuthContext from "../../utils/AuthContext";
import GreenButton from "../../components/GreenButton/GreenButton";
import moveItemFolderIcon from "../../assets/icons/move-item-folder.svg";

const MoveItemModal = ({ item, show, close }) => {
  const { authToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [item, authToken]);

  // Move item button click
  const handleMoveItem = () => {
    fetch(`http://localhost:3000/items/move/${item._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldCategoryId: item.category?._id,
        newCategoryId: selectedCategory,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to move item");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item moved successfully", data);
        close();
      })
      .catch((error) => {
        console.error("Error moving item:", error);
      });
  };

  if (!show) {
    return null;
  }
  return (
    <>
      <div className={`modal move-item ${show ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Move Item</span>
          <span className="close-btn" onClick={close}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="move-item-modal-content">
          {categories.length > 0 ? (
            <div className="categories-container">
              {categories.map((category) => (
                <div className="categories-name" key={category._id}>
                  <img src={moveItemFolderIcon} alt="" />
                  <div
                    className={`category-item ${
                      selectedCategory === category._id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <div className="modal-footer">
          <GreenButton text="move item" onClick={handleMoveItem} />
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default MoveItemModal;
