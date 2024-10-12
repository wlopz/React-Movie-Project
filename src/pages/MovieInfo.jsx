import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Hook to get URL parameters
import axios from 'axios';

const MovieInfo = (searchQuery) => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

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

  // Log when MovieInfo renders with details
  // console.log("MovieInfo component rendered with movie details:", movie); 

  return (
    <div className="movie--info__container">
      <Link to={`/search?q=${searchQuery}`}>
        <button>← Back</button> {/* Button to navigate back to home */}
      </Link>
      {movie ? (
        <>
          <h1>{movie.Title}</h1>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
        </>
      ) : (
        <p>No movie details available.</p>
      )}
    </div>
  );
};

export default MovieInfo;
