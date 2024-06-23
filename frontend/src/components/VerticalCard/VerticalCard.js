import "./VerticalCard.css";
import trashBinIcon from "../../assets/icons/trash-bin.svg";

const VerticalCard = ({ category }) => {
  return (
    <div key={category.id} className="vertical-card-container">
      <img src={category.image} alt="" />
      <div className="vertical-card-content">
        <span className="header">{category.name}</span>
        <span className="info">
          <b>3 Items</b> | € 338.00
        </span>
        <div className="footer">
          <span className="last-update">
            Updated At:
            <br />
            <b>10/10/2023 20:10</b>
          </span>
          <span>
            <img src={trashBinIcon} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
