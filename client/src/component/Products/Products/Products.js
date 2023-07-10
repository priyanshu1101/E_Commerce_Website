import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/productAction';
import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Home/ProductCard/ProductCard';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import { useAlert } from 'react-alert'
import MetaData from '../../../MetaData';
import { CLEAR_ERRORS } from '../../../constants/productConstants';
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
        if (category === selectedCategory)
            setSelectedCategory("");
        else
            setSelectedCategory(category);
        setCurrentPage(1);
    }
    const handleRatingChange = (event, newRating) => {
        setRating(newRating);
        setCurrentPage(1);
    }

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
            <MetaData title="PRODUCTS -- EasyShop.in" />
            <div className="products-container">
                <div className="sidebar">
                    <div className="filter">
                        <h3>Price Range</h3>
                        <div className='rangeSlider'>
                            <Slider
                                min={0}
                                max={1000000}
                                value={price}
                                onChange={handlePriceRangeChange}
                                valueLabelDisplay="auto"
                                step={10000}
                            />
                        </div>
                    </div>
                    <div className="filter">
                        <h3>Category</h3>
                        <div className='category'>
                            <ul className="categoryBox">
                                {categories.map((category) =>
                                    <li
                                        className={`category-link ${category === selectedCategory ? 'active' : ''}`}
                                        key={category}
                                        onClick={() => changeCategoryHandler(category)}
                                    >
                                        {category}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="filter">
                        <h3>Rating Equal & Above</h3>
                        <div className='rangeSlider'>
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
                <div className="main-content">
                    {loading ? (
                        <div className="loader">
                            <Audio color="#5953bc" height={150} width={150} />
                        </div>
                    ) : (
                        <>
                            <h2 className="productsHeading">Products</h2>
                            <div className="products">
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product?._id} product={product} />
                                    ))}
                            </div>
                            {resultPerPage < productsCount && (
                                <div className="pagination">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;
