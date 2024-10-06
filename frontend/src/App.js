import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import Dashboard from "./screens/Dashboard/Dashboard";
import Inventory from "./screens/Inventory/Inventory";
import Reports from "./screens/Reports/Reports";
import Suppliers from "./screens/Suppliers/Suppliers";
import Items from "./screens/Items/Items";
import Orders from "./screens/Orders/Orders";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import ActivityHistory from "./screens/Activity History/ActivityHistory";
import InventorySummary from "./screens/Inventory Summary/InventorySummary";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />
            {/*check if should be name or categoryName */}
            <Route
              path="/inventory/:categoryName/:id"
              element={
                <ProtectedRoute>
                  <Items />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory/item/:itemName/:id"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity-history"
              element={
                <ProtectedRoute>
                  <ActivityHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory-summary"
              element={
                <ProtectedRoute>
                  <InventorySummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute>
                  <Suppliers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
