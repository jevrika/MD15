import { useEffect, useState } from 'react';
import styles from './BooksPreviewCards.module.css'
import axios from 'axios'
import BooksImage from '../BooksImage/BooksImage';
import { useNavigate } from 'react-router-dom';

type Book = {
  id: number;
  name: string;
  author: string;
  genre: string;
  year: number | string;
  createdAt: string;
};

const BooksPreviewCards = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const navigate = useNavigate();

  const getBooks = () => {
    axios.get<Book[]>('http://localhost:3000/books').then((response) => {
      setBookData(response.data.reverse())
    })
  }

  useEffect(() => {
    getBooks()
  }, [])

  const handleDeleteBook = (bookId: number) => {
    axios.delete(`http://localhost:3000/books/${bookId}`).then(() => {
      getBooks()
    })
  }


  return (
    <>
      <div className={styles.allBooksWrapper}>
        {
          bookData && bookData.map((book) => (
            <div key={book.id} className={styles.wrapper}>

              <div className={styles.book}>

                <div className={styles.genreImageWrapper}>
                  <BooksImage genre={book.genre} />
                </div>

                <h1 className={styles.bookHeading}>{book.name}</h1>

                <button className={styles.deleteButton} onClick={() => handleDeleteBook(book.id)}> Delete </button>
                <button className={styles.openButton} onClick={() => navigate(`/books/${book.id}`)}> Open </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BooksPreviewCards;