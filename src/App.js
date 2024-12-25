import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
