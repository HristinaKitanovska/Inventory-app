import { useState, useEffect } from "react";
import "./Inventory.css";
import AppContainer from "../../components/AppContainer/AppContainer";
import GreenButton from "../../components/GreenButton/GreenButton";
import add from "../../assets/icons/add-icon.svg";
import Search from "../../components/Search/Search";
import searchIcon from "../../assets/icons/search.svg";
import VerticalCard from "../../components/VerticalCard/VerticalCard";
import Modal from "../../modals/Modal/Modal";

const Inventory = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data.categories || []);
        setFilteredCategories(data.categories || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Calculate total items
  const findTotalItems = (categories) => {
    return categories.reduce(
      (total, category) => total + category.items.length,
      0
    );
  };

  const totalItems = findTotalItems(categories);

  // Calculate total cost
  const calculateTotalCost = () => {
    return orders.reduce((total, order) => total + order.totalPrice, 0);
  };

  const handleAddCategory = (formData) => {
    fetch(`http://localhost:3000/categories`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories((prevCategories) => [...prevCategories, data.category]);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Search bar
  const handleSearch = (query) => {
    if (query) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories); // Reset to the full list if the query is empty
    }
  };

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
    <>
      <AppContainer pageTitle="Inventory">
        <div className="inventory-options">
          <Search
            icon={searchIcon}
            placeholder="Search Category"
            onSearch={handleSearch}
          />
          <GreenButton icon={add} text="add category" onClick={openModal} />
        </div>
        <div className="inventory-overview">
          <span>
            Categories: <b>{categories.length}</b>
          </span>
          <span>
            Items: <b>{totalItems}</b>
          </span>
          <span>
            Total orders: <b>{orders.length}</b>
          </span>
          <span>
            Total costs: <b>€{calculateTotalCost()}</b>
          </span>
        </div>
        <div className="vertical-cards">
          {filteredCategories?.length > 0 ? (
            filteredCategories.map((category) => (
              <VerticalCard
                key={category._id}
                data={category}
                type="category"
              />
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <Modal
          show={showModal}
          close={closeModal}
          onSubmit={handleAddCategory}
          mode="addCategory"
        />
      </AppContainer>
    </>
  );
};

export default Inventory;
