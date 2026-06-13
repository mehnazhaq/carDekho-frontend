import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cars } from "../data/cars";

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistIds(stored);
  }, []);

  const savedCars = cars.filter((c) => wishlistIds.includes(c.id));

  return (
    <div className="page wishlist-page" style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "2.5rem", marginBottom: "1rem" }}>
        Wishlist
      </h1>
      {savedCars.length === 0 ? (
        <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
          Your wishlist is empty. Browse cars and add favorites!
        </p>
      ) : (
        <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1pt))", gap: "1.5rem" }}>
          {savedCars.map((car) => (
            <div key={car.id} className="card" style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
              <img src={car.image} alt={car.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }} />
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", margin: "0.5rem 0" }}>{car.name}</h2>
              <p style={{ fontWeight: 600 }}>{car.price}</p>
              <Link to={`/cars/${car.id}`} style={buttonStyle}>View</Link>
            </div>
          ))}
        </div>
      )}
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

export default Wishlist;
