import React from 'react';
import ItemCard from './ItemCard/ItemCard';
import { useSelector } from 'react-redux';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import './ItemCart.css';

const ItemCart = () => {
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate()

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        return subtotal;
    };

    const taxRate = 0.18; // 18% tax rate
    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        (cartItems.length === 0) ?
            <div className='emptyCartDiv'>
                <div className="item-cart-container empty-cart">
                    <MdOutlineRemoveShoppingCart className="cart-icon" />
                    <h2>No products in your carts</h2>
                    <button className="view-products-button" onClick={() => navigate('/products')}>
                        View Products <RiArrowRightSLine className="arrow-icon" />
                    </button>
                </div>
            </div>
            :
            <div className="item-cart-container">
                <div className="left-div">
                    <h2>Cart</h2>
                    {cartItems.map(item => (
                        <ItemCard key={item.product} item={item} />
                    ))}
                </div>
                <div className="right-div">
                    <div className="subtotal-container">
                        <h2>Order Summary</h2>
                        <div className="order-summary">
                            {cartItems.map(item => (
                                <div className="summary-item" key={item.product}>
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">Rs. {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"}</span>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="subtotal-details">
                            <div className="subtotal-row">
                                <span>Subtotal:</span>
                                <span>Rs. {calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="tax-row">
                                <span>+ Tax ({(taxRate * 100).toFixed(0)}%):</span>
                                <span>Rs. {(calculateSubtotal() * taxRate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"}</span>
                            </div>
                            <hr />
                            <div className="total-row">
                                <span><b>Total:</b></span>
                                <span>Rs. {(calculateSubtotal() + calculateSubtotal() * taxRate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00"}</span>
                            </div>
                        </div>
                        <button className="checkout-button" onClick={checkOutHandler}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
    );
};

export default ItemCart;
