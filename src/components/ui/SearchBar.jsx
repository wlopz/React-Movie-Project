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
    <div className="search--bar__body">
      <div className="search--bar__container">
        <div className="search--bar__wrapper">
          <input
            type="text"
            className="search--bar__input"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update local input
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
          />
          <FontAwesomeIcon icon="magnifying-glass" className="search--bar__icon" onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
