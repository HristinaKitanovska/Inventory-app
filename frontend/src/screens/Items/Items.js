import "./Items.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";

const Items = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.category);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);
  //   useEffect(() => {
  //     const fetchCategory = async () => {
  //       try {
  //         const response = await fetch(`http://localhost:3000/categories/${id}`);
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch category");
  //         }
  //         const data = await response.json();
  //         setCategory(data.category);
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };

  //     fetchCategory();
  //   }, [id]);
  return (
    <AppContainer pageTitle={category ? "Inventory/" + category.name : ""}>
      <div>
        Items
        {category ? <p>{category.name}</p> : <p>Loading...</p>}
      </div>
    </AppContainer>
  );
};

export default Items;
