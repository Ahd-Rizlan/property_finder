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

  const containerStyle = {
    minHeight: "100vh", // Make sure the container takes the full height of the viewport
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle} className="container justify-content-center">
      <h1 className="my-4">My Favourites</h1>
      {favourites.length === 0 ? (
        <p>No favourites added yet!</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {favourites.map((property) => {
            // Ensure Property.picture is an array before passing to Card
            const validProperty = {
              ...property,
              picture: Array.isArray(property.picture) ? property.picture : [],
            };

            return (
              <Card
                key={property.id}
                Property={validProperty}
                isListView={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favourites;
