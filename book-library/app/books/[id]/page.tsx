"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BookDetailsPage() {
    const params = useParams();
    const [book, setBook] = useState<any>(null);
    useEffect(() => {
        const savedBooks = localStorage.getItem("books");
        if (!savedBooks) {
            return;
        }
    const books = JSON.parse(savedBooks);
const selectedBook = books.find(
      (b: any) => b.id === Number(params.id)
    );
    setBook(selectedBook);
}, [params.id]);

    if (!book) {
        return <p>Book not found.</p>;
    }
    return(
        <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>

      <img
        src={book.coverImage}
        alt={book.title}
        width={250}
      />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Language:</strong> {book.language}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Format:</strong> {book.format}</p>
      <p><strong>Edition:</strong> {book.edition}</p>
      <p><strong>Series:</strong> {book.series}</p>
      <p><strong>Volume:</strong> {book.volume}</p>
      <p><strong>Shelf:</strong> {book.shelfLocation}</p>
      <p><strong>Available Copies:</strong> {book.availableCopies}</p>
      <p><strong>Total Copies:</strong> {book.totalCopies}</p>
      <p><strong>Publication Date:</strong> {book.publicationDate}</p>

      <h3>Summary</h3>

      <p>{book.summary}</p>
      <Link href="/books">
  ← Back to Library
</Link>
    </div>
    );
}