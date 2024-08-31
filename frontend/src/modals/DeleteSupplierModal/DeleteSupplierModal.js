import "./DeleteSupplierModal.css";
import GreyButton from "../../components/GreyButton/GreyButton";
import GreenButton from "../../components/GreenButton/GreenButton";

const DeleteSupplierModal = ({ show, close, onDelete, supplierId }) => {
  if (!show) {
    return null;
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card's onClick event
    onDelete(supplierId);
  };

  return (
    <>
      <div className={`delete-modal ${show ? "show" : ""}`}>
        <span className="delete-item-text">
          Do you want to delete this supplier?
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

export default DeleteSupplierModal;
