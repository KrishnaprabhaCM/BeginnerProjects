"use client";

import { useState } from "react";

export default function BookForm() {
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

  return (
  <div>
    <h1>Add Book</h1>
    <input value={title} onChange={(e) => setTitle(e.target.value)} />
    <input value={author} onChange={(e) => setAuthor(e.target.value)} />
    <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
    <input value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
    <input value={genre} onChange={(e) => setGenre(e.target.value)} />
    <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
    <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
    <input type="number" value={availableCopies} onChange={(e) => setAvailableCopies(Number(e.target.value))} />
    <input type="number" value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} />
    <input value={shelfLocation} onChange={(e) => setShelfLocation(e.target.value)} />
    <input value={publisher} onChange={(e) => setPublisher(e.target.value)} />
    <input value={language} onChange={(e) => setLanguage(e.target.value)} />
    <input type="number" value={pages} onChange={(e) => setPages(Number(e.target.value))} />
    <input value={format} onChange={(e) => setFormat(e.target.value)} />
    <input value={edition} onChange={(e) => setEdition(e.target.value)} />
    <input value={series} onChange={(e) => setSeries(e.target.value)} />
    <input value={volume} onChange={(e) => setVolume(e.target.value)} />
    <label>
      Available:
      <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
    </label>
    <button onClick={() => {
      // Here you would typically handle form submission, e.g. send the data to an API
      console.log({
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
      });
    }}>Save Book</button>
  </div>
  )
}