import "./Reports.css";
import { Link } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import inventoryIcon from "../../assets/icons/inventory.svg";
import activityHistoryIcon from "../../assets/icons/activity-history.svg";

const Reports = () => {
  return (
    <>
      <AppContainer pageTitle="Reports">
        <div className="reports-info">
          <Link
            to="/activity-history"
            className="reports-link activity-history"
          >
            <div className="reports-header">
              <img src={activityHistoryIcon} alt="" />
              <div>Activity History</div>
            </div>
          </Link>
          <div className="reports-content">
            Activity history helps keep track of the things you do with your
            items, categories, tags, etc., such as creating, editing or deleting
          </div>
        </div>
        <div className="reports-info">
          <Link to="/inventory-summary" className="reports-link">
            <div className="reports-header">
              <img src={inventoryIcon} alt="" />
              <div>Inventory Summary</div>
            </div>
          </Link>
          <div className="reports-content">
            Inventory Summary provides detailed visualizations about the total
            cost of the categories over a period of time.
          </div>
        </div>
      </AppContainer>
    </>
  );
};

export default Reports;
