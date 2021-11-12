import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState } from 'react';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=86860c0fa490dd940ed87466e0ff95aa&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=86860c0fa490dd940ed87466e0ff95aa&query=";


function App() {

  const [ movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('')

  useEffect (() => {
    getMovie(FEATURED_API)

  }, [])

  const getMovie = (API) => {
    fetch(API)
    .then(res => res.json()).then(data => {
      console.log(data);
      setMovies(data.results);
    });

  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm) {
      getMovie(SEARCH_API+searchTerm);

    setsearchTerm('');
    }

  };

  const handleOnchange = (e) => {
    setsearchTerm(e.target.value);
  }

 
  return (
    <>
    <header>
      <form onSubmit={handleOnSubmit}>
      <input className="search" 
      type="text" 
      placeholder="Search..." 
      value={searchTerm}
      onChange={handleOnchange}/>
      </form>
    </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map((movie) => <Movie key={Movie.id} {...movie} />)}
      </div>
      </>
  );
}

export default App;
