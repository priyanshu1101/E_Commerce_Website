import React, { useEffect } from 'react';
import ItemCard from './ItemCard/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import './ItemCart.css';
import { updateCart } from '../../../actions/cartAction';
import { CLEAR_ERRORS } from '../../../constants/cartConstants';
import { useAlert } from 'react-alert';
import MetaData from '../../../MetaData';

const ItemCart = () => {
    const { cartItems, error } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    // dispatch(updateCart(cartItems));

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        return subtotal;
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS })
        }
    }, [dispatch, error, alert]);

    useEffect(() => {
        dispatch(updateCart(cartItems))
        // eslint-disable-next-line
    }, [])

    const taxRate = 0.18; // 18% tax rate
    const checkOutHandler = () => {
        var flag = 1;
        cartItems.forEach(item => {
            if (item.stock === 0) {
                alert.error(`${item.name} is out of stock !!`)
                flag = 0;
            }
        })
        if (flag === 1)
            navigate('/login?redirect=/shipping')
    }

    return (
        (cartItems.length === 0) ?
            <div className='emptyCartDiv'>
                <MetaData title="Item Cart" />
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
                <MetaData title="Item Cart" />  
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
                                    <span className="item-name" style={{ width: '56%' }}>{item.name}</span>
                                    <span className="item-name" style={{ width: '14%', textAlign: 'center' }}>X {item.quantity}</span>
                                    <span className="item-price" style={{ width: '30%', textAlign: 'right' }}>Rs. {(item.price * item.quantity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
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
                                <span>Rs. {(calculateSubtotal() * taxRate).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </div>
                            <hr />
                            <div className="total-row">
                                <span><b>Total:</b></span>
                                <span>Rs. {(calculateSubtotal() + calculateSubtotal() * taxRate).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            </div>
                        </div>
                        <button className="checkout-button" onClick={checkOutHandler}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
    );
};

export default ItemCart;
