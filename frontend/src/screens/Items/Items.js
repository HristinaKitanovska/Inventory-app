import "./Items.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import Search from "../../components/Search/Search";
import GreenButton from "../../components/GreenButton/GreenButton";
import add from "../../assets/icons/add-icon.svg";
import searchIcon from "../../assets/icons/search.svg";
import VerticalCard from "../../components/VerticalCard/VerticalCard";

const Items = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);

  // pravime eden povik do categories, bidejki se vrzani so items so populate, odma moze i setitems da dobieme

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.category);
        setItems(data.category.items || []);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  return (
    <AppContainer pageTitle={category ? "Inventory/" + category.name : ""}>
      <div className="inventory-options">
        <Search icon={searchIcon} placeholder="Search Item" />
        <GreenButton icon={add} text="add item" />
      </div>
      <div className="vertical-cards">
        {items.length > 0 ? (
          items.map((item) => (
            <VerticalCard key={item._id} data={item} type="item" />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </AppContainer>
  );
};

export default Items;
