import React, { useState } from "react";
import "./Modal.css";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";
import addPhotoIcon from "../../assets/icons/add-photo-icon.svg";

const Modal = ({ show, onClose, onAddCategory }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);
  const handleFocus = () => {
    setIsPlaceholderHidden(true);
  };
  const handleBlur = () => {
    setIsPlaceholderHidden(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);

      onAddCategory(formData);
      setName("");
      setImageFile(null);
      onClose();
    } else {
      alert("Please select an image file.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Add cattegory</span>
          <span className="close-btn" onClick={onClose}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
              className="form-name"
              placeholder={isPlaceholderHidden ? "" : "Name"}
              type="text"
              id="categoryName"
              name="categoryName"
              onChange={(e) => setName(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <div className="line-divider"></div>
            <div className="add-photo-input">
              <img src={addPhotoIcon} alt="" />
              <span>(Add Photo, 2MB Total)</span>
              <input
                type="file"
                id="categoryImage"
                name="categoryImage"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </div>
            <div className="line-divider"></div>
            <div className="button-options">
              <GreyButton text="CANCEL" onClick={onClose} />
              <GreenButton text="ADD CATEGORY" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default Modal;
