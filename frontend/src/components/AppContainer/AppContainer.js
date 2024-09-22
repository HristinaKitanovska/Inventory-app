import "./AppContainer.css";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AuthContext from "../../utils/AuthContext";
import userIcon from "../../assets/icons/user.svg";

const AppContainer = ({ children, pageTitle }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-container-content">
        <div className="navbar">
          <div className="navbar-content">{pageTitle}</div>
          <div className="user-info-container">
            {isDashboardPage && user && (
              <>
                <span className="user-info">Welcome back {user.name}!</span>
                <img src={userIcon} alt="" />
              </>
            )}
          </div>
        </div>
        <div className="app-container-children">{children}</div>
      </div>
    </div>
  );
};

export default AppContainer;
