import { useState } from 'react';
import styles from './BooksPreviewCards.module.css'
import axios from 'axios'
import BooksImage from '../BooksImage/BooksImage';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Book = {
  id: number;
  name: string;
  author: string;
  genre: string;
  year: number | string;
  createdAt: string;
};

const BooksPreviewCards = () => {
  const queryClient = useQueryClient();
  const [bookData, setBookData] = useState<Book[]>([]);
  const navigate = useNavigate();

  const deleteBook = useMutation({
    mutationFn: (bookId: number) => axios.delete(`http://localhost:3000/books/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const wait = (duration: number) => {
    return new Promise(resolve => setTimeout(resolve, duration))
  }

  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: () => wait(1000).then(() =>
      axios.get<Book[]>('http://localhost:3000/books').then((response) => {
        setBookData(response.data.reverse());
        return response.data;
      })
    ),
  });

  if (booksQuery.isLoading) {
    return <h1 className={styles.loadingHeading}>Loading....</h1>;
  }

  const handleDeleteBook = (bookId: number) => {
    deleteBook.mutate(bookId);
  }



  return (
    <>
      <div className={styles.allBooksWrapper}>
        {
          bookData && bookData.map((book) => (
            <div className={styles.book}>

              <div className={styles.genreImageWrapper}>
                <BooksImage genre={book.genre} />
              </div>

              <h1 className={styles.bookHeading}>{book.name}</h1>

              <button className={styles.deleteButton} onClick={() => handleDeleteBook(book.id)}> Delete </button>
              <button className={styles.openButton} onClick={() => navigate(`/books/${book.id}`)}> Open </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default BooksPreviewCards;