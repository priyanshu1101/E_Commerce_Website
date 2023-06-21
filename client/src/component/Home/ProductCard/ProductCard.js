import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color2: "#ffa41c",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true
  };

  return (
    <Link className='productCard' to={`product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span className="numOfReviews">({product.numOfReviews} Reviews)</span>
      </div>
      <span className="price">₹ {product.price}</span>
    </Link>
  );
};

export default ProductCard;
