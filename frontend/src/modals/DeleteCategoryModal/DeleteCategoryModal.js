import "./DeleteCategoryModal.css";
import GreyButton from "../../components/GreyButton/GreyButton";
import GreenButton from "../../components/GreenButton/GreenButton";

const DeleteCategoryModal = ({ show, close, onDelete, categoryId }) => {
  console.log(categoryId);
  if (!show) {
    return null;
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick event
    onDelete(categoryId);
  };

  return (
    <>
      <div className={`delete-modal ${show ? "show" : ""}`}>
        <span className="delete-category-text">
          Are you sure that you want to delete? <br />
          All the items in the category will be deleted.
        </span>
        <div className="button-options">
          <GreyButton text="CANCEL" onClick={close} />
          <GreenButton
            text="CONFIRM"
            type="submit"
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default DeleteCategoryModal;
