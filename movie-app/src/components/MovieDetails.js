import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const API_KEY = 'i=tt3896198&apikey=2c4fb94c'; // Your actual API key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`http://www.omdbapi.com/?i=${id}&=${API_KEY}`);
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="container mt-5">
      {movie.Title ? (
        <div className="row">
          <div className="col-md-4">
            <img src={movie.Poster} className="img-fluid" alt={movie.Title} />
          </div>
          <div className="col-md-8">
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
