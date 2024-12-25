import logo from "./logo.svg";
import "./styles/styles.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import PropertyList from "./components/PropertyList";

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
          <Route path="/PropertyList" element={<PropertyList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
