import "./AddOrderModal.css";
import React, { useEffect, useState } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";

const AddOrderModal = ({ show, close, itemId, addOrder }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);

  useEffect(() => {
    if (show) {
      fetch("http://localhost:3000/suppliers")
        .then((response) => response.json())
        .then((data) => {
          setSuppliers(data.suppliers || []);
        })
        .catch((error) => {
          console.error("Error fetching suppliers:", error);
        });
      // clear the state when the modal is open
      setSelectedSupplier("");
      setQuantity("");
      setTotalPrice("");
    }
  }, [show]);

  const handleFocus = () => {
    setIsPlaceholderHidden(true);
  };
  const handleBlur = () => {
    setIsPlaceholderHidden(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      supplier: selectedSupplier,
      quantity: parseInt(quantity, 10),
      totalPrice: parseFloat(totalPrice),
    };

    fetch(`http://localhost:3000/orders/${itemId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          addOrder(data.order); // Update the orders list
          close();
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error adding order:", error);
      });
  };
  return (
    <>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Add Order</span>
          <span className="close-btn" onClick={close}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <select
              className="form-name"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Supplier
              </option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            <input
              className="form-name"
              placeholder={isPlaceholderHidden ? "" : "Quantity"}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <input
              className="form-name"
              placeholder={isPlaceholderHidden ? "" : "Total Price"}
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <div className="button-options">
              <GreyButton text="CANCEL" onClick={close} />
              <GreenButton text="add order" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default AddOrderModal;
