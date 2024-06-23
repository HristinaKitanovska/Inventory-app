import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Inventory from "./screens/Inventory/Inventory";
import Reports from "./screens/Reports/Reports";
import Suppliers from "./screens/Suppliers/Suppliers";
import Items from "./screens/Items/Items";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<Items />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
