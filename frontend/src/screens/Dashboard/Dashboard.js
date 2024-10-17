import "./Dashboard.css";
import AppContainer from "../../components/AppContainer/AppContainer";
import categoriseSummaryIcon from "../../assets/icons/categories-summary.svg";
import itemsSummaryIcon from "../../assets/icons/items-summary.svg";
import totalOrdersSummary from "../../assets/icons/total-orders-summary.svg";
import totalCostSummary from "../../assets/icons/total-cost-summary.svg";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import Carousel from "../../components/Carousel/Carousel";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
  const [categories, setCategories] = useState(0);
  const [items, setItems] = useState(0);
  const [orders, setOrders] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) {
      navigate("/");
    } else {
      // Fetch data if token exists
      const fetchData = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          };

          // Fetch categories
          const categoriesResponse = await fetch(
            "http://localhost:3000/categories",
            {
              method: "GET",
              headers,
            }
          );
          if (!categoriesResponse.ok)
            throw new Error("Failed to fetch categories");
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.categories);

          // Fetch items
          const itemsResponse = await fetch("http://localhost:3000/items", {
            method: "GET",
            headers,
          });
          if (!itemsResponse.ok) throw new Error("Failed to fetch items");
          const itemsData = await itemsResponse.json();
          setItems(itemsData.items);

          // Fetch orders
          const ordersResponse = await fetch("http://localhost:3000/orders", {
            method: "GET",
            headers,
          });
          if (!ordersResponse.ok) throw new Error("Failed to fetch orders");
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders);

          // Fetch total cost
          const totalCostResponse = await fetch(
            "http://localhost:3000/orders/total-cost",
            { method: "GET", headers }
          );
          if (!totalCostResponse.ok)
            throw new Error("Failed to fetch total cost");
          const totalCostData = await totalCostResponse.json();
          setTotalCost(totalCostData.totalCost);

          // Fetch recent orders
          const recentOrdersResponse = await fetch(
            "http://localhost:3000/orders/recent",
            {
              method: "GET",
              headers,
            }
          );
          if (!recentOrdersResponse.ok)
            throw new Error("Failed to fetch recent orders");
          const recentOrdersData = await recentOrdersResponse.json();
          setRecentOrders(recentOrdersData.recentOrders);

          // Fetch recent activities
          const activitiesResponse = await fetch(
            "http://localhost:3000/activities/recent",
            {
              method: "GET",
              headers,
            }
          );
          if (!activitiesResponse.ok)
            throw new Error("Failed to fetch activities");
          const activitiesData = await activitiesResponse.json();
          setRecentActivities(activitiesData.logsWithItemInfo);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load data");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [authToken, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <AppContainer
        pageTitle="Dashboard"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="main-container">
          {/* Inventory Summary */}
          <div className="info-container">
            <span className="info-container-header">Inventory Summary</span>
            <div className="info-container-summary">
              <div className="summary">
                <div className="circle" style={{ backgroundColor: "#FFE4AA" }}>
                  <img src={categoriseSummaryIcon} alt="" />
                </div>
                <div className="total">{categories?.length}</div>
                <div className="name">Categories</div>
              </div>
              <div className="summary">
                <div className="circle" style={{ backgroundColor: "#C8E6EE" }}>
                  <img src={itemsSummaryIcon} alt="" />
                </div>
                <div className="total">{items.length}</div>
                <div className="name">Items</div>
              </div>
              <div className="summary">
                <div className="circle" style={{ backgroundColor: "#E5CAFF" }}>
                  <img src={totalOrdersSummary} alt="" />
                </div>
                <div className="total">{orders.length}</div>
                <div className="name">Total Orders</div>
              </div>
              <div className="summary">
                <div className="circle" style={{ backgroundColor: "#FFD5C0" }}>
                  <img src={totalCostSummary} alt="" />
                </div>
                <div className="total">€{totalCost}</div>
                <div className="name">Total Cost</div>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="info-container">
            <span className="info-container-header">Recent Activity</span>
            <div className="info-container-activity">
              {recentActivities.map((activity, index) => (
                <div className="recent-activity" key={index}>
                  <div>
                    {`${activity.user.name} has ${activity.action} item `}
                    <strong>{activity.item.name}</strong>
                    {` in `}
                    <strong>
                      {activity.category.name}{" "}
                      {` (${activity.category.name} Category)`}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="info-container">
            <span className="info-container-header">Recent Orders</span>
            <div className="info-container-orders">
              <Carousel recentOrders={recentOrders} />
            </div>
          </div>
        </div>
      </AppContainer>
    </>
  );
};

export default Dashboard;
