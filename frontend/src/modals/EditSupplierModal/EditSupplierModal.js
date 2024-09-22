import "./EditSupplierModal.css";
import React, { useEffect, useState, useContext } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";
import AuthContext from "../../utils/AuthContext";

const EditSupplierModal = ({ show, close, supplierData, onUpdateSupplier }) => {
  const { authToken } = useContext(AuthContext);
  const [name, setName] = useState(supplierData?.name || "");
  const [address, setAddress] = useState(supplierData?.address || "");
  const [phone, setPhone] = useState(supplierData?.phone || "");
  const [email, setEmail] = useState(supplierData?.email || "");

  useEffect(() => {
    if (!authToken) {
      console.error("No auth token available. Please log in again.");
      return;
    }

    if (supplierData) {
      setName(supplierData.name);
      setAddress(supplierData.address);
      setPhone(supplierData.phone);
      setEmail(supplierData.email);
    }
  }, [supplierData, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSupplierData = {
      name,
      address,
      phone,
      email,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/suppliers/${supplierData._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSupplierData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update supplier");
      }

      const data = await response.json();
      console.log("Supplier updated successfully:", data);

      onUpdateSupplier({ ...supplierData, ...updatedSupplierData }); // Update the supplier in the parent component

      close();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Edit Supplier</span>
          <span className="close-btn" onClick={close}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="modal-content">
          <form className="modal-form" onSubmit={handleSubmit}>
            <input
              className="form-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-name"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="form-name"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="form-name"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="line-divider"></div>
            <div className="button-options">
              <GreyButton text="CANCEL" onClick={close} />
              <GreenButton text="Edit Supplier" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default EditSupplierModal;
