import React from "react";
import NavBar from "../Components/NavBar";
import HeroImage from "../Components/HeroImage";
import Cards from "../Components/Cards";
import Footer from "../Components/Footer";
import AdminNavBar from "../Components/AdminNavBar";
import AdminOrders from "../Components/AdminOrders";
import AdminCards from "../Components/AdminCards";

function Main() {
  return (
    <div className="main">
      {/* <NavBar />
      <HeroImage />
      <Cards />
      <Footer /> */}
      <AdminNavBar />
      <AdminOrders />
      <AdminCards />
      <Footer />
    </div>
  );
}

export default Main;
