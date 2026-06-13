import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cars } from '../data/cars';

const CarDetails = () => {
  const { id } = useParams();
  const car = cars.find((c) => String(c.id) === id);
const addToWishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  if (!wishlist.includes(car.id)) {
    wishlist.push(car.id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert('Added to wishlist!');
  } else {
    alert('Already in wishlist.');
  }
};
  if (!car) {
    return (
      <div className="page car-details" style={{ padding: '2rem' }}>
        <h2>Car not found</h2>
        <Link to="/cars" style={{ color: '#3b82f6' }}>Back to Cars</Link>
      </div>
    );
  }

  return (
    <div className="page car-details" style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '2.5rem', marginBottom: '1rem' }}>{car.name}</h1>
      <img src={car.image} alt={car.name} style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
      <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>{car.description}</p>
      <p style={{ fontWeight: 600, marginTop: '1rem' }}>{car.price}</p>
<>
  <button onClick={addToWishlist} className="wishlist-btn">Add to Wishlist</button>
  <Link to="/cars" style={{ display: 'inline-block', marginTop: '1rem', color: '#fff', background: 'linear-gradient(135deg, #3b82f6, #1e3a8a)', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none' }}>Back to Cars</Link>
</>
    </div>
  );
};

export default CarDetails;
