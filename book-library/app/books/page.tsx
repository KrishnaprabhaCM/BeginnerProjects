"use client";

import { useState, useEffect } from "react";
import BookForm from "../../components/BookForm";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  genre: string;
  summary: string;
  coverImage: string;
  availableCopies: number;
  totalCopies: number;
  shelfLocation: string;
  publisher: string;
  language: string;
  pages: number;
  format: string;
  edition: string;
  series: string;
  volume: string;
  isAvailable: boolean;
};

export default function BooksPage() {

  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
  const savedBooks = localStorage.getItem("books");


  if (savedBooks) {
    setBooks(JSON.parse(savedBooks));
  }
  setLoaded(true);
}, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    localStorage.setItem("books", JSON.stringify(books));
  }, [books,loaded]);

  function handleAddBook(newBook: Book) {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  }

  function handleDeleteBook(bookId: number) {
    const confirmed = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmed) {
    return;
  }

  setBooks((prevBooks) =>
    prevBooks.filter((book) => book.id !== bookId)
  );
  }

  function handleUpdateBook(updatedBook: Book) {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
    setEditingBook(null);
  } 

  const filteredBooks = books.filter((book) => {

  const search = searchTerm.toLowerCase();

  return (
    book.title.toLowerCase().includes(search) ||
    book.author.toLowerCase().includes(search) ||
    book.genre.toLowerCase().includes(search) ||
    book.publisher.toLowerCase().includes(search) ||
    book.isbn.toLowerCase().includes(search)
  );

}); 

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Library</h1>

      <BookForm onAddBook={handleAddBook} onUpdateBook={handleUpdateBook} editingBook={editingBook} />

      <hr />

      <h2>Search Books</h2>

    <input
      type="text"
      placeholder="Search by title, author, genre, publisher or ISBN..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
      }}
    />

      <h2>All Books</h2>

      {filteredBooks.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{book.title}</h3>

            <p>
              <strong>Author:</strong> {book.author}
            </p>

            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>

            <p>
              <strong>Publication Date:</strong> {book.publicationDate}
            </p>

            <p>
              <strong>Genre:</strong> {book.genre}
            </p>

            <p>
              <strong>Summary:</strong> {book.summary}
            </p>

            <p>
              <strong>Available Copies:</strong> {book.availableCopies}
            </p>

            <p>
              <strong>Total Copies:</strong> {book.totalCopies}
            </p>

            <p>
              <strong>Shelf Location:</strong> {book.shelfLocation}
            </p>

            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>

            <p>
              <strong>Language:</strong> {book.language}
            </p>

            <p>
              <strong>Pages:</strong> {book.pages}
            </p>

            <p>
              <strong>Format:</strong> {book.format}
            </p>

            <p>
              <strong>Edition:</strong> {book.edition}
            </p>

            <p>
              <strong>Series:</strong> {book.series}
            </p>

            <p>
              <strong>Volume:</strong> {book.volume}
            </p>

            <p>
              <strong>Available:</strong>{" "}
              {book.isAvailable ? "Yes" : "No"}
            </p>
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}