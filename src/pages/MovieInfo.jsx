import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom'; // Hook to get URL parameters
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MovieInfo = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const location = useLocation(); // Get the current URL location, including the search query
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Extract the search query from the location search params to have it ready to go back to the Query page
  const searchQuery = new URLSearchParams(location.search).get('q');

  // Fetch movie details when the component loads
  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Log the ID of the movie being fetched
      // console.log("Fetching movie details for ID:", id); 
      try {
        const { data } = await axios.get(`https://www.omdbapi.com/?apikey=2ad0ce3b&i=${id}`);
        // Log the movie details
        // console.log("Movie details fetched:", data); 
        setMovie(data); // Set movie details in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); // Only refetch when the `id` changes

  if (loading) return <p>Loading movie details...</p>; // Display a loading message
  if (error) return <p>{error}</p>; // Display an error message if fetch failed

  const metascoreRating = () => {
    if (movie.Metascore >= 80) {
      return (<p><strong>Metascore:</strong><span className='rating__green'> {movie.Metascore}</span></p>)
    } else if (movie.Metascore >= 40 && movie.Metascore < 80) {
      return (<p><strong>Metascore:</strong><span className='rating__yellow'> {movie.Metascore}</span></p>)
    } else {
      return (<p><strong>Metascore:</strong><span className='rating__red'> {movie.Metascore}</span></p>)
    }
  }

  const imdbRating = () => {
    if (movie.imdbRating >= 8.0) {
      return (<p><strong>IMDB Rating:</strong><span className='rating__green'> {movie.imdbRating}</span></p>)
    } else if (movie.imdbRating >= 4.0 && movie.imdbRating < 8.0) {
      return (<p><strong>IMDB Rating:</strong><span className='rating__yellow'> {movie.imdbRating}</span></p>)
    } else {
      return (<p><strong>IMDB Rating:</strong><span className='rating__red'> {movie.imdbRating}</span></p>)
    }
  }

  // Log when MovieInfo renders with details
  // console.log("MovieInfo component rendered with movie details:", movie); 

  return (
    // Go back to search page with the current search query
    <div className="movie--info__container">
      <Link to={`/search?q=${searchQuery}`} className='movie--info__link'>
        <button className='movie--info__back'><FontAwesomeIcon className='movie--info__back--left' icon="fa-solid fa-chevron-left" /> Back</button> {/* Button to navigate back to search page */}
      </Link>
      <div className="movie--info__wrapper">
        {movie ? (
          <>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} className='movie--info__img' />
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            {metascoreRating()}
            {imdbRating()}
          </>
        ) : (
          <p>No movie details available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
