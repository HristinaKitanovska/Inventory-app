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

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  return (
    <>
      <AppContainer pageTitle="Inventory">
        <div className="inventory-options">
          <Search icon={searchIcon} placeholder="Search Category" />
          <GreenButton icon={add} text="add category" onClick={openModal} />
        </div>
        <div className="inventory-overview">
          <span>
            Categories: <b>{categories.length}</b>
          </span>
          <span>
            Items: <b>11</b>
          </span>
          <span>
            Total orders: <b>25</b>
          </span>
          <span>
            Total costs: <b>€1.250k</b>
          </span>
        </div>
        <div className="vertical-cards">
          {categories.length > 0 ? (
            categories.map((category) => (
              <VerticalCard
                key={category._id}
                data={category}
                type="category"
              />
            ))
          ) : (
            <p>Loading...</p>
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
