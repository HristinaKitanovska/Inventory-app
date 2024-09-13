import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Inventory from "./screens/Inventory/Inventory";
import Reports from "./screens/Reports/Reports";
import Suppliers from "./screens/Suppliers/Suppliers";
import Items from "./screens/Items/Items";
import Orders from "./screens/Orders/Orders";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          {/*check if should be name or categoryName */}
          <Route path="/inventory/:categoryName/:id" element={<Items />} />
          <Route path="/inventory/item/:itemName/:id" element={<Orders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
