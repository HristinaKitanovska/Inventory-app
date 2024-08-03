import "./GreenButton.css";

const GreenButton = ({ icon, text, onClick, style }) => {
  return (
    <button className="green-btn" onClick={onClick} style={style}>
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>
    </button>
  );
};

export default GreenButton;
