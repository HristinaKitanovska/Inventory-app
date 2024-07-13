import React, { memo } from "react";
import "./VerticalCard.css";
import trashBinIcon from "../../assets/icons/trash-bin.svg";
import { useNavigate } from "react-router-dom";

const VerticalCard = memo(({ data, type }) => {
  console.log(data);
  const navigate = useNavigate();

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(data.updatedAt));

  const slugify = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, "-"); // Replace spaces with -
  };

  const handleClick = () => {
    if (type === "category") {
      navigate(`/inventory/${slugify(data.name)}/${data._id}`);
    } else if (type === "item") {
      navigate(`/inventory/item/${slugify(data.name)}/${data._id}`);
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
        {/* za category prikazuvame kolku items ima */}
        {type === "category" && (
          <span className="info">
            <b>{data.items?.length || "0"} Items</b> | € 338.00
          </span>
        )}
        {/* za items prikazuvane kolku orders ima */}
        {type === "item" && (
          <span className="info">
            <b>0 Purchase records</b> | € 338.00
          </span>
        )}

        <div className="footer">
          {type === "category" && (
            <span className="last-update">
              Updated At:
              <br />
              <b>{formattedDate}</b>
            </span>
          )}
          <span className="trash-bin">
            <img src={trashBinIcon} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
});

export default VerticalCard;
