import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ Property, isListView }) {
  const [mainImage, setMainImage] = useState(Property.picture[0]); // Set initial main image as the first picture
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favourites.some((fav) => fav.id === Property.id));
  }, [Property.id]);

  const handleAddToFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (isFavourite) {
      const updatedFavourites = favourites.filter(
        (fav) => fav.id !== Property.id
      );
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    } else {
      favourites.push(Property);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    setIsFavourite(!isFavourite);

    // Trigger the storage event to update NavBar count
    window.dispatchEvent(new Event("storage"));
  };

  const cardStyle = {
    width: isListView ? "100%" : "18rem",
    margin: "0 auto",
    backgroundColor: "#343a40",
    color: "white",
  };

  const imgStyle = {
    height: "12rem",
    objectFit: "cover",
  };

  const thumbnailStyle = {
    height: "4rem",
    width: "4rem",
    objectFit: "cover",
    marginTop: "5px",
    borderRadius: "5px", // Optional: make the corners slightly rounded
    marginRight: "5px", // Add margin for better spacing between thumbnails
    marginBottom: "5px", // Margin between rows when thumbnails wrap
    cursor: "pointer", // Makes it look clickable
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl); // Change main image when thumbnail is clicked
  };

  const handleSeeMore = () => {
    navigate("/property-detail", { state: { property: Property } }); // Navigate to the PropertyDetail page
  };

  return (
    <div className="card-body">
      <div className="card m-2" style={cardStyle}>
        <h5 className="card-title text-center">{Property.type}</h5>
        {/* Main image display */}
        <img
          src={mainImage} // Use the current main image
          alt={Property.type}
          className="card-img-top"
          style={imgStyle}
        />

        {/* Thumbnail images with flex-wrap and limited to 4 per row */}
        <div
          className="d-flex flex-wrap"
          style={{
            gap: "3px",
            justifyContent: isListView ? "center" : "flex-start", // Center thumbnails in list view
          }}
        >
          {Property.picture.slice(1).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              style={thumbnailStyle}
              onClick={() => handleThumbnailClick(imageUrl)} // Update main image on click
            />
          ))}
        </div>
        <p className="card-text h4 mt-5 text-center">{Property.location}</p>
        <p className="card-text h5 mx-5">
          <i className="bi bi-cash"></i> Price: ${Property.price}
        </p>
        <p className="card-text h5 mx-5">
          <i className="bi bi-house-door-fill"></i> Bedrooms:{" "}
          {Property.bedrooms}
        </p>
        <p className="card-text h5 mx-5">
          <i class="bi bi-arrows-vertical"></i> Size: {Property.size} sq.ft
        </p>

        <div className="d-grid gap-2 mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSeeMore} // Open full details page
          >
            See More
          </button>

          <button
            type="button"
            className={`btn ${isFavourite ? "btn-danger" : "btn-primary"}`}
            onClick={handleAddToFavourites}
          >
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
