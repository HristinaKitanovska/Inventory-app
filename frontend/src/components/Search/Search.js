import "./Search.css";
import { useState } from "react";

const Search = ({ icon, placeholder, onSearch }) => {
  const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);

  const handleFocus = () => {
    setIsPlaceholderHidden(true);
  };

  const handleBlur = () => {
    setIsPlaceholderHidden(false);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <div className="search">
      <img src={icon} alt="" />
      <input
        placeholder={isPlaceholderHidden ? "" : placeholder}
        className="search-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
