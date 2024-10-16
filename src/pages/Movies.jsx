import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; 
import SearchBar from '../components/ui/SearchBar';
import Result from '../components/Result';
import axios from 'axios';
import { gsap } from 'gsap';
import SkeletonLoader from '../components/ui/SkeletonLoader';

// The Query component handles the display of search results
const Query = () => {
  // State to hold the fetched search results from the OMDB API
  const [searchResults, setSearchResults] = useState([]);

  // State to hold the current search query
  const [query, setQuery] = useState('');

  // Loading state to track whether the API data is being fetched, used to show skeleton loader
  const [loading, setLoading] = useState(true);

  // Hook to get the query parameter from the URL (e.g., ?q=movieTitle)
  const [searchParams] = useSearchParams();

  // Ref for the SearchBar animation using GSAP
  const searchBarRef = useRef(null);

  // Hook to programmatically navigate to other routes (e.g., after a search)
  const navigate = useNavigate();

  // useEffect hook runs when the component mounts or when searchParams change (i.e., when a new search is initiated)
  useEffect(() => {
    // Get the query parameter ('q') from the URL
    const queryParam = searchParams.get('q');
    
    // Log when a new query parameter is retrieved
    // console.log("Query parameter from URL:", queryParam);

    if (queryParam) {
      setQuery(queryParam); // Update the query state with the parameter from the URL
      handleSearch(queryParam); // Perform the search using the query
    }

    // Slide-in animation for the SearchBar using GSAP
    gsap.fromTo(
      searchBarRef.current, // Target the SearchBar element
      { y: '-100%', opacity: 0 }, // Start above the viewport and invisible
      { y: '0%', opacity: 1, duration: 1, ease: 'power2.out' } // Slide into view and fade in
    );
  }, [searchParams]); // Dependency array ensures the effect runs whenever searchParams change

  // Function to perform the search by calling the OMDB API
  const handleSearch = async (searchQuery) => {
    try {
      // Log the search query before making the API call
      // console.log("Performing search with query:", searchQuery);

      // Set loading to true, which triggers the skeleton loader to show
      setLoading(true);

      // Make an API call to OMDB with the search query
      const { data } = await axios.get(`https://www.omdbapi.com/?apikey=2ad0ce3b&s=${searchQuery}`);

      // Log the response data from OMDB
      // console.log("Search results from API:", data.Search);

      // Update the searchResults state with the API response (or empty array if none found)
      setSearchResults(data.Search || []);
    } catch (error) {
      // Handle any errors during the API request
      console.error('Error fetching data:', error);
      setSearchResults([]); // Clear results if there's an error
    } finally {
      // Log that the search has completed, whether successful or not
      // console.log("Search complete. Loading status set to false.");
      
      // Set loading to false after the API call completes (whether successful or failed)
      setLoading(false);
    }
  };

  // Function to handle a new search from the SearchBar, updates the URL with the new query
  const handleNewSearch = (newQuery) => {
    // Log the new search query before navigating
    // console.log("New search initiated with query:", newQuery);

    // Programmatically navigate to a new search URL with the updated query parameter
    navigate(`/search?q=${newQuery}`);
  };

  return (
    <>
      <header id="landing">
        {/* Attach ref to the SearchBar for GSAP animation */}
        <div ref={searchBarRef}>
          <SearchBar onSearch={handleNewSearch} /> 
        </div>
      </header>
      
      <section>
        {loading ? (
          // If loading is true, display the skeleton loader
          <div className="skeleton__container">
            {/* Log that the skeleton loader is being displayed */}
            {/* console.log("Displaying skeleton loader..."); */}
            <SkeletonLoader />
          </div>
        ) : (
          // If loading is false, display the search results
          <>
            {/* Log that the search results are being displayed */}
            {/* console.log("Displaying search results:", searchResults); */}
            <Result searchResults={searchResults} query={query} />
          </>
        )}
      </section>
    </>
  );
};

export default Query;