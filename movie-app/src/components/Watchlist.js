import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function Watchlist({ user, onLogout }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem(user)) || [];
    setWatchlist(savedWatchlist);
  }, [user]);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem(user, JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="container mt-5">
      <h2>Your Watchlist</h2>
      <button className="btn btn-danger mb-3" onClick={onLogout}>Logout</button>
      <div className="row">
        {watchlist.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.imdbID}>
            <div className="card">
              <MovieCard movie={movie} />
              <button
                className="btn btn-danger mt-2"
                onClick={() => removeFromWatchlist(movie.imdbID)}
              >
                Remove from Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
