import "./SupplierCard.css";
import editSupplierIcon from "../../assets/icons/edit-supplier.svg";
import trashBinIcon from "../../assets/icons/trash-bin.svg";

const SupplierCard = ({ data }) => {
  return (
    <div className="supplier-card">
      <div className="supplier-header">{data.name}</div>
      <div className="supplier-content">
        <div className="address">
          <span className="label">Address: </span>
          <span className="value">{data.address}</span>
        </div>
        <div className="phone">
          <span className="label">Phone number: </span>
          <span className="value">{data.phone}</span>
        </div>
        <div className="email">
          <span className="label">Email: </span>
          <span className="value">{data.email}</span>
        </div>
        <div className="supplier-options">
          <span>
            <div className="edit-supplier">
              <img
                src={editSupplierIcon}
                alt=""
                className="edit-supplier-icon"
              />
            </div>
          </span>
          <span>
            <img src={trashBinIcon} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
