import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Beverage3DBackground from "../background/Beverage3DBackground";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0">
        <Beverage3DBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 md:pt-20 lg:pt-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
