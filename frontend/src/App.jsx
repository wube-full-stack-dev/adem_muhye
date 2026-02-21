import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ CORRECT
import AddSale from "./pages/AddSale"; // Note: Your file is AddSale.jsx (not Addsale)
import ViewSales from "./pages/ViewSales";
import HomePage from "./pages/HomePage";
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AdminPage from "./pages/admin";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} /> {/* ✅ AddSale (capital S) */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/viewsale" element={<ViewSales />} />
        <Route path="/addsale" element={<AddSale />} />{" "}
        {/* ✅ AddSale (capital S) */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
