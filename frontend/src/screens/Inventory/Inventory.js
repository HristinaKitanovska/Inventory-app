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
  const [newCategory, setNewCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const handleCategoryChange = (event) => setNewCategory(event.target.value);
  const handleImageChange = (event) => setCategoryImage(event.target.files[0]);

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);
  // console.log(categories);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    console.log(event.target);
    event.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", newCategory);
    formData.append("categoryImage", categoryImage);
    console.log(formData);

    fetch("http://localhost:3000/categories", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Category added successfully!");
          closeModal();
        } else {
          console.error("Failed to add category:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error.message);
      });
  };
  console.log(newCategory);
  return (
    <>
      <AppContainer>
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
          {categories.map((category) => (
            <VerticalCard key={category._id} category={category} />
          ))}
        </div>
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          handleCategoryChange={handleCategoryChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      </AppContainer>
    </>
  );
};

export default Inventory;
