// src/pages/SearchResults.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../Components/Cards';
import Navbar from '../Components/Navbar';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  return (
    <div>
      <Navbar />
      <Cards searchQuery={searchQuery} />
    </div>
  );
};

export default SearchResults;
