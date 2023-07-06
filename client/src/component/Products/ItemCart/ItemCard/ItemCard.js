import React from 'react';
import { TiPlus, TiMinus } from 'react-icons/ti';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemFromCart } from '../../../../actions/cartAction';
import { useAlert } from 'react-alert';
import './ItemCard.css';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const Navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const totalPrice = item.price * item.quantity;

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      dispatch(addItemsToCart(item.product, item.quantity - 1))
    }
    else {
      onDelete();
    }
  };

  const incrementQuantity = () => {
    if (item.quantity < item.stock) {
      dispatch(addItemsToCart(item.product, item.quantity + 1))
    }
    else {
      alert.show(`Oops !! , Only ${item.stock} left in stock :(`)
    }
  };

  const onDelete = () => {
    dispatch(removeItemFromCart(item.product));
  }
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
            <div className="quantity-controls">
              <button
                className="quantity-button"
                onClick={decrementQuantity}
              >
                <TiMinus />
              </button>
              <input
                type="number"
                value={item.quantity}
                min="1"
                max={item.stock}
                readOnly
              />
              <button
                className="quantity-button"
                onClick={incrementQuantity}
              >
                <TiPlus />
              </button>
              <button className="delete-button" onClick={onDelete}>
                <AiFillDelete />
              </button>
            </div>
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
