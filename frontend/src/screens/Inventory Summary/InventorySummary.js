import "./InventorySummary.css";
import React, { useState, useEffect, useContext } from "react";
import AppContainer from "../../components/AppContainer/AppContainer";
import GreenButton from "../../components/GreenButton/GreenButton";
import { Line } from "react-chartjs-2";
import AuthContext from "../../utils/AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InventorySummary = () => {
  const { authToken } = useContext(AuthContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [chartData, setChartData] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    if (!authToken) {
      console.error("No auth token available. Please log in again.");
      setError("Authorization token missing. Please log in.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/categories", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [authToken]);

  const generateDateLabels = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);

    while (currentDate <= new Date(end)) {
      dateArray.push(new Intl.DateTimeFormat("en-GB").format(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }

    return dateArray;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = "http://localhost:3000/orders/total-cost";
    if (selectedCategory) {
      // Fetch total price for selected category
      url = `http://localhost:3000/orders/category/${selectedCategory}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch total price");
      }

      const data = await response.json();
      const fetchedTotalCost = data.totalPrice || data.totalCost;

      // Generate the date labels based on the selected period
      const dateLabels = generateDateLabels(startDate, endDate);

      // Update the chart data based on the API response
      setChartData({
        labels: dateLabels, // X-axis labels
        datasets: [
          {
            label: selectedCategory ? "Selected Category" : "All Categories",
            data: new Array(dateLabels.length).fill(fetchedTotalCost), // Y-axis data
            borderColor: "#4caf50",
            backgroundColor: "rgba(76, 175, 80, 0.5)",
            fill: false,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching total cost:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <AppContainer pageTitle="Reports > Inventory Summary">
      <div>
        <form className="inventory-summary-container" onSubmit={handleSubmit}>
          <div className="date-input-container">
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="date-input-container">
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <select
              className="categories-select-container"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" hidden>
                All Categories
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <GreenButton text="Show" />
        </form>
      </div>

      <div style={{ width: "80%", margin: "0 auto" }}>
        {chartData ? (
          <Line data={chartData} options={{ responsive: true }} />
        ) : (
          <p>
            No data to display. Please select a category or view all categories.
          </p>
        )}
      </div>
    </AppContainer>
  );
};

export default InventorySummary;
