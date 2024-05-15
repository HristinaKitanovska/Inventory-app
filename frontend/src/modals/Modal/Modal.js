import "./Modal.css";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";
import { useState } from "react";
import addPhotoIcon from "../../assets/icons/add-photo-icon.svg";

const Modal = ({
  showModal,
  closeModal,
  handleCategoryChange,
  handleImageChange,
  handleSubmit,
}) => {
  const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleFocus = () => {
    setIsPlaceholderHidden(true);
  };
  const handleBlur = () => {
    setIsPlaceholderHidden(false);
  };

  const clearCategoryName = () => {
    setCategoryName("");
    closeModal();
  };

  return (
    <>
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Add cattegory</span>
          <span className="close-btn" onClick={clearCategoryName}>
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
              onChange={handleCategoryChange}
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
                onChange={handleImageChange}
              />
            </div>
            <div className="line-divider"></div>
            <div className="button-options">
              <GreyButton text="CANCEL" onClick={closeModal} />
              <GreenButton text="ADD CATEGORY" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className={`${showModal ? "modal-background" : ""}`}></div>
    </>
  );
};

export default Modal;
