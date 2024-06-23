import "./AppContainer.css";
import Sidebar from "../Sidebar/Sidebar";

const AppContainer = ({ children, pageTitle }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-container-content">
        <div className="navbar">
          <span className="navbar-content">{pageTitle}</span>
          {/* koga ke ima najaveno user */}
          {/* {user && <span>Jon Doe</span>} */}
        </div>
        <div className="app-container-children">{children}</div>
      </div>
    </div>
  );
};

export default AppContainer;
