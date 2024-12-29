import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PropertyDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property; // Get the property data passed via React Router state

  if (!property) {
    return <p>Property not found!</p>;
  }

  return (
    <div className="container mt-4">
      <h1>{property.type}</h1>
      <img
        src={property.picture}
        alt={property.type}
        className="img-fluid"
        style={{ height: "300px", objectFit: "cover" }}
      />
      <p>
        <strong>Price:</strong> ${property.price}
      </p>
      <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Description:</strong> {property.description}
      </p>
      <p>
        <strong>Size:</strong> {property.size} sq ft
      </p>
      <p>
        <strong>Year Built:</strong> {property.yearBuilt}
      </p>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/home")} // Navigate back to home page
      >
        Back to Home
      </button>
    </div>
  );
}

export default PropertyDetail;
