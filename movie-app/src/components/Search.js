import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import "../css/Search.css";

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  const API_KEY = 'i=tt3896198&apikey=2c4fb94c'; 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(storedUser);
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.get(`http://www.omdbapi.com/?i=${id}&=process.env.${API_KEY}`);
      setResults(res.data.Search || []);
      if (res.data.Error) {
        setError(res.data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    }
  };

  const handleAddToWatchlist = (movie) => {
    const savedWatchlist = JSON.parse(localStorage.getItem(user)) || [];
    if (!savedWatchlist.some(m => m.imdbID === movie.imdbID)) {
      savedWatchlist.push(movie);
      localStorage.setItem(user, JSON.stringify(savedWatchlist));
      alert('Movie added to watchlist!');
    } else {
      alert('Movie already in watchlist.');
    }
  };

  const handleSeeWatchlist = () => {
    navigate('/watchlist');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Search Movies</h2>
      {user && <p className="text-center text-muted">Logged in as: {user}</p>}
      <form onSubmit={searchMovies} className="mb-3">
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
      <button className="btn btn-secondary mb-3" onClick={handleSeeWatchlist}>
        See Watchlist
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {results.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.imdbID}>
            <MovieCard movie={movie} onAddToWatchlist={handleAddToWatchlist} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
