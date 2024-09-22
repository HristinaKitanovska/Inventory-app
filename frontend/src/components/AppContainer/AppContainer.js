import "./AppContainer.css";
import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AuthContext from "../../utils/AuthContext";
import userIcon from "../../assets/icons/user.svg";

const AppContainer = ({ children, pageTitle }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-container-content">
        <div className="navbar">
          <div className="navbar-content">{pageTitle}</div>
          <div className="user-info-container">
            {user && (
              <span className="user-info">Welcome back {user.name}!</span>
            )}
            <img src={userIcon} alt="" />
          </div>
        </div>
        <div className="app-container-children">{children}</div>
      </div>
    </div>
  );
};

export default AppContainer;
