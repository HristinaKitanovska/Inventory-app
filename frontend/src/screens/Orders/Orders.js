import "./Orders.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContainer from "../../components/AppContainer/AppContainer";
import GreenButton from "../../components/GreenButton/GreenButton";
import add from "../../assets/icons/add-icon.svg";
import edit from "../../assets/icons/edit.svg";
import addFolder from "../../assets/icons/add-folder.svg";
import AddOrderModal from "../../modals/AddOrderModal/AddOrderModal";
import AddInvoiceModal from "../../modals/AddInvoiceModal/AddInvoiceModal";
import AuthContext from "../../utils/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Orders = () => {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);

  useEffect(() => {
    if (!authToken) {
      console.error("No auth token available. Please log in again.");
      setError("Authorization token missing. Please log in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/items/${id}`, {
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
        setCategory(data.item.category.name);
        setItem(data.item || []);
        setOrders(data.item.orders || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id, authToken]);

  const calculateTotalCost = () => {
    return orders.reduce((total, order) => total + order.totalPrice, 0);
  };

  // to add new order to the list
  const addOrderToList = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  // Add order modal
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // Add new invoice
  const openAddInvoiceModal = () => {
    setShowAddInvoiceModal(true);
  };
  const closeAddInvoiceModal = () => {
    setShowAddInvoiceModal(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <AppContainer
      pageTitle={item ? "Inventory > " + category + " > " + item.name : ""}
    >
      <div className="inventory-options">
        <div className="item-info">
          <span>
            Total Orders: <b>{orders.length}</b>
          </span>
          <span>
            Total Cost: <b>€{calculateTotalCost()}</b>
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
              onClick={openAddInvoiceModal}
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
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const orderDate = new Date(order.date);
                    const formattedDate = orderDate.toLocaleDateString("en-GB");
                    return (
                      <tr key={order._id}>
                        <td>{order.quantity} units</td>
                        <td>€{order.totalPrice}</td>
                        <td>
                          €{(order.totalPrice / order.quantity).toFixed(2)}
                        </td>
                        <td>{formattedDate}</td>
                        <td className="supplier-name">
                          {order.supplier?.name}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No order yet</td>
                  </tr>
                )}
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
      <AddOrderModal
        show={showModal}
        close={closeModal}
        itemId={id}
        addOrder={addOrderToList}
      />
      <AddInvoiceModal
        show={showAddInvoiceModal}
        close={closeAddInvoiceModal}
        itemId={id} // we are sending the id of item to the modal
      />
    </AppContainer>
  );
};

export default Orders;
