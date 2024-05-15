import "./GreyButton.css";

const GreyButton = ({ text, onClick }) => {
  return (
    <button className="grey-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default GreyButton;
