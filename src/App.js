import React, { useEffect, useState } from "react";
import axios from "axios";
import Infobar from "./Infobar.jsx";
import "./App.css";

function App() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://www.anapioficeandfire.com/api/books?pageSize=30"
      );
      console.log(response.data);
      setBooks(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Game of Thrones Books</h1>
      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(", ");

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages} pages</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>

      <Infobar seriesNumber="7" />
    </div>
  );
}

export default App;
