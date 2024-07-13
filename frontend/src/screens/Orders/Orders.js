import "./Orders.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import GreenButton from "../../components/GreenButton/GreenButton";
import add from "../../assets/icons/add-icon.svg";

const Orders = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data.item.category.name);
        setItem(data.item.name || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <AppContainer pageTitle={item ? "Inventory/" + category + "/" + item : ""}>
      <div className="inventory-options">
        <div className="item-info">
          <span>
            Total Orders: <b>22</b>
          </span>
          <span>
            Total Cost: <b>€180.00</b>
          </span>
          <span>
            Total Invoices: <b>12</b>
          </span>
        </div>
        <GreenButton icon={add} text="add order" onClick={openModal} />
      </div>
    </AppContainer>
  );
};

export default Orders;
