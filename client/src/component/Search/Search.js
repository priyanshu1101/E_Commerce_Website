import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import MetaData from '../../MetaData';
import './Search.css';

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
    <div className="uniqueSearchContainer">
      <MetaData title="Search A Product -- EasyShop.in" />
      <form className="uniqueSearchForm" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="uniqueSearchInput"
        />
        <button type="submit" className="uniqueSearchButton">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
