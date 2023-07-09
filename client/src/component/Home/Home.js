import React, { useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productAction';
import { Audio } from 'react-loader-spinner';
import { useAlert } from 'react-alert';
import { CLEAR_ERRORS } from '../../constants/productConstants';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    return (
        <>
            <MetaData title="EasyShop.in" />
            <div className='home-banner'>
                <p>Welcome to EasyShop.in</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href='#container' style={{ textDecoration: 'none' }}>
                    <button>
                        <CgMouse size={25} />
                    </button>
                </a>
            </div>
            <h2 className='home-heading'>Featured Products</h2>
            <div className='product-container' id='container' style={{minHeight:'100vh'}}>
                {loading === undefined || loading ? (
                    <Audio color='#5953bc' height='150' width='150' />
                ) : (
                    products &&
                    products.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                    ))
                )}
            </div>
        </>
    );
};

export default Home;
