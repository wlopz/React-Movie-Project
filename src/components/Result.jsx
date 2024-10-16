import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// The Result component accepts `searchResults` and `query` as props
const Result = ({ searchResults, query }) => {
  const navigate = useNavigate(); // Hook from react-router-dom to navigate programmatically

  // State to hold the filtered and sorted list of movies
  const [movieFilter, setMovieFilter] = useState([]);

  // useEffect hook that runs whenever `searchResults` changes.
  // It updates `movieFilter` to reflect the new `searchResults`.
  useEffect(() => {
    setMovieFilter(searchResults); // Set movieFilter to the updated searchResults

    // Log the updated searchResults whenever they change
    // console.log("Updated searchResults:", searchResults);

    // Log the movieFilter state after updating
    // console.log("Updated movieFilter state:", movieFilter);
  }, [searchResults]); // Dependency array ensures this runs only when searchResults prop changes

  // Function to handle click on a movie and navigate to its detail page
  const handleClick = (id) => {
    // Log the movie ID that was clicked
    // console.log("Navigating to movie details for ID:", id);

    // Navigate to the movie's detail page using its IMDb ID, 
    // while passing the search query (`q`) as a URL parameter.
    navigate(`/movie/${id}?q=${query}`);
  };

  // Function to sort the movies by year, either ascending or descending
  const filterMovies = (sortBy) => {
    // Create a copy of the movieFilter array to avoid mutating state directly
    let sortedMovies = [...movieFilter];

    // Log the selected sort option
    // console.log("Sorting movies by:", sortBy);

    // Apply sorting based on the option selected from the dropdown menu
    if (sortBy === 'LOW_TO_HIGH') {
      // Sort by year in ascending order (earliest to latest)
      sortedMovies = sortedMovies.sort((a, b) => a.Year - b.Year);

      // Log the sorted movies (ascending order)
      // console.log("Movies sorted by Year, Earliest to Latest:", sortedMovies);
    } else if (sortBy === 'HIGH_TO_LOW') {
      // Sort by year in descending order (latest to earliest)
      sortedMovies = sortedMovies.sort((a, b) => b.Year - a.Year);

      // Log the sorted movies (descending order)
      // console.log("Movies sorted by Year, Latest to Earliest:", sortedMovies);
    }

    // Update the state with the sorted movie list
    setMovieFilter(sortedMovies);

    // Log the updated movieFilter state after sorting
    // console.log("Updated movieFilter after sorting:", sortedMovies);
  };

  return (
    <div className="results__container">
      <div className="results__header">
        {/* Dropdown for sorting movies */}
        <div className="results__header--wrapper">
          {/* Sort Icon */}
          <FontAwesomeIcon icon="fa-solid fa-sort" className='results__header--icon' />
          
          {/* Dropdown to select sorting option (Earliest to Latest or Latest to Earliest) */}
          <select className='results__header--select' 
            id="filter" 
            defaultValue="DEFAULT" 
            // Call the filterMovies function whenever the dropdown selection changes
            onChange={(event) => filterMovies(event.target.value)}
          >
            {/* Disabled default option that prompts the user to select a sort type */}
            <option value="DEFAULT" disabled>Sort</option>
            {/* Sorting options */}
            <option value="LOW_TO_HIGH">Year, Earliest to Latest</option>
            <option value="HIGH_TO_LOW">Year, Latest to Earliest</option>
          </select>
        </div>

        {/* Display the current search query if available */}
        {query && <h2 className='results__header--title'>Results for "{query}":</h2>}
      </div>

      <ul className='results__lists'>
        {/* If movieFilter contains movies, display them; otherwise, show "No results found" */}
        {movieFilter.length > 0 ? (
          movieFilter.map((result, index) => (
            // Display each movie as a list item
            <li className='results__list' key={index} onClick={() => handleClick(result.imdbID)}>
              {/* Movie Poster */}
              <div className="results__img--wrapper">
                <img className='results__img' src={result.Poster} alt={result.Title} />
              </div>
              {/* Movie Title */}
              <h3 className='results__title'>{result.Title}</h3>
              {/* Movie Year */}
              <p className='results__year'>Year: {result.Year}</p>
              {/* IMDb link to the movie */}
              <a className='results__imdb--link' target='_blank' rel="noreferrer" href={`https://www.imdb.com/title/${result.imdbID}/`}>IMDB</a>
            </li>
          ))
        ) : (
          // If there are no movies in movieFilter, display this message
          query && <p>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default Result;
