import "./Modal.css";
import React, { useState } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";
import addPhotoIcon from "../../assets/icons/add-photo-icon.svg";

const Modal = ({ show, close, onSubmit, mode }) => {
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

      onSubmit(formData);
      setName("");
      setImageFile(null);
      close();
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
          <span className="modal-header-name">
            {mode === "addCategory" ? "Add Cattegory" : "Add Item"}
          </span>
          <span className="close-btn" onClick={close}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="modal-content">
          <form className="modal-form" onSubmit={handleSubmit}>
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
              <img src={addPhotoIcon} alt="" className="add-photo-icon" />
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
              <GreyButton text="CANCEL" onClick={close} />
              <GreenButton
                text={mode === "addCategory" ? "Add Cattegory" : "Add Item"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default Modal;
