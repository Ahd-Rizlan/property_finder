import React from "react";

function Card({ Property }) {
  // Use 'Property' to match the prop name

  return (
    //havinf the return to take next data in the array
    //and display it in the card

    <div className="border m-2" key={Property.id}>
      <img src={Property.picture} alt={Property.type} className="img-fluid" />
      <div className="p-2">
        <h3>{Property.type}</h3>
        <p>Price: ${Property.price}</p>
        <p>Location: {Property.location}</p>
        <a href={Property.url}>More Details</a>
      </div>
    </div>
  );
}

export default Card;
