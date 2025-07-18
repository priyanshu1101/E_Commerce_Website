import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/productAction';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Home/ProductCard/ProductCard';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import { useAlert } from 'react-alert'
import MetaData from '../../../MetaData';
import { CLEAR_ERRORS } from '../../../constants/productConstants';
import { FaFilter, FaDollarSign, FaList, FaStar, FaSearch } from 'react-icons/fa';
import './Products.css';

const Products = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { products, error, loading, productsCount, resultPerPage } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 1000000]);
    const [rating, setRating] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Smartphone",
        "Others"
    ];
    
    const keyword = params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
        window.scrollTo(0, 0);
    };

    const handlePriceRangeChange = (event, newPrice) => {
        setPrice(newPrice);
        setCurrentPage(1);
    };

    const changeCategoryHandler = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory("");
        } else {
            setSelectedCategory(category);
        }
        setCurrentPage(1);
    }

    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
        setCurrentPage(1);
    }

    const clearFilters = () => {
        setPrice([0, 1000000]);
        setRating(0);
        setSelectedCategory("");
        setCurrentPage(1);
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: CLEAR_ERRORS })
        } else {
            dispatch(getProducts(keyword, currentPage, price, selectedCategory, rating));
        }
    }, [dispatch, error, keyword, currentPage, price, selectedCategory, rating, alert]);

    return (
        <>
            <MetaData title="Products - EasyShop.in" />
            
            <div className="products-page">
                {/* Header Section */}
                <div className="products-header">
                    <div className="products-header-content">
                        <h1 className="products-title">
                            {keyword ? `Search Results for "${keyword}"` : 'All Products'}
                        </h1>
                        <p className="products-subtitle">
                            Discover amazing products at unbeatable prices
                        </p>
                    </div>
                </div>

                <div className="products-container">
                    {/* Sidebar Filters */}
                    <aside className="products-sidebar">
                        <div className="filter-section">
                            <h3 className="filter-title">
                                <FaFilter />
                                Filters
                            </h3>
                            <button className="clear-filters-btn" onClick={clearFilters}>
                                Clear All Filters
                            </button>
                        </div>

                        {/* Price Range Filter */}
                        <div className="filter-section">
                            <h4 className="filter-title">
                                <FaDollarSign />
                                Price Range
                            </h4>
                            <div className="price-range-container">
                                <div className="price-range-values">
                                    <span>{formatPrice(price[0])}</span>
                                    <span>{formatPrice(price[1])}</span>
                                </div>
                                <div className="price-range-slider">
                                    <Slider
                                        min={0}
                                        max={1000000}
                                        value={price}
                                        onChange={handlePriceRangeChange}
                                        valueLabelDisplay="auto"
                                        step={10000}
                                        valueLabelFormat={(value) => formatPrice(value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="filter-section">
                            <h4 className="filter-title">
                                <FaList />
                                Categories
                            </h4>
                            <ul className="category-list">
                                {categories.map((category) => (
                                    <li key={category} className="category-item">
                                        <button
                                            className={`category-button ${category === selectedCategory ? 'active' : ''}`}
                                            onClick={() => changeCategoryHandler(category)}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Rating Filter */}
                        <div className="filter-section">
                            <h4 className="filter-title">
                                <FaStar />
                                Rating & Above
                            </h4>
                            <div className="rating-container">
                                <div className="rating-value">
                                    <FaStar color="#fbbf24" />
                                    <span>{rating} Stars & Above</span>
                                </div>
                                <div className="rating-slider">
                                    <Slider
                                        min={0}
                                        max={5}
                                        value={rating}
                                        onChange={handleRatingChange}
                                        valueLabelDisplay="auto"
                                        step={0.5}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Products Area */}
                    <main className="products-main">
                        {loading ? (
                            <div className="products-loading">
                                <div className="loading-spinner"></div>
                                <span className="loading-text">Loading products...</span>
                            </div>
                        ) : (
                            <>
                                <div className="products-results-header">
                                    <div className="results-count">
                                        {productsCount > 0 ? (
                                            `Showing ${products?.length || 0} of ${productsCount} products`
                                        ) : (
                                            'No products found'
                                        )}
                                    </div>
                                    <select className="sort-dropdown">
                                        <option value="relevance">Sort by Relevance</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Customer Rating</option>
                                        <option value="newest">Newest First</option>
                                    </select>
                                </div>

                                {products && products.length > 0 ? (
                                    <>
                                        <div className="products-grid">
                                            {products.map((product) => (
                                                <ProductCard key={product?._id} product={product} />
                                            ))}
                                        </div>

                                        {resultPerPage < productsCount && (
                                            <div className="pagination-container">
                                                <Pagination
                                                    activePage={currentPage}
                                                    itemsCountPerPage={resultPerPage}
                                                    totalItemsCount={productsCount}
                                                    onChange={setCurrentPageNo}
                                                    nextPageText="Next"
                                                    prevPageText="Prev"
                                                    firstPageText="First"
                                                    lastPageText="Last"
                                                    itemClass="page-item"
                                                    linkClass="page-link"
                                                    activeClass="pageItemActive"
                                                    activeLinkClass="pageLinkActive"
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="no-products">
                                        <FaSearch size={48} color="var(--gray-400)" />
                                        <h3>No products found</h3>
                                        <p>
                                            {keyword 
                                                ? `No products match your search for "${keyword}"`
                                                : 'No products match your current filters'
                                            }
                                        </p>
                                        <button className="clear-filters-btn" onClick={clearFilters}>
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Products;