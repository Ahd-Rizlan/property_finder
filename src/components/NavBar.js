import { Link } from "react-router-dom";
import React from "react";
function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/" className="SiteTitle">
        <img src="propertyFinder_Nav_logo.jpg" alt="Site Logo" />
      </Link>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/Favourites">My Favourites</Link>
        </li>
        <li>
          <Link to="/ContactUs">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
