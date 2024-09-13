import "./AddSupplierModal.css";
import React, { useState } from "react";
import closeIcon from "../../assets/icons/close-icon.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import GreyButton from "../../components/GreyButton/GreyButton";

const AddSupplierModal = ({ show, close, onSubmit }) => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [isNamePlaceholderHidden, setIsNamePlaceholderHidden] = useState(false);
  const [isAddressPlaceholderHidden, setIsAddressPlaceholderHiden] =
    useState(false);
  const [isPhonePlaceholderHidden, setIsPhonePlaceholderHidden] =
    useState(false);
  const [isEmailPlaceholderHidden, setIsEmailPlaceholderHidden] =
    useState(false);

  const handleNameFocus = () => {
    setIsNamePlaceholderHidden(true);
  };
  const handleNameBlur = () => {
    setIsNamePlaceholderHidden(false);
  };

  const handleAddressFocus = () => {
    setIsAddressPlaceholderHiden(true);
  };
  const handleAddressBlur = () => {
    setIsAddressPlaceholderHiden(false);
  };

  const handlePhoneFocus = () => {
    setIsPhonePlaceholderHidden(true);
  };
  const handlePhoneblur = () => {
    setIsPhonePlaceholderHidden(false);
  };

  const handleEmailFocus = () => {
    setIsEmailPlaceholderHidden(true);
  };
  const handleEmailBlur = () => {
    setIsEmailPlaceholderHidden(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: supplierName,
      address: supplierAddress,
      phone: supplierPhone,
      email: supplierEmail,
    };
    onSubmit(formData);
    close();
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal-header">
          <span className="modal-header-name">Add Supplier</span>
          <span className="close-btn" onClick={close}>
            <img src={closeIcon} alt="" />
          </span>
        </div>
        <div className="modal-content">
          <form className="modal-form" onSubmit={handleSubmit}>
            <input
              className="form-name"
              placeholder={isNamePlaceholderHidden ? "" : "Name"}
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              required
            />
            <input
              className="form-name"
              placeholder={isAddressPlaceholderHidden ? "" : "Address"}
              type="text"
              value={supplierAddress}
              onChange={(e) => setSupplierAddress(e.target.value)}
              onFocus={handleAddressFocus}
              onBlur={handleAddressBlur}
              required
            />
            <input
              className="form-name"
              placeholder={isPhonePlaceholderHidden ? "" : "Phone number"}
              type="text"
              value={supplierPhone}
              onChange={(e) => setSupplierPhone(e.target.value)}
              onFocus={handlePhoneFocus}
              onBlur={handlePhoneblur}
              required
            />
            <input
              className="form-name"
              placeholder={isEmailPlaceholderHidden ? "" : "Email"}
              type="text"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              required
            />
            <div className="line-divider"></div>
            <div className="button-options">
              <GreyButton text="CANCEL" onClick={close} />
              <GreenButton text="Add Supplier" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <div className={`${show ? "modal-background" : ""}`}></div>
    </>
  );
};

export default AddSupplierModal;
