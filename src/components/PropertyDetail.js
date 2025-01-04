import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PropertyDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state?.property; // Get the property data passed via React Router state

  if (!property) {
    return <p>Property not found!</p>;
  }

  const imgStyle = {
    maxWidth: "100%", // Ensure the image does not overflow horizontally
    height: "500px", // Increase the size of the main image
    objectFit: "cover",
    borderRadius: "8px", // Optional: rounded corners for the image
    display: "block", // Make the image a block element so margin auto works
    marginLeft: "auto", // Center horizontally
    marginRight: "auto", // Center horizontally
  };

  const thumbnailContainerStyle = {
    display: "flex",
    justifyContent: "center", // Center thumbnails horizontally
    gap: "10px", // Space between thumbnails
    marginTop: "10px", // Add some space between the main image and thumbnails
  };

  const thumbnailStyle = {
    height: "80px", // Set a fixed size for thumbnails
    width: "80px", // Set thumbnail to a square shape
    marginBottom: "10px", // Add some space between thumbnails
    objectFit: "cover",
    borderRadius: "5px", // Optional: rounded corners for thumbnails
    cursor: "pointer", // Make the thumbnails look clickable
  };

  const handleThumbnailClick = (imageUrl) => {
    // Change main image when a thumbnail is clicked
    document.getElementById("mainImage").src = imageUrl;
  };

  return (
    <div className="container mt-4">
      <h1 class="text-center mb-3">{property.type}</h1>
      <div>
        {/* Main Image */}
        <img
          id="mainImage"
          src={property.picture[1]} // Set the initial main image
          alt={property.type}
          className="img-fluid"
          style={imgStyle}
        />
        {/* Thumbnails Below the Main Image */}
        <div style={thumbnailContainerStyle}>
          {property.picture.slice(1).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              style={thumbnailStyle}
              onClick={() => handleThumbnailClick(imageUrl)}
            />
          ))}
        </div>
      </div>
      <div class="container">
        <div class="row align-items-center">
          <p class="fw-bold lh-base mt-3">{property.description}</p>

          <p class="h5">Price: ${property.price}</p>
          <p class="h5">Location: {property.location}</p>
          <p class="h5">Size: {property.size} sq ft</p>
          <p class="h5">Year Built: {property.yearBuilt}</p>
        </div>
      </div>
      <div className="container d-flex justify-content-end">
        <button
          className="btn btn-secondary mt-3 "
          onClick={() => navigate("/home")} // Navigate back to home page
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PropertyDetail;
