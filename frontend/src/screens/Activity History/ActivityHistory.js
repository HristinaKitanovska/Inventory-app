import "./ActivityHistory.css";
import { useState, useEffect, useContext } from "react";
import AppContainer from "../../components/AppContainer/AppContainer";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

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

          // Fetch activities
          const activitiesResponse = await fetch(
            "http://localhost:3000/activities",
            {
              method: "GET",
              headers,
            }
          );
          if (!activitiesResponse.ok)
            throw new Error("Failed to fetch activities");
          const activitiesData = await activitiesResponse.json();
          setActivities(activitiesData.logsWithItemInfo);

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

  // Filter activities based on the selected filter
  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.action === filter);

  return (
    <AppContainer pageTitle="Reports > Activity History">
      <div className="activity-history-container">
        <div className="info-container-activity" style={{ width: "60%" }}>
          {filteredActivities.map((activity, index) => {
            // Format the date for the current activity
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(new Date(activity.updatedAt));

            return (
              <div className="recent-activity custom" key={index}>
                <div>
                  {`${activity.user.name} has ${activity.action} item `}
                  <strong>{activity.item.name}</strong>
                  {` in `}
                  <strong>
                    {activity.category.name}{" "}
                    {` (${activity.category.name} Category)`}
                  </strong>
                </div>
                <span>{formattedDate}</span>
              </div>
            );
          })}
        </div>
        <div className="filtered-activites">
          <div className="filtered-activities-header">Filter Activities</div>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                value="all"
                checked={filter === "all"}
                onChange={() => setFilter("all")}
              />
              All Activity
            </label>
            <label>
              <input
                type="radio"
                value="created"
                checked={filter === "created"}
                onChange={() => setFilter("created")}
              />
              Created
            </label>
            <label>
              <input
                type="radio"
                value="moved"
                checked={filter === "moved"}
                onChange={() => setFilter("moved")}
              />
              Moved
            </label>
            <label>
              <input
                type="radio"
                value="deleted"
                checked={filter === "deleted"}
                onChange={() => setFilter("deleted")}
              />
              Deleted
            </label>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default ActivityHistory;
