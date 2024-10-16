import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * SearchBar Component
 * This component renders a search bar with an input field and a magnifying glass icon. 
 * It accepts a function `onSearch` as a prop, which is called when the user submits a search query.
 */
const SearchBar = ({ onSearch }) => { 
  // `onSearch` is expected as a prop from the parent component.
  // It will be called with the search query when the search is triggered.

  // `query` is the local state that holds the value of the search input.
  const [query, setQuery] = useState(''); // useState hook initializes `query` with an empty string.

  // Function to handle search when the user clicks the search icon or presses Enter.
  const handleSearch = () => {
    // console.log('Search triggered with query:', query); // Log when search is triggered
    if (query) {
      // console.log('Calling onSearch with query:', query); // Log when `onSearch` is called
      onSearch(query); // Call the `onSearch` function (passed from parent) with the current `query`.
    }
  };

  // The return statement defines the JSX structure (UI) of the SearchBar component.
  return (
    <div className="flix__search--container"> {/* Container for the search bar */}
      
      {/* Label for the search bar */}
      <label className="flix__search--label">
        <h1 className="flix__search--title">Search for your flix</h1> {/* Title for the search bar */}
      </label>

      {/* Container for the search input field and the search icon */}
      <div className="flix__search--border">
        
        {/* Input field where users type their search query */}
        <input
          type="text"
          className="search__input" // Styling class for the input
          placeholder="Search" // Placeholder text inside the input
          value={query} // Bind the input value to the `query` state

          // Log every change in the input field (what the user is typing)
          onChange={(e) => {
            // console.log('Input changed to:', e.target.value); // Log the current input value
            setQuery(e.target.value); // Update the `query` state when the user types in the input field.
          }}
          
          // Trigger the `handleSearch` function when the user presses the Enter key.
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // console.log('Enter key pressed. Triggering search.'); // Log when Enter key is pressed
              handleSearch(); // Call the search handler when Enter is pressed
            }
          }}
        />

        {/* Magnifying glass icon that triggers the search when clicked */}
        <FontAwesomeIcon 
          icon="magnifying-glass" // FontAwesome icon class for the magnifying glass
          className="search--bar__icon" // Styling class for the icon
          
          // Log when the magnifying glass is clicked
          onClick={() => {
            // console.log('Magnifying glass clicked. Triggering search.'); // Log the click event
            handleSearch(); // Trigger the search when the icon is clicked
          }} 
          
          inverse // Apply inverse color styling for the icon
        />
      </div>
    </div>
  );
};

export default SearchBar; // Export the SearchBar component so it can be used in other parts of the app.