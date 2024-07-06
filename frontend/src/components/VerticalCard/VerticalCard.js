import "./VerticalCard.css";
import trashBinIcon from "../../assets/icons/trash-bin.svg";
import { useNavigate } from "react-router-dom";

const VerticalCard = ({ data, type }) => {
  console.log(data);
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "category") {
      navigate(`/inventory/${data._id}`);
    } else if (type === "item") {
      navigate(`/inventory/${data._id}`); /* inventory/mouse => orders */
    }
  };
  return (
    <div
      key={data.id}
      className="vertical-card-container"
      onClick={handleClick}
    >
      <img src={`http://localhost:3000/${data?.image}`} alt="" />
      <div className="vertical-card-content">
        <span className="header">{data.name}</span>
        <span className="info">
          <b>3 Items</b> | € 338.00
        </span>
        <div className="footer">
          {type === "category" && (
            <span className="last-update">
              Updated At:
              <br />
              <b>10/10/2023 20:10</b>
            </span>
          )}
          <span className="trash-bin">
            <img src={trashBinIcon} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
