import "./Items.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import Search from "../../components/Search/Search";
import GreenButton from "../../components/GreenButton/GreenButton";
import add from "../../assets/icons/add-icon.svg";
import searchIcon from "../../assets/icons/search.svg";
import VerticalCard from "../../components/VerticalCard/VerticalCard";
import Modal from "../../modals/Modal/Modal";

const Items = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // pravime eden povik do categories, bidejki se vrzani so items so populate, odma moze i setitems da dobieme

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data.category);
        setItems(data.category.items || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
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

  const handleAddItem = (formData) => {
    formData.append("categoryId", id);

    fetch("http://localhost:3000/items", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, data.item]);
      })
      .catch((error) => console.log("Error", error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <AppContainer pageTitle={category ? "Inventory/" + category.name : ""}>
      <div className="inventory-options">
        <Search icon={searchIcon} placeholder="Search Item" />
        <GreenButton icon={add} text="add item" onClick={openModal} />
      </div>
      <div className="vertical-cards">
        {items?.length > 0 ? (
          items.map((item) => (
            <VerticalCard key={item._id} data={item} type="item" />
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
      <Modal
        show={showModal}
        close={closeModal}
        onSubmit={handleAddItem}
        mode="addItem"
      />
    </AppContainer>
  );
};

export default Items;
