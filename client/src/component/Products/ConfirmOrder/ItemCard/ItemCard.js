import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  const Navigate = useNavigate();
  const totalPrice = item.price * item.quantity;
  return (
    <div className="item-card">
      <div className="item-details">
        <div className="image-container" style={{ cursor: 'pointer' }} onClick={() => Navigate(`/product/${item.product}`)}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className="item-info">
          <h3 style={{ cursor: 'pointer' }} onClick={() => Navigate(`/product/${item.product}`)}>{item.name}</h3>
          <p>Price: Rs. {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <div className="quantity-input">
            <label>Quantity: {item.quantity}</label>
          </div>
          <div className="total-price">
            <b>Total Price</b>: Rs. {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} x {item.quantity} = Rs. {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
