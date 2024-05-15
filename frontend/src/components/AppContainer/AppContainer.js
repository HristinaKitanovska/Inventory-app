import "./AppContainer.css";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const AppContainer = ({ children }) => {
  const location = useLocation();
  const pathWord = location.pathname.split("/").pop();
  const capitalizedPathWord =
    pathWord.charAt(0).toUpperCase() + pathWord.slice(1);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-container-content">
        <div className="navbar">
          <span className="navbar-content">{capitalizedPathWord}</span>
          {/* koga ke ima najaveno user */}
          {/* {user && <span>Jon Doe</span>} */}
        </div>
        <div className="app-container-children">{children}</div>
      </div>
    </div>
  );
};

export default AppContainer;
