import "./SidebarContent.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import dashboard from "../../assets/icons/dashboard.svg";
import inventory from "../../assets/icons/inventory.svg";
import reports from "../../assets/icons/reports.svg";
import signOut from "../../assets/icons/sign-out.svg";

const SidebarContent = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const sidebarLinks = [
    { label: "Dashboard", imageSrc: dashboard, path: "/dashboard" },
    { label: "Inventory", imageSrc: inventory, path: "/inventory" },
    { label: "Reports", imageSrc: reports, path: "/reports" },
    { label: "Suppliers", path: "/suppliers" },
  ];

  const generateSidebarLinks = () => {
    return sidebarLinks.map((link, index) => (
      <div className="sidebar-link" key={index}>
        {link.imageSrc && <img src={link.imageSrc} alt="" />}
        <Link to={link.path}>
          <p className={!link.imageSrc ? "without-image" : ""}>{link.label}</p>
        </Link>
      </div>
    ));
  };

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="sidebar-content">
      <div>{generateSidebarLinks()}</div>
      <div className="sidebar-link" onClick={handleLogout}>
        <img src={signOut} alt="" />
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default SidebarContent;
