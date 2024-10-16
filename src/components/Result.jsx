import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Result = ({ searchResults, query }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically between routes

  // State to hold the filtered list of movies
  const [movieFilter, setMovieFilter] = useState([]);

  // useEffect to initialize movieFilter when searchResults change
  useEffect(() => {
    setMovieFilter(searchResults); // Set movieFilter to searchResults when searchResults are updated
  }, [searchResults]); // Runs whenever searchResults prop changes

  // Function to handle movie click and navigate to the MovieInfo page
  const handleClick = (id) => {
    // Log when a movie is clicked
    // console.log("Movie clicked with IMDb ID:", id); 
    navigate(`/movie/${id}?q=${query}`); // Navigate to the movie's info page using its IMDb ID
  };

  // Filter movies based on year
  const filterMovies = (sortBy) => {
    let sortedMovies = [...movieFilter]; // Make a copy of the movieFilter array

    if (sortBy === 'LOW_TO_HIGH') {
      // Sort the movie list in ascending order by year
      sortedMovies = sortedMovies.sort((a, b) => a.Year - b.Year);
    } else if (sortBy === 'HIGH_TO_LOW') {
      // Sort the movie list in descending order by year
      sortedMovies = sortedMovies.sort((a, b) => b.Year - a.Year);
    }

    setMovieFilter(sortedMovies); // Update the state with the sorted movies
  };

  // Log when Result component renders
  // console.log("Result component rendered with query:", query); 

  return (
    <div className="results__container">
      <div className="results__header">
        {/* Dropdown for selecting a sorting filter */}
        <div className="results__header--wrapper">
          <FontAwesomeIcon icon="fa-solid fa-sort" className='results__header--icon' />
          <select className='results__header--select' 
            id="filter" 
            defaultValue="DEFAULT" 
            // Call the filterMovies function when the dropdown selection changes
            onChange={(event) => filterMovies(event.target.value)}
          >
            {/* Default disabled option prompting user to choose a sort type */}
            <option value="DEFAULT" disabled>Sort</option>
            {/* Sorting options */}
            <option value="LOW_TO_HIGH">Year, Earliest to Latest</option>
            <option value="HIGH_TO_LOW">Year, Latest to Earliest</option>
          </select>

        </div>
        {/* Display the query if available */}
        {query && <h2>Results for "{query}":</h2>}
      </div>
      <ul className='results__lists'>
        {/* Check if there are any movies in the filter and display them */}
        {movieFilter.length > 0 ? (
          movieFilter.map((result, index) => (
            <li className='results__list' key={index} onClick={() => handleClick(result.imdbID)}>
              {/* Display the movie poster */}
              <div className="results__img--wrapper">
                <img className='results__img' src={result.Poster} alt={result.Title} />
              </div>
              <h3 className='results__title'>{result.Title}</h3> {/* Display the movie title */}
              <p className='results__year'>Year: {result.Year}</p> {/* Display the movie year */}
              {/* Link to the movie's IMDb page */}
              <a className='results__imdb--link' target='_blank'rel="noreferrer" href={`https://www.imdb.com/title/${result.imdbID}/`}>IMDB</a>
              {/* <FontAwesomeIcon icon="fa-brands fa-imdb" /> */}
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
