import "./SidebarContent.css";
import { Link } from "react-router-dom";
import dashboard from "../../assets/icons/dashboard.svg";
import inventory from "../../assets/icons/inventory.svg";
import reports from "../../assets/icons/reports.svg";
import signOut from "../../assets/icons/sign-out.svg";

const SidebarContent = () => {
  const sidebarLinks = [
    { label: "Dashboard", imageSrc: dashboard, path: "/dashboard" },
    { label: "Inventory", imageSrc: inventory, path: "/inventory" },
    { label: "Reports", imageSrc: reports, path: "/reports" },
    { label: "Suppliers", path: "/suppliers" },
  ];

  const generateSidebarLinks = () => {
    return sidebarLinks.map((link, index) => (
      <div className="sidebar-link" key={index}>
        {link.imageSrc && <img src={link.imageSrc} alt={link.label} />}
        <Link to={link.path}>
          <p className={!link.imageSrc ? "without-image" : ""}>{link.label}</p>
        </Link>
      </div>
    ));
  };
  return (
    <div className="sidebar-content">
      <div>{generateSidebarLinks()}</div>
      <div className="sidebar-link">
        <img src={signOut} />
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default SidebarContent;
