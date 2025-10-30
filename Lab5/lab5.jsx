import React, { useState } from "react";
import ReactDOM from "react-dom";
import "lab5.css";

function InputArea({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  function handleAdd() {
    onAddMovie({ title, review, rating });
    setTitle("");
    setReview("");
    setRating("");
  }

  return (
    <div className="inputArea">
      <input
        placeholder="Movie name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value={1}>⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={5}>⭐⭐⭐⭐⭐</option>
      </select>
      <button onClick={handleAdd}>Add Movie</button>
    </div>
  );
}

function MovieItem({ movie, onRemove }) {
  return (
    <div className="movieItem">
      <h3>{movie.title}</h3>
      <p>{movie.review}</p>
      <p>Rating: {"⭐".repeat(movie.rating)}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

function MovieList({ movies, removeMovie }) {
  return (
    <div>
      {movies.map((movie, index) => (
        <MovieItem
          key={index}
          movie={movie}
          onRemove={() => removeMovie(index)}
        />
      ))}
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([
    { title: "Iron Man", review: "Amazing", rating: 5 },
    { title: "Avatar", review: "Beautiful visuals", rating: 3 },
    { title: "End Game", review: "Good", rating: 5 },
  ]);

  function addMovie(movieObj) {
    setMovies([...movies, movieObj]);
  }

  function removeMovie(index) {
    setMovies(movies.filter((_, i) => i !== index));
  }

  return (
    <>
      <h1> Movie Watch List</h1>
      <InputArea onAddMovie={addMovie} />
      <MovieList movies={movies} removeMovie={removeMovie} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
