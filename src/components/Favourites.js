import React, { useState, useEffect } from "react";
import Card from "./Card";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = () => {
      const storedFavourites =
        JSON.parse(localStorage.getItem("favourites")) || [];
      setFavourites(storedFavourites);
    };

    loadFavourites();
  }, []);

  const handleRemoveFavourite = (propertyId) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== propertyId);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);

    // Trigger the `storage` event manually for NavBar sync
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="container">
      <h1 className="my-4">My Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites added yet!</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {favourites.map((property) => (
            <Card
              key={property.id}
              Property={property}
              isListView={false}
              onRemoveFavourite={() => handleRemoveFavourite(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
