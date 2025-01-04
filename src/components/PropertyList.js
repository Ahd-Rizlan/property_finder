import React, { useState } from "react";
import PropertyRecords from "../records/properties.json";
import Card from "./Card";

function PropertyList() {
  const [isListView, setIsListView] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    minBedrooms: "",
    maxBedrooms: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByDateDesc, setSortByDateDesc] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Validate the min/max values for bedrooms and price
  const validateFilters = () => {
    if (
      (filters.minBedrooms &&
        filters.maxBedrooms &&
        filters.minBedrooms > filters.maxBedrooms) ||
      (filters.minPrice &&
        filters.maxPrice &&
        parseFloat(filters.minPrice) > parseFloat(filters.maxPrice))
    ) {
      setErrorMessage(
        "Minimum value must be less than or equal to Maximum value."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Filter and Sort logic
  const filteredProperties = PropertyRecords.properties
    .filter((property) => {
      return (
        (filters.type === "" || property.type === filters.type) &&
        (filters.minBedrooms === "" ||
          property.bedrooms >= filters.minBedrooms) &&
        (filters.maxBedrooms === "" ||
          property.bedrooms <= filters.maxBedrooms) &&
        (filters.minPrice === "" ||
          property.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          property.price <= parseFloat(filters.maxPrice))
      );
    })
    .sort((a, b) => {
      if (sortByPrice) {
        return a.price - b.price;
      }
      if (sortByDateDesc) {
        // Sort by date added in descending order
        const dateA = new Date(
          `${a.added.year}-${a.added.month}-${a.added.day}`
        );
        const dateB = new Date(
          `${b.added.year}-${b.added.month}-${b.added.day}`
        );
        return dateB - dateA;
      }
      return 0;
    });

  return (
    <div className="container my-5 ">
      <h2 className="text-center mb-4">Explore Properties</h2>

      {/* Filters UI with Dark Background */}
      <div className="bg-dark text-white p-4 rounded mb-4 border border-white">
        {/* Error Message */}
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}

        <div className="d-flex justify-content-between flex-wrap mb-4">
          {/* Type Filter */}
          <div className="w-25 mb-3">
            <label className="form-label">Property Type</label>
            <select
              className="form-select"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          {/* Bedrooms Filter */}
          <div className="d-flex w-50 mb-3">
            <div className="w-50 me-2">
              <label className="form-label">Min Bedrooms</label>
              <input
                type="number"
                className="form-control"
                value={filters.minBedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, minBedrooms: e.target.value })
                }
                placeholder="Min"
                min="1"
              />
            </div>
            <div className="w-50">
              <label className="form-label">Max Bedrooms</label>
              <input
                type="number"
                className="form-control"
                value={filters.maxBedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, maxBedrooms: e.target.value })
                }
                placeholder="Max"
                min="1"
              />
            </div>
          </div>

          {/* Price Filter */}
          <div className="d-flex w-50 mb-3">
            <div className="w-50 me-2">
              <label className="form-label">Min Price</label>
              <input
                type="number"
                className="form-control"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                placeholder="Min"
                min="10000"
              />
            </div>
            <div className="w-50">
              <label className="form-label">Max Price</label>
              <input
                type="number"
                className="form-control"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                placeholder="Max"
                min="10000"
              />
            </div>
          </div>

          {/* Sort Buttons */}
          <div className="d-flex justify-content-center w-100">
            <button
              className="btn btn-outline-light me-2"
              onClick={() => {
                if (validateFilters()) {
                  setSortByPrice(!sortByPrice);
                }
              }}
            >
              Sort by Price {sortByPrice ? "↓" : "↑"}
            </button>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                setSortByDateDesc(!sortByDateDesc);
              }}
            >
              Sort by Date {sortByDateDesc ? "↓" : "↑"}
            </button>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="d-flex justify-content-center mb-4">
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
          isListView ? "flex-column" : "justify-content-center"
        }`}
      >
        {filteredProperties.length === 0 ? (
          <p className="text-center w-100">
            No properties found. Try adjusting the filters.
          </p>
        ) : (
          filteredProperties.map((property) => (
            <Card
              key={property.id}
              Property={property}
              isListView={isListView}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyList;
