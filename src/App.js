import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import ContactUs from "./components/ContactUs";
import PropertyDetail from "./components/PropertyDetail"; // Import the new PropertyDetail component

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Favourites" element={<Favourites />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/property-detail" element={<PropertyDetail />} />{" "}
          {/* Add this route */}
        </Routes>
      </div>
    </>
  );
}

export default App;
