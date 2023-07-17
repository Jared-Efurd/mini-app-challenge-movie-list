import { useState, useEffect } from 'react';
import './App.css';
import Styled from 'styled-components';

const ClickableTD = Styled.td`
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ newMovieTitle, setNewMovieTitle ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ isFilteredByHasWatchedMovies, setIsFilteredByHasWatchedMovies ] = useState(false);
  const [ isFilteredByGoingToWatchMovies, setIsFilteredByGoingToWatchMovies ] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/movies')
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Could not fetch movies");
      }
    })
    .then(data => {
      setMovies(data);
    })
    .catch(err => console.log(err));
  }, [])

  const handleSearch = () => {
    if (searchTerm.length > 0) {
      const newSearchResults = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(newSearchResults);
    } else {
      setSearchResults([]);
    }
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  }

  const displayMovies = () => {
    let displayedMovies = (searchResults.length > 0) ? searchResults : movies;

    if (isFilteredByHasWatchedMovies) {
      displayedMovies = displayedMovies.filter((movie) => movie.hasWatched);
    }

    if (isFilteredByGoingToWatchMovies) {
      displayedMovies = displayedMovies.filter((movie) => movie.isGoingToWatch);
    }

    return displayedMovies.map((movie, indexOfMovie) => {
      return (
        <tr key={movie.title}>
          <ClickableTD>
            {movie.title}
          </ClickableTD>
          <ClickableTD onClick={() => {toggleHasWatched(movie, indexOfMovie)}}>
            {movie.hasWatched ? 'true' : 'false'}
          </ClickableTD>
          <ClickableTD onClick={() => {toggleIsGoingToWatch(movie, indexOfMovie)}}>
            {movie.isGoingToWatch ? 'true' : 'false'}
          </ClickableTD>
        </tr>
      )
    });
  }

  const toggleHasWatched = (movie, indexOfMovie) => {
    const updatedMovie = {
      id: movie.id,
      title: movie.title,
      hasWatched: !movie.hasWatched,
      isGoingToWatch: movie.isGoingToWatch
    }
    const updatedMovies = [...movies];
    updatedMovies.splice(indexOfMovie, 1, updatedMovie);
    setMovies(updatedMovies);
  }

  const toggleIsGoingToWatch = (movie, indexOfMovie) => {
    const updatedMovie = {
      id: movie.id,
      title: movie.title,
      hasWatched: movie.hasWatched,
      isGoingToWatch: !movie.isGoingToWatch
    }
    const updatedMovies = [...movies];
    updatedMovies.splice(indexOfMovie, 1, updatedMovie);
    setMovies(updatedMovies);
  }

  const handleNewMovieInput = (event) => {
    setNewMovieTitle(event.target.value);
  }

  const handleAddNewMovie = () => {
    if (newMovieTitle.length > 0) {
      fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            title: newMovieTitle
          }
        ),
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`Could not post movie, '${newMovieTitle}'`);
        }
      })
      .then(data => {
        setMovies(data);
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <>
      <input 
        type='text' 
        placeholder='Search by movie title...' 
        onChange={handleSearchInput}
      />
      <button onClick={handleSearch}>
        Search
      </button>
      <button onClick={() => {setIsFilteredByHasWatchedMovies(!isFilteredByHasWatchedMovies)}}>
        Watched Movies
      </button>
      <button onClick={() => {setIsFilteredByGoingToWatchMovies(!isFilteredByGoingToWatchMovies)}}>
        Going to Watched Movies
      </button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>hasWatched</th>
            <th>isGoingToWatch</th>
          </tr>
        </thead>
        <tbody>
          {displayMovies()}
        </tbody>
      </table>
      <input
        type='text'
        placeholder='Add new movie title'
        onChange={handleNewMovieInput}
      />
      <button onClick={handleAddNewMovie}>
        Add New Movie
      </button>
    </>
    
  );
}

export default App;
