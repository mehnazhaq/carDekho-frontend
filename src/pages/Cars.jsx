import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cars } from "../data/cars";

const Cars = () => {
  // Extract unique brands from car names (simple split by first word)
  const brands = Array.from(new Set(cars.map((c) => c.name.split(' ')[0])));

  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCars = cars.filter((c) => {
    const priceNum = Number(c.price.replace(/[^0-9.-]+/g, ""));
    const matchesBrand = selectedBrand ? c.name.startsWith(selectedBrand) : true;
    const matchesMin = minPrice ? priceNum >= Number(minPrice) : true;
    const matchesMax = maxPrice ? priceNum <= Number(maxPrice) : true;
    return matchesBrand && matchesMin && matchesMax;
  });

  return (
    <div className="page cars-page" style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "2.5rem", marginBottom: "1rem" }}>Cars</h1>

      {/* Filter Controls */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {/* Brand Selector */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          style={filterSelectStyle}
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {/* Price Range */}
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={filterInputStyle}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={filterInputStyle}
        />
      </div>

      <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
        {filteredCars.map((car) => (
          <div key={car.id} className="card" style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
            <img src={car.image} alt={car.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }} />
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", margin: "0.5rem 0" }}>{car.name}</h2>
            <p style={{ fontWeight: 600 }}>{car.price}</p>
            <Link to={`/cars/${car.id}`} style={buttonStyle}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const buttonStyle = {
  display: "inline-block",
  marginTop: "0.5rem",
  padding: "0.5rem 1rem",
  background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
  color: "#fff",
  borderRadius: "4px",
  textDecoration: "none",
  fontSize: "0.9rem",
};

const filterSelectStyle = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const filterInputStyle = {
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "120px",
};

export default Cars;
