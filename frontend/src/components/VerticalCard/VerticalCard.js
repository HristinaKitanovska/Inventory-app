import React, { memo, useEffect, useState } from "react";
import "./VerticalCard.css";
import trashBinIcon from "../../assets/icons/trash-bin.svg";
import { useNavigate } from "react-router-dom";

const VerticalCard = memo(({ data, type, onDeleteClick }) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        let response;

        if (type === "item") {
          response = await fetch(
            `http://localhost:3000/orders/item/${data._id}`
          );
        } else if (type === "category") {
          response = await fetch(
            `http://localhost:3000/orders/category/${data._id}`
          );
        }

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const result = await response.json();
        setTotalPrice(result.totalPrice);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchTotalPrice();
  }, [data._id, type]);

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
    <div key={data.id} className="vertical-card-container">
      <img src={`http://localhost:3000/${data?.image}`} alt="" />
      <div className="vertical-card-content">
        <span className="header" onClick={handleClick}>
          {data.name}
        </span>
        {/* za category prikazuvame kolku items ima */}
        {type === "category" && (
          <span className="info">
            <b>{data.items?.length || "0"} Items</b> | € {totalPrice}
          </span>
        )}
        {/* za items prikazuvane kolku orders ima */}
        {type === "item" && (
          <span className="info">
            <b>{data.orders?.length} Purchase records</b> | € {totalPrice}
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
          <span className="trash-bin" onClick={onDeleteClick}>
            <img src={trashBinIcon} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
});

export default VerticalCard;
