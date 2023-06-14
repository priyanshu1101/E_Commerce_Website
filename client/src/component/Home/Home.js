import React, { useEffect } from 'react'
import Product from './Product';
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import MetaData from '../../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productAction';
import { Audio } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.productReducer)

    useEffect(() => {
        if(error)
        {
            return toast.error(error);
        }
        dispatch(getProducts());
    }, [dispatch,error]);

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

                {loading ? <Audio color='#5953bc' height="150" width="150" /> : (products && products.map((product) => <Product key={product._id} product={product} />))}

            </div>
        </>
    )
}

export default Home