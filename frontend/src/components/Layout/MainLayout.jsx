import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24">
        {/* pt-16 = 64px on mobile, pt-20 = 80px on tablet, pt-24 = 96px on desktop */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
