import React, { useState, useEffect } from "react";

function Card({ Property, isListView }) {
  const cardStyle = {
    width: isListView ? "100%" : "18rem",
    margin: "0 auto",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#343a40", // Dark background color
    color: "white", // White text for contrast
  };

  const cardStyleOnHover = {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  };

  const imgStyle = {
    height: "12rem",
    objectFit: "cover",
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favourites.some((fav) => fav.id === Property.id));
  }, [Property.id]);

  const handleAddToFavourites = () => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (isFavourite) {
      // Remove from favourites
      const updatedFavourites = favourites.filter(
        (fav) => fav.id !== Property.id
      );
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    } else {
      // Add to favourites
      favourites.push(Property);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    setIsFavourite(!isFavourite);
  };

  return (
    <div
      className="card m-2"
      style={{ ...cardStyle, ...(isHovered ? cardStyleOnHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={Property.picture}
        alt={Property.type}
        className="card-img-top"
        style={imgStyle}
      />
      <div className="card-body">
        <h5 className="card-title">{Property.type}</h5>
        <p className="card-text">Price: ${Property.price}</p>
        <p className="card-text">Location: {Property.location}</p>
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (window.location.href = Property.url)}
          >
            View Details
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
