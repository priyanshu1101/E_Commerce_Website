import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productAction';
import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Products.css'

const Products = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { products, error, loading, productsCount, resultPerPage } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const keyword = params.keyword;
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            return () => { };
        }
        dispatch(getProducts(keyword, currentPage));
    }, [dispatch, error, keyword, currentPage]);

    return (
        <>
            <ToastContainer />
            {(loading === undefined || loading) ? (
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
                    <br />
                    <br />
                    {
                        (resultPerPage < productsCount) &&
                        <div>
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
                    }
                </>
            )}
        </>
    );
};

export default Products;
