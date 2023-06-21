import React, { useEffect } from 'react'
import ProductCard from './ProductCard';
import { CgMouse } from "react-icons/cg";
import MetaData from '../../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productAction';
import { Audio } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css"

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products)
    useEffect(() => {
        if (error) {
            toast.error(error);
            return () => { };
        }
        dispatch(getProducts());
    }, [dispatch, error]);

    return (
        <>
            <ToastContainer />
            <MetaData title="EasyShop.in" />
            <div className='banner'>
                <p>Welcome to EasyShop.in</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href='#container'>
                    <button>
                        Scoll <CgMouse />
                    </button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className='container' id='container'>

                {(loading === undefined || loading) ? <Audio color='#5953bc' height="150" width="150" /> : (products && products?.map((product) => <ProductCard key={product?._id} product={product} />))}

            </div>
        </>
    )
}

export default Home