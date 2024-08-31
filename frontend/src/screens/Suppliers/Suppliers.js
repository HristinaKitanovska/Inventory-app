import { useEffect, useState } from "react";
import "./Suppliers.css";
import AppContainer from "../../components/AppContainer/AppContainer";
import Search from "../../components/Search/Search";
import GreenButton from "../../components/GreenButton/GreenButton";
import searchIcon from "../../assets/icons/search.svg";
import add from "../../assets/icons/add-icon.svg";
import SupplierCard from "../../components/SupplierCard/SupplierCard";
import AddSupplierModal from "../../modals/AddSupplierModal/AddSupplierModal";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/suppliers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSuppliers(data.suppliers || []);
        setFilteredSuppliers(data.suppliers || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Add new supplier
  const handleAddSupplier = (formData) => {
    fetch(`http://localhost:3000/suppliers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding supplier");
        }
        return response.json();
      })
      .then((data) => {
        setSuppliers((prevSuppliers) => [...prevSuppliers, data.supplier]);
        setFilteredSuppliers((prevSuppliers) => [
          ...prevSuppliers,
          data.supplier,
        ]);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Search bar
  const handleSearch = (query) => {
    if (query) {
      const filtered = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliers); // Reset to the full list if the query is empty
    }
  };

  // Add supplier modal
  const openAddSupplierModal = () => {
    setShowAddSupplierModal(true);
  };
  const closeAddSupplierModal = () => {
    setShowAddSupplierModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <AppContainer pageTitle="Suppliers">
        <div className="inventory-options">
          <Search
            icon={searchIcon}
            placeholder="Search Suppliers"
            onSearch={handleSearch}
          />
          <GreenButton
            icon={add}
            text="add supplier"
            onClick={openAddSupplierModal}
          />
        </div>
        <div className="vertical-cards custom-supplier-card">
          {filteredSuppliers?.length > 0 ? (
            filteredSuppliers.map((supplier) => (
              <SupplierCard key={supplier._id} data={supplier} />
            ))
          ) : (
            <p>No suppliers available</p>
          )}
        </div>
        <AddSupplierModal
          show={showAddSupplierModal}
          close={closeAddSupplierModal}
          onSubmit={handleAddSupplier}
        />
      </AppContainer>
    </>
  );
};

export default Suppliers;
