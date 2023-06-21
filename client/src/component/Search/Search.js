import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { FaSearch } from "react-icons/fa";
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <div className="searchContainer">
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search for a product..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="searchInput"
                />
                <button type="submit" className="searchButton">
                    <FaSearch />
                </button>
            </form>
        </div>
    );
};

export default Search;
