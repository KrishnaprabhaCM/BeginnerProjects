"use client";

import { useState, useEffect } from "react";
import BookForm from "../../components/BookForm";
import Link from "next/link";

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
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const FALLBACK_IMAGE =
  "https://media.gettyimages.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=2048x2048&w=gi&k=20&c=GbhNBESyguF5V-12JRLDwmJuUUO6BRhhBeZgDAIFELA=";
  

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

  function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

  const genres = [
  "All",
  ...new Set(
    books.map((book) => book.genre)
  ),
];

  const filteredBooks = books.filter((book) => {

  const search = searchTerm.toLowerCase();

  const matchesSearch = book.title.toLowerCase().includes(search) ||
    book.author.toLowerCase().includes(search) ||
    book.genre.toLowerCase().includes(search) ||
    book.publisher.toLowerCase().includes(search) ||
    book.isbn.toLowerCase().includes(search);

    const matchesAvailability = !showAvailableOnly || book.isAvailable;
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesAvailability && matchesGenre;

}); 

const totalBooks = books.length;

const availableBooks = books.filter(
  (book) => book.isAvailable
).length;

const borrowedBooks = totalBooks - availableBooks;

const totalGenres = new Set(
  books.map((book) => book.genre)
).size;

const genreStats = books.reduce(
  (acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
const shelfStats = books.reduce(
  (acc, book) => {
    acc[book.shelfLocation] =
      (acc[book.shelfLocation] || 0) + 1;

    return acc;
  },
  {} as Record<string, number>
);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Library</h1>
      <h2>Dashboard</h2>

<div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      border: "1px solid #ccc",
      padding: "20px",
      width: "200px",
      borderRadius: "8px",
    }}
  >
    <h3>Total Books</h3>
    <p>{totalBooks}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      padding: "20px",
      width: "200px",
      borderRadius: "8px",
    }}
  >
    <h3>Available Books</h3>
    <p>{availableBooks}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      padding: "20px",
      width: "200px",
      borderRadius: "8px",
    }}
  >
    <h3>Borrowed Books</h3>
    <p>{borrowedBooks}</p>
  </div>

  <div
    style={{
      border: "1px solid #ccc",
      padding: "20px",
      width: "200px",
      borderRadius: "8px",
    }}
  >
    <h3>Genres</h3>
    <p>{totalGenres}</p>
  </div>
  <h3>Books by Genre</h3>

<ul>
  {Object.entries(genreStats).map(
    ([genre, count]) => (
      <li key={genre}>
        {genre}: {count}
      </li>
    )
  )}
</ul>
<h3>Books by Shelf Location</h3>
<ul>
  {Object.entries(shelfStats).map(
    ([shelf, count]) => (
      <li key={shelf}>
        {shelf}: {count}
      </li>
    )
  )}
</ul>
</div>

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

    <div style={{ marginBottom: "20px" }}>
  <label>
    <input
      type="checkbox"
      checked={showAvailableOnly}
      onChange={(e) =>
        setShowAvailableOnly(e.target.checked)
      }
    />
    Show Available Books Only
  </label>
</div>

<div style={{ marginBottom: "20px" }}>
  <label>
    Genre:
    <select
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      style={{ marginLeft: "10px" }}
    >
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  </label>
</div>

      <h2>All Books</h2>
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  }}
>
      {filteredBooks.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        
        filteredBooks.map((book) => {
          const hasValidImage =
    book.coverImage &&
    isValidUrl(book.coverImage);
    return(
<div
            key={book.id}
            style={{
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    width: "250px",
  }}
          >
            
{hasValidImage ? (
  <a
    href={book.coverImage}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={book.coverImage}
      alt={book.title}
      onError={(e) => {
        e.currentTarget.src = FALLBACK_IMAGE;
      }}
      style={{
        width: "150px",
        height: "220px",
        objectFit: "cover",
      }}
    />
  </a>
) : (
  <img
    src={FALLBACK_IMAGE}
    alt={book.title}
    style={{
      width: "150px",
      height: "220px",
      objectFit: "cover",
    }}
  />
)}
            <h3>{book.title}</h3>

            <p>
              <strong>Author:</strong> {book.author}
            </p>
             <Link href={`/books/${book.id}`}>
    View Details
  </Link>

            {/* <p>
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
            </p> */}
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </div>
      
    )
          
          
})
      )}
    </div>
    </div>
  );
}