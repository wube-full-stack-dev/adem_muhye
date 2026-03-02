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

// ===== ADMIN PAGES =====
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AddSale from "./pages/admin/AddSale";
import ViewSales from "./pages/admin/ViewSales";

// ===== MANAGER PAGES =====
import ManagerDashboard from "./pages/manager/ManagerDashboard";

// ===== CUSTOMER/STAFF PAGES =====
import CustomerDashboard from "./pages/customer/CustomerDashboard";
// Import the new pages import ProductsPage from
import ProductsPage from "./pages/customer/ProductsPage";
import MyOrdersPage from "./pages/customer/MyOrdersPage";
import OrderPage from "./pages/Customer/OrderPage";

// ===== COMPONENTS =====
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      {/* Header shows on all pages */}
      <MainLayout>
        {/* <Header /> */}

        <Routes>
          {/* ===== PUBLIC ROUTES (Anyone can access) ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* ===== PROTECTED ROUTES (Login required) ===== */}
          {/* Admin Routes - Only admin can access */}
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
          {/* Manager Routes - Only manager can access */}
          <Route
            path="/manager/dashboard"
            element={
              <PrivateRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </PrivateRoute>
            }
          />
          {/* Customer/Staff Routes - Only staff can access */}
          <Route
            path="/customer/dashboard"
            element={
              <PrivateRoute allowedRoles={["staff"]}>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />

          <Route path="/products" element={<ProductsPage />} />
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
          {/* ===== 404 ROUTE (Must be LAST) ===== */}
          <Route path="*" element={<Err />} />
        </Routes>

        {/* Footer shows on all pages */}
        {/* <Footer /> */}
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
