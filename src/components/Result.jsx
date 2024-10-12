// Result.jsx
import React from 'react';

const Result = ({ searchResults, query }) => {
  return (
    <div className="results-container">
      {query && <h2>Results for "{query}":</h2>}
      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <li key={index}>
              <h3>{result.Title}</h3>
              <p>Year: {result.Year}</p>
              <img src={result.Poster} alt={result.Title} style={{ width: '100px' }} />
            </li>
          ))
        ) : (
          query && <p>No results found</p> // Show message if no results
        )}
      </ul>
    </div>
  );
};

export default Result;
