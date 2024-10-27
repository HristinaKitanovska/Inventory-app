import "./AddInvoiceModal.css";
import React, { useEffect, useState, useContext } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";
import AuthContext from "../../utils/AuthContext";
import invoiceLogoPng from "../../assets/icons/invoiceLogoPng.png";
import jsPDF from "jspdf";

const AddInvoiceModal = ({
  show,
  close,
  itemId,
  item,
  incrementInvoiceCount,
}) => {
  const { authToken } = useContext(AuthContext);
  const [invoiceName, setInvoiceName] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isInvoiceNamePlaceholderHidden, setIsInvoiceNamePlaceholderHidden] =
    useState(false);

  useEffect(() => {
    if (!authToken) {
      console.error("No auth token available. Please log in again.");
      return;
    }

    if (show && itemId) {
      // Fetch suppliers
      fetch(`http://localhost:3000/suppliers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setSuppliers(data.suppliers || []))
        .catch((error) => console.error("Error fetching suppliers:", error));

      // Fetch orders for the selected item
      fetch(`http://localhost:3000/orders/invoice/${itemId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setOrders(data.orders || []))
        .catch((error) => console.error("Error fetching orders:", error));

      // Clear the state when the modal is open
      setSelectedSupplier("");
      setInvoiceName("");
      setSelectedDate("");
      setSelectedOrder("");
    }
  }, [show, itemId, authToken]);

  const handleInvoiceNameFocus = () => {
    setIsInvoiceNamePlaceholderHidden(true);
  };
  const handleInvoiceNameBlur = () => {
    setIsInvoiceNamePlaceholderHidden(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generatePDF();

    // Prepare invoice data for the backend
    const invoiceData = {
      invoiceName: invoiceName,
      order: selectedOrder,
      itemName: item.name,
      orderTotalPrice:
        orders.find((o) => o._id === selectedOrder)?.totalPrice || "",
      orderQuantity:
        orders.find((o) => o._id === selectedOrder)?.quantity || "",
      supplier: selectedSupplier,
      date: selectedDate,
    };

    try {
      const response = await fetch("http://localhost:3000/invoices/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error("Failed to create invoice");
      }

      console.log("Invoice created successfully");
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
    incrementInvoiceCount();
    close();
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Create an Image object for the PNG logo
    const logoImg = new Image();
    logoImg.src = invoiceLogoPng;

    // Load the image and then generate the PDF
    logoImg.onload = () => {
      // Add the logo to the PDF
      doc.addImage(logoImg, "PNG", 10, 10, 40, 40);

      // Company Info
      doc.setFontSize(16);
      doc.text("StockDolphin", 10, 60);
      doc.setFontSize(10);
      doc.text("Your Company Address", 10, 65);
      doc.text("Skopje, North Macedonia", 10, 70);
      doc.text("Phone: +38970112233", 10, 75);
      doc.text("Email: info@stockdolphin.com", 10, 80);

      // Add title and details to the PDF
      doc.setFontSize(18);
      doc.text("Invoice", 10, 100);
      doc.setFontSize(12);
      doc.text(`Invoice Name: ${invoiceName}`, 10, 110);
      doc.text(
        `Supplier: ${suppliers.find((s) => s._id === selectedSupplier)?.name}`,
        10,
        115
      );
      doc.text(`Order Date: ${selectedDate}`, 10, 120);

      const order = orders.find((o) => o._id === selectedOrder);
      doc.text(`Order Total: €${order?.totalPrice}`, 10, 125);
      doc.text(`Order Quantity: ${order?.quantity}`, 10, 130);
      doc.text(`Item Name: ${item.name}`, 10, 135);

      // Save the PDF
      doc.save(`${invoiceName || "invoice"}.pdf`);
      close();
    };
    logoImg.onerror = () => {
      console.error("Error loading logo image.");
    };
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
                  {order.totalPrice}
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
