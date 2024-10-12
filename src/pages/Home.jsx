import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';

const Home = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Function to handle search queries from the SearchBar and navigate to the Query page
  const handleSearch = (query) => {
    if (query) {
      // Redirect to the Query page (/search) with the query as a URL parameter
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <section id='landing'>
      {/* Pass the handleSearch function to the SearchBar component */}
      <SearchBar onSearch={handleSearch} />
    </section>
  );
};

export default Home;
