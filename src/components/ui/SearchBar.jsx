// SearchBar.jsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({ onSearch }) => { // Expecting onSearch as a prop
  const [query, setQuery] = useState(''); // Local state for input

  const handleSearch = () => {
    // Log search when triggered
    // console.log("SearchBar handleSearch triggered with query:", query); 
    if (query) {
      // console.log(query);
      onSearch(query); // Call the onSearch prop function
    }
  };

  // Log when SearchBar renders
  // console.log("SearchBar component rendered with query:", query); 

  return (
    <div className="flix__search--container">
      <label className="flix__search--label">
        <h1 className="flix__search--title">Search for your flix</h1>
      </label>
      <div className="flix__search--border">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update local input
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
        />
        <FontAwesomeIcon icon="magnifying-glass" className="search--bar__icon" onClick={handleSearch} inverse />
      </div>
    </div>
  );
};

export default SearchBar;
