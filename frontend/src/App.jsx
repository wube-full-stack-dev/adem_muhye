import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== PUBLIC PAGES =====
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Err from "./pages/Err";
import ProductsPage from "./pages/Customer/ProductsPage"; // ← CAPITAL C

// ===== PROTECTED PAGES =====
import OrderPage from "./pages/Customer/OrderPage"; // ← CAPITAL C
import MyOrdersPage from "./pages/Customer/MyOrdersPage"; // ← CAPITAL C
import CustomerDashboard from "./pages/Customer/CustomerDashboard"; // ← CAPITAL C
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AddSale from "./pages/admin/AddSale";
import ViewSales from "./pages/admin/ViewSales";

// ===== COMPONENTS =====
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ===== CUSTOMER ROUTES ===== */}
          <Route
            path="/customer/dashboard"
            element={
              <PrivateRoute allowedRoles={["staff"]}>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/order"
            element={
              <PrivateRoute allowedRoles={["staff", "manager", "admin"]}>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <PrivateRoute allowedRoles={["staff", "manager", "admin"]}>
                <MyOrdersPage />
              </PrivateRoute>
            }
          />

          {/* ===== MANAGER ROUTES ===== */}
          <Route
            path="/manager/dashboard"
            element={
              <PrivateRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </PrivateRoute>
            }
          />

          {/* ===== ADMIN ROUTES ===== */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/addsale"
            element={
              <PrivateRoute allowedRoles={["admin", "manager"]}>
                <AddSale />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/viewsale"
            element={
              <PrivateRoute allowedRoles={["admin", "manager"]}>
                <ViewSales />
              </PrivateRoute>
            }
          />

          {/* ===== 404 ===== */}
          <Route path="*" element={<Err />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
