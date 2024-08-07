import "./Orders.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import GreenButton from "../../components/GreenButton/GreenButton";
import add from "../../assets/icons/add-icon.svg";
import edit from "../../assets/icons/edit.svg";
import addFolder from "../../assets/icons/add-folder.svg";

const Orders = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState({});
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
        console.log(data);
        setCategory(data.item.category.name);
        setItem(data.item || []);
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
    <AppContainer
      pageTitle={item ? "Inventory/" + category + "/" + item.name : ""}
    >
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
      <div className="orders-container">
        <div className="orders">
          <div className="orders-navbar">
            <span>Orders</span>
            <GreenButton
              text="generate invoice"
              style={{ textTransform: "capitalize", padding: "10px 20px" }}
            />
          </div>
          {/* table orders */}
          <div className="order-list">
            <table>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Price per unit</th>
                  <th>Ordered at</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1292 units</td>
                  <td>€1999</td>
                  <td>€1.99</td>
                  <td>10/10/2023</td>
                  <td>Amazon Ltd Electronics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* display item overview */}
        <div className="item-overview">
          <div>
            <img
              className="item-image"
              src={`http://localhost:3000/${item?.image}`}
              alt=""
            />
            <img className="edit-image" src={edit} alt="" />
          </div>
          <span className="item-name">
            Name: <b>{item.name}</b>
          </span>
          <div className="item-overview-options">
            <GreenButton
              icon={addFolder}
              style={{ padding: "10px 5px 10px 20px" }}
            />
            <GreenButton text="save" style={{ padding: "10px 40px" }} />
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default Orders;
