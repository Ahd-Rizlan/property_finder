import React, { useState } from "react";
import PropertyRecords from "../records/properties.json";
import Card from "./Card";

function PropertyList() {
  const [isListView, setIsListView] = useState(false);

  return (
    <div className="container">
      {/* View Toggle Buttons */}
      <div className="d-flex justify-content-end my-3">
        <button
          className={`btn ${
            !isListView ? "btn-primary" : "btn-outline-primary"
          } me-2`}
          onClick={() => setIsListView(false)}
        >
          Grid View
        </button>
        <button
          className={`btn ${
            isListView ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setIsListView(true)}
        >
          List View
        </button>
      </div>

      {/* Property Cards */}
      <div
        className={`d-flex flex-wrap ${
          isListView ? "flex-column" : "justify-content-between"
        }`}
      >
        {PropertyRecords.properties.map((property) => (
          <Card key={property.id} Property={property} isListView={isListView} />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
