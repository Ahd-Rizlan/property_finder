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
    window.addEventListener("storage", loadFavourites);

    return () => {
      window.removeEventListener("storage", loadFavourites);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">My Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites added yet!</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {favourites.map((property) => (
            <Card key={property.id} Property={property} isListView={false} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
