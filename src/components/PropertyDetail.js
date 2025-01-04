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
    height: "auto", // Adjust height automatically based on width
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
    flexWrap: "wrap", // Allow thumbnails to wrap on smaller screens
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

  // Check if a floorplan image exists
  const floorplanImage = property.picture.find((imageUrl) =>
    imageUrl.toLowerCase().includes("floorimage")
  );

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-3">{property.type}</h1>
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
              className="img-thumbnail"
            />
          ))}
        </div>
      </div>
      <div className="container mt-4">
        <div className="row align-items-center border-top border-bottom border-secondary">
          <div className="col-12 col-md-6 text-justify mb-3">
            <p className="h5">
              <i className="bi bi-cash-stack"></i> Price: ${property.price}
            </p>
            <p className="h5">
              <i className="bi bi-geo-alt-fill"></i> Location:{" "}
              {property.location}
            </p>
            <p className="h5">
              <i className="bi bi-person-circle"></i> Tenure: {property.tenure}
            </p>
          </div>
          <div className="col-12 col-md-6 text-justify mb-3">
            <p className="h5">
              <i className="bi bi-arrows-vertical"></i> Size: {property.size} sq
              ft
            </p>
            <p className="h5">
              <i className="bi bi-house-door-fill"></i> Year Built:{" "}
              {property.yearBuilt}
            </p>
            <p className="h5">
              <i className="bi bi-mailbox2-flag"></i> Postcode:{" "}
              {property.postcode}
            </p>
          </div>
        </div>
        <p className="h4 text-center fw-bold lh-base mt-3">
          {property.description}
        </p>

        {/* Floorplan Image with Hover Zoom */}
        {floorplanImage && (
          <div className="mt-4 text-center floorplan-container">
            <h4 className="fw-bold mb-3">Floor Plan</h4>
            <div className="floorplan-zoom">
              <img
                src={floorplanImage}
                alt="Floorplan"
                className="img-fluid"
                style={imgStyle}
              />
            </div>
          </div>
        )}
      </div>
      <div className="container d-flex justify-content-end">
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/home")} // Navigate back to home page
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PropertyDetail;
