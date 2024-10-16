import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import SearchBar from '../components/ui/SearchBar';
import Result from '../components/Result';
import axios from 'axios';
import { gsap } from 'gsap';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const Query = () => {
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [query, setQuery] = useState(''); // State to hold the current search query
  const [loading, setLoading] = useState(true); // Loading state for skeleton
  const [searchParams] = useSearchParams(); // Get query parameter from URL
  const searchBarRef = useRef(null); // Ref for SearchBar animation
  const navigate = useNavigate(); // Hook for programmatic navigation

  // useEffect hook runs when the component loads or when searchParams change
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam); // Update the query state with the URL param
      handleSearch(queryParam); // Perform the search with the query
    }

    // Slide in SearchBar when component loads
    gsap.fromTo(
      searchBarRef.current, 
      { y: '-100%', opacity: 0 }, 
      { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, [searchParams]);

  // Function to perform the search using the OMDB API
  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true); // Set loading state to true when searching
      const { data } = await axios.get(`https://www.omdbapi.com/?apikey=2ad0ce3b&s=${searchQuery}`);
      setSearchResults(data.Search || []); // Update the searchResults state with API response
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]); // Clear results if an error occurs
    } finally {
      setLoading(false); // Set loading state to false after data is fetched
    }
  };

  const handleNewSearch = (newQuery) => {
    navigate(`/search?q=${newQuery}`); // Ensure we update the URL with the new query
  };

  return (
    <>
      <header id="landing">
        <div ref={searchBarRef}>
          <SearchBar onSearch={handleNewSearch} /> 
        </div>
      </header>
      <section>
        {loading ? (
          // Display the loading skeleton when movies are loading
          <div className="skeleton__container">
            <SkeletonLoader />
          </div>
        ) : (
          // Display the search results when loaded
          <Result searchResults={searchResults} query={query} />
        )}
      </section>
    </>
  );
};

export default Query;
