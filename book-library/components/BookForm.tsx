"use client";

import { useState, useEffect } from "react";

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

type BookFormProps = {
    onAddBook: (book: Book) => void;
    onUpdateBook: (book: Book) => void;
    editingBook: Book | null;
};

export default function BookForm({ onAddBook, onUpdateBook, editingBook }: BookFormProps) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [genre, setGenre] = useState("");
    const [summary, setSummary] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [availableCopies, setAvailableCopies] = useState(0);
    const [totalCopies, setTotalCopies] = useState(0);
    const [shelfLocation, setShelfLocation] = useState("");
    const [publisher, setPublisher] = useState("");
    const [language, setLanguage] = useState("");
    const [pages, setPages] = useState(0);
    const [format, setFormat] = useState("");
    const [edition, setEdition] = useState("");
    const [series, setSeries] = useState("");
    const [volume, setVolume] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setIsbn(editingBook.isbn);
            setPublicationDate(editingBook.publicationDate);
            setGenre(editingBook.genre);
            setSummary(editingBook.summary);
            setCoverImage(editingBook.coverImage);
            setAvailableCopies(editingBook.availableCopies);
            setTotalCopies(editingBook.totalCopies);
            setShelfLocation(editingBook.shelfLocation);
            setPublisher(editingBook.publisher);
            setLanguage(editingBook.language);
            setPages(editingBook.pages);
            setFormat(editingBook.format);
            setEdition(editingBook.edition);
            setSeries(editingBook.series);
            setVolume(editingBook.volume);
            setIsAvailable(editingBook.isAvailable);
        } else {
            // Clear form fields when not editing
            setTitle("");
            setAuthor("");
            setIsbn("");
            setPublicationDate("");
            setGenre("");
            setSummary("");
            setCoverImage("");
            setAvailableCopies(0);
            setTotalCopies(0);
            setShelfLocation("");
            setPublisher("");
            setLanguage("");
            setPages(0);
            setFormat("");
            setEdition("");
            setSeries("");
            setVolume("");
            setIsAvailable(true);
        }
    }, [editingBook]);
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
    function handleSave() {
      if(!title.trim() || !author.trim()) {
        alert("Title and Author are required fields.");
        return;
    }
    if (coverImage && !isValidUrl(coverImage)) {
  alert("Please enter a valid image URL");
  return;
}
        const newBook: Book = {
          id: editingBook ? editingBook.id : Date.now(), // Use existing ID if editing, otherwise generate a new one
            title,
            author,
            isbn,
            publicationDate,
            genre,
            summary,
            coverImage,
            availableCopies,
            totalCopies,
            shelfLocation,
            publisher,
            language,
            pages,
            format,
            edition,
            series,
            volume,
            isAvailable
        };
        if (editingBook) {
            onUpdateBook(newBook);
        } else {
            onAddBook(newBook);
        }
        // Clear form fields after adding the book
        setTitle("");
        setAuthor("");
        setIsbn("");
        setPublicationDate("");
        setGenre("");
        setSummary("");
        setCoverImage("");
        setAvailableCopies(0);
        setTotalCopies(0);
        setShelfLocation("");
        setPublisher("");
        setLanguage("");
        setPages(0);
        setFormat("");
        setEdition("");
        setSeries("");
        setVolume("");
        setIsAvailable(true);
    }

  return (
  <div>
    <h1>Add Book</h1>
    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
    <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
    <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
    <input placeholder="Publication Date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
    <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
    <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
    <input placeholder="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
    <input placeholder="Available Copies" type="number" value={availableCopies} onChange={(e) => setAvailableCopies(Number(e.target.value))} />
    <input placeholder="Total Copies" type="number" value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} />
    <input placeholder="Shelf Location" value={shelfLocation} onChange={(e) => setShelfLocation(e.target.value)} />
    <input placeholder="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
    <input placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
    <input placeholder="Pages" type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} />
    <input placeholder="Format" value={format} onChange={(e) => setFormat(e.target.value)} />
    <input placeholder="Edition" value={edition} onChange={(e) => setEdition(e.target.value)} />
    <input placeholder="Series" value={series} onChange={(e) => setSeries(e.target.value)} />
    <input placeholder="Volume" value={volume} onChange={(e) => setVolume(e.target.value)} />
    <label>
      Available:
      <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
    </label>
    <button onClick={handleSave}>{editingBook ? "Update Book" : "Add Book"}</button>
  </div>
  )
}