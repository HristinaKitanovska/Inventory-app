import "./DeleteItemModal.css";
import GreyButton from "../../components/GreyButton/GreyButton";
import GreenButton from "../../components/GreenButton/GreenButton";

const DeleteItemModal = ({ show, close, onDelete, itemId }) => {
  if (!show) {
    return null;
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick event
    onDelete(itemId);
  };

  return (
    <>
      <div className={`delete-modal ${show ? "show" : ""}`}>
        <span>Do you want to delete this item?</span>
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

export default DeleteItemModal;
