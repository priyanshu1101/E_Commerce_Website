import React, { useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { CgMouse } from 'react-icons/cg';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaArrowRight } from 'react-icons/fa';
import MetaData from '../../MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { CLEAR_ERRORS } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS });
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    const features = [
        {
            icon: <FaShippingFast />,
            title: "Free Shipping",
            description: "Free shipping on orders over ₹1000. Fast and reliable delivery to your doorstep."
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure Payment",
            description: "Your payment information is secure with our encrypted payment gateway."
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            description: "Round-the-clock customer support to help you with any queries or issues."
        }
    ];

    return (
        <>
            <MetaData title="EasyShop.in - Your Ultimate Shopping Destination" />
            
            {/* Hero Banner */}
            <div className='home-banner'>
                <div className="home-banner-content">
                    <p className="text-lg mb-4">Welcome to EasyShop.in</p>
                    <h1>Discover Amazing Products at Unbeatable Prices</h1>
                    <p>Shop from thousands of products across multiple categories with fast delivery and secure payments</p>
                    
                    <div className="home-banner-cta">
                        <button 
                            className="cta-button primary"
                            onClick={() => navigate('/products')}
                        >
                            Shop Now <FaArrowRight />
                        </button>
                        <a href='#features' className="cta-button">
                            Learn More
                        </a>
                    </div>
                </div>
                
                <div className="scroll-indicator">
                    <a href='#features'>
                        <CgMouse size={20} />
                    </a>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="home-features">
                <div className="container">
                    <h2 className="home-heading">Why Choose EasyShop?</h2>
                    <p className="home-subheading">
                        We provide the best shopping experience with quality products, competitive prices, and excellent service.
                    </p>
                    
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card animate-fade-in">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="products-section">
                <div className="container">
                    <h2 className="home-heading">Featured Products</h2>
                    <p className="home-subheading">
                        Discover our handpicked selection of trending and popular products
                    </p>
                    
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <span className="loading-text">Loading amazing products...</span>
                            </div>
                        </div>
                    ) : (
                        <div className='product-container'>
                            {products && products.length > 0 ? (
                                products.slice(0, 8).map((product) => (
                                    <ProductCard key={product?._id} product={product} />
                                ))
                            ) : (
                                <div className="text-center col-span-full">
                                    <p className="text-gray-600">No products available at the moment.</p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {products && products.length > 8 && (
                        <div className="text-center mt-8">
                            <button 
                                className="btn btn-primary btn-lg"
                                onClick={() => navigate('/products')}
                            >
                                View All Products <FaArrowRight />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;