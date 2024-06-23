import "./Search.css";
import { useState } from "react";

const Search = ({ icon, placeholder }) => {
  const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);

  const handleFocus = () => {
    setIsPlaceholderHidden(true);
  };

  const handleBlur = () => {
    setIsPlaceholderHidden(false);
  };
  return (
    <div className="search">
      <img src={icon} alt="" />
      <input
        placeholder={isPlaceholderHidden ? "" : placeholder}
        className="search-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Search;
