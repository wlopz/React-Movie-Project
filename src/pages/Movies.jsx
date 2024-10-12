import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; 
import SearchBar from '../components/ui/SearchBar';
import Result from '../components/Result';
import axios from 'axios';

// The Query component handles the display of search results
const Query = () => {
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [query, setQuery] = useState(''); // State to hold the current search query
  const [searchParams] = useSearchParams(); // Get query parameter from URL

  // useEffect hook runs when the component loads or when searchParams change
  useEffect(() => {
    // Extract the search query ('q') from the URL parameters
    const queryParam = searchParams.get('q');
    if (queryParam) {
      // Log query from URL
      // console.log("Query param from URL:", queryParam); 
      setQuery(queryParam); // Update the query state with the URL param
      handleSearch(queryParam); // Perform the search with the query
    }
  }, [searchParams]); // Dependency array ensures it runs when the URL changes

  // Function to perform the search using the OMDB API
  const handleSearch = async (searchQuery) => {
    // Log the search query
    // console.log("Performing search with query:", searchQuery); 
    try {
      // Make an API call to OMDB with the search query
      const { data } = await axios.get(`https://www.omdbapi.com/?apikey=2ad0ce3b&s=${searchQuery}`);
      // Log search results
      // console.log("Search results:", data.Search); 
      setSearchResults(data.Search || []); // Update the searchResults state with API response
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]); // Clear results if an error occurs
    }
  };

  return (
    <>
      {/* SearchBar is passed handleSearch to allow new searches from the Query page */}
      <SearchBar onSearch={handleSearch} />

      {/* Display the search results */}
      <Result searchResults={searchResults} query={query} />
    </>
  );
};

export default Query;
