import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: '#e5e7eb',
    activeColor: '#fbbf24',
    size: window.innerWidth < 600 ? 16 : 18,
    value: product.ratings,
    isHalf: true
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStockStatus = () => {
    if (product.Stock === 0) return { status: 'out-of-stock', text: 'Out of Stock' };
    if (product.Stock <= 5) return { status: 'low-stock', text: 'Low Stock' };
    return { status: 'in-stock', text: 'In Stock' };
  };

  const stockInfo = getStockStatus();

  return (
    <Link className="productCard" to={`/products/product/${product._id}`}>
      <div className="product-image-container">
        <img 
          src={product.images[0]?.url} 
          alt={product.name}
          loading="lazy"
        />
        <div className={`stock-status ${stockInfo.status}`}>
          {stockInfo.text}
        </div>
        {product.Stock === 0 && (
          <div className="product-badge sale">
            Sold Out
          </div>
        )}
      </div>
      
      <div className="product-content">
        <h3 className="product-title">
          {product.name.length > 60 ? `${product.name.substring(0, 60)}...` : product.name}
        </h3>
        
        <div className="product-rating">
          <div className="rating-stars">
            <ReactStars {...options} />
          </div>
          <span className="rating-text">
            ({product.numOfReviews} {product.numOfReviews === 1 ? 'Review' : 'Reviews'})
          </span>
        </div>
        
        <div className="product-price">
          <div>
            <span className="price-current">{formatPrice(product.price)}</span>
            {/* You can add original price and discount logic here if available */}
          </div>
        </div>
      </div>
      
      <div className="product-actions">
        <button 
          className="btn-add-cart"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart logic here
            console.log('Add to cart:', product._id);
          }}
          disabled={product.Stock === 0}
        >
          <FaShoppingCart size={16} />
          {product.Stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        
        <button 
          className="btn-wishlist"
          onClick={(e) => {
            e.preventDefault();
            // Add to wishlist logic here
            console.log('Add to wishlist:', product._id);
          }}
        >
          <FaHeart size={16} />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;