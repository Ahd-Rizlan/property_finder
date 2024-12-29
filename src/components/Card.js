import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ Property, isListView }) {
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

  const handleSeeMore = () => {
    navigate("/property-detail", { state: { property: Property } }); // Navigate to the PropertyDetail page
  };

  return (
    <div className="card m-2" style={cardStyle}>
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
