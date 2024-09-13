import "./AddInvoiceModal.css";
import React, { useEffect, useState } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";

const AddInvoiceModal = ({ show, close, itemId }) => {
  const [invoiceName, setInvoiceName] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isInvoiceNamePlaceholderHidden, setIsInvoiceNamePlaceholderHidden] =
    useState(false);

  useEffect(() => {
    if (show && itemId) {
      // Fetch suppliers
      fetch(`http://localhost:3000/suppliers`)
        .then((response) => response.json())
        .then((data) => setSuppliers(data.suppliers || []))
        .catch((error) => console.error("Error fetching suppliers:", error));

      // Fetch orders for the selected item
      fetch(`http://localhost:3000/orders/invoice/${itemId}`)
        .then((response) => response.json())
        .then((data) => setOrders(data.orders || []))
        .catch((error) => console.error("Error fetching orders:", error));

      // Clear the state when the modal is open
      setSelectedSupplier("");
      setInvoiceName("");
      setSelectedDate("");
      setSelectedOrder("");
    }
  }, [show, itemId]);

  const handleInvoiceNameFocus = () => {
    setIsInvoiceNamePlaceholderHidden(true);
  };
  const handleInvoiceNameBlur = () => {
    setIsInvoiceNamePlaceholderHidden(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Add Invoice</span>
          <span className="close-btn" onClick={close}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="modal-content">
          <form className="modal-form" onSubmit={handleSubmit}>
            <input
              className="form-name"
              placeholder={isInvoiceNamePlaceholderHidden ? "" : "Invoice Name"}
              name="invoiceName"
              type="text"
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
              onFocus={handleInvoiceNameFocus}
              onBlur={handleInvoiceNameBlur}
              required
            />
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
            <div className="date-picker">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <select
              className="form-name"
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Order
              </option>
              {orders.map((order) => (
                <option key={order._id} value={order._id}>
                  {order.quantity}
                </option>
              ))}
            </select>
            <div className="custom-hr"></div>
            <div className="button-options">
              <GreyButton text="CANCEL" onClick={close} />
              <GreenButton text="add invoice" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default AddInvoiceModal;
