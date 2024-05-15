import "./GreenButton.css";

const GreenButton = ({ icon, text, onClick }) => {
  return (
    <button className="green-btn" onClick={onClick}>
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>
    </button>
  );
};

export default GreenButton;
