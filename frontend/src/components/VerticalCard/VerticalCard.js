import "./VerticalCard.css";

const VerticalCard = ({ category }) => {
  //   console.log(category);
  return (
    <div key={category.id} className="vertical-card-container">
      <img src="" alt="" />
      <div className="vertical-card-content">
        <span className="header">{category.name}</span>
        <span className="info">
          <b>3 Items</b> | € 338.00
        </span>
        <span className="last-update">
          Updated At:
          <br />
          <b>10/10/2023 20:10</b>
        </span>
      </div>
    </div>
  );
};

export default VerticalCard;
