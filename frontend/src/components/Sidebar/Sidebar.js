import "./Sidebar.css";
import logo from "../../assets/icons/logo-dolphin.svg";
import SidebarContent from "../SidebarContent/SidebarContent";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="logo" src={logo} alt="" />
      <div className="sidebar-container">
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
