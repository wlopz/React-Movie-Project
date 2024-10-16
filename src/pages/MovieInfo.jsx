import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MovieInfo = () => {
  // Get the `id` from the URL parameters using React Router's `useParams` hook.
  const { id } = useParams(); 
  
  // Get the current URL location, including the search query from the URL, using `useLocation`.
  const location = useLocation();
  
  // Create state variables to hold the movie details, loading status, and error state.
  const [movie, setMovie] = useState(null); // `movie` holds the fetched movie details
  const [loading, setLoading] = useState(true); // `loading` indicates if data is still being fetched
  const [error, setError] = useState(null); // `error` holds any error messages if the API request fails

  // Extract the search query from the URL's search parameters (e.g., `?q=searchTerm`) to pass it back to the search page.
  const searchQuery = new URLSearchParams(location.search).get('q');

  // `useEffect` runs when the component mounts, and fetches movie details based on the `id`.
  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Log the ID of the movie being fetched
      // console.log(`Fetching movie details for ID: ${id}`);
      
      // API call to fetch movie details using the movie `id` from OMDB API.
      try {
        const { data } = await axios.get(`https://www.omdbapi.com/?apikey=2ad0ce3b&i=${id}`);
        
        // Log the fetched movie data for debugging
        // console.log('Movie details fetched:', data);

        setMovie(data); // Set the fetched movie data into state.
        setLoading(false); // Stop the loading indicator after data is fetched.
      } catch (error) {
        console.error('Error fetching movie details:', error); // Log any error
        setError('Failed to load movie details.'); // Set the error message to display
        setLoading(false); // Stop loading on error
      }
    };

    fetchMovieDetails(); // Fetch movie details when the component mounts
  }, [id]); // `useEffect` will re-run if the `id` changes

  // Log when the component renders
  // console.log('MovieInfo component rendered');

  // If the component is still loading data, display a loading message.
  if (loading) {
    // console.log('Loading movie details...'); // Log loading state
    return (
      <div className="skeleton--info__container">
        <div className="skeleton--info__title"></div>
        <div className="skeleton--info__wrapper">
          <div className="skeleton--info__left-column">
            <div className="skeleton--info__img"></div>
          </div>
          <div className="skeleton--info__right-column">
            <div className="skeleton--info__year"></div>
            <div className="skeleton--info__year"></div>
            <div className="skeleton--info__year"></div>
            <div className="skeleton--info__year"></div>
            <div className="skeleton--info__year"></div>
          </div>
        </div>
      </div>
    )
  }

  // If there was an error during the API request, display the error message.
  if (error) {
    // console.log('Error occurred:', error); // Log the error message
    return <p>{error}</p>;
  }

  // Function to render the movie's Metascore with color coding based on the score.
  const metascoreRating = () => {
    // console.log('Rendering Metascore:', movie.Metascore); // Log Metascore rendering
    if (movie.Metascore >= 80) {
      return (<p><strong>Metascore:</strong><span className='rating__green'> {movie.Metascore}</span></p>);
    } else if (movie.Metascore >= 40 && movie.Metascore < 80) {
      return (<p><strong>Metascore:</strong><span className='rating__yellow'> {movie.Metascore}</span></p>);
    } else {
      return (<p><strong>Metascore:</strong><span className='rating__red'> {movie.Metascore}</span></p>);
    }
  };

  // Function to render the IMDb rating with color coding based on the rating.
  const imdbRating = () => {
    // console.log('Rendering IMDb Rating:', movie.imdbRating); // Log IMDb rating rendering
    if (movie.imdbRating >= 8.0) {
      return (<p><strong>IMDB Rating:</strong><span className='rating__green'> {movie.imdbRating}</span></p>);
    } else if (movie.imdbRating >= 4.0 && movie.imdbRating < 8.0) {
      return (<p><strong>IMDB Rating:</strong><span className='rating__yellow'> {movie.imdbRating}</span></p>);
    } else {
      return (<p><strong>IMDB Rating:</strong><span className='rating__red'> {movie.imdbRating}</span></p>);
    }
  };

  return (
    // Main container for movie information display
    <div className="movie--info__container">
      
      {/* Link to go back to the search page, using the `searchQuery` from the URL parameters */}
      <Link to={`/search?q=${searchQuery}`} className='movie--info__link'>
        <button className='movie--info__back'>
          <FontAwesomeIcon className='movie--info__back--left' icon="fa-solid fa-chevron-left" /> Back
        </button>
      </Link>

      {/* Display the movie title */}
      <h1 className='movie--info__title'>{movie.Title}</h1>

      <div className="movie--info__wrapper">
        {movie ? (
          <>
            {/* Display movie details fetched from the OMDB API */}
            <div className="movie--info__left-column">
              <img src={movie.Poster} alt={movie.Title} className='movie--info__img' />
            </div>
            <div className="movie--info__right-column">
              <p className='movie--info__par'><strong>Year:</strong> {movie.Year}</p>
              <p className='movie--info__par'><strong>Genre:</strong> {movie.Genre}</p>
              <p className='movie--info__par'><strong>Plot:</strong> {movie.Plot}</p>
              <p className='movie--info__par'><strong>Director:</strong> {movie.Director}</p>
              <p className='movie--info__par'><strong>Actors:</strong> {movie.Actors}</p>
              <div className="movie--info__ratings">
                {/* Render the Metascore and IMDb ratings with conditional color coding */}
                {metascoreRating()}
                {imdbRating()}
              </div>
            </div>
          </>
        ) : (
          <p>No movie details available.</p> // Display if no movie data is available
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
