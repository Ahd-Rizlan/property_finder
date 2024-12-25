import React from "react";
import PropertyRecords from "../records/properties.json";
import Card from "./Card";

function PropertyList() {
  return (
    <div className="d-flex">
      {PropertyRecords.properties.map((property) => (
        <Card key={property.id} Property={property} />
      ))}
    </div>
  );
}

export default PropertyList;
