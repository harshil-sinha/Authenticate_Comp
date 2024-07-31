import React from 'react';
import { Link } from 'react-router-dom';
import "../css/MovieCard.css";

function MovieCard({ movie, onAddToWatchlist }) {
  return (
    <div className="card movie-card mb-4">
      <img src={movie.Poster} className="card-img-top movie-poster" alt={movie.Title} />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">{movie.Year}</p>
        <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary btn-block">View Details</Link>
        <button
          className="btn btn-secondary btn-block mt-2"
          onClick={() => onAddToWatchlist(movie)}
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
