import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [favouritesCount, setFavouritesCount] = useState(0);

  useEffect(() => {
    const updateFavouritesCount = () => {
      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
      setFavouritesCount(favourites.length);
    };

    updateFavouritesCount();
    window.addEventListener("storage", updateFavouritesCount);

    return () => {
      window.removeEventListener("storage", updateFavouritesCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Property Finder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Favourites" className="nav-link">
                My Favourites
                {favouritesCount > 0 && (
                  <span className="badge bg-primary ms-2">
                    {favouritesCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ContactUs" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
