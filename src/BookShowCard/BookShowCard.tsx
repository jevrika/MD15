import { useState } from 'react';
import styles from './BookShowCard.module.css'
import axios from 'axios'
import BooksImage from '../BooksImage/BooksImage';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Book = {
  id: number;
  name: string;
  author: string;
  genre: string;
  year: number | string;
  createdAt: string;
};

const BookShowCard = () => {
  const queryClient = useQueryClient();
  const { id } = useParams()
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book[]>([]);


  const deleteBook = useMutation({
    mutationFn: (bookId: number) => axios.delete(`http://localhost:3000/books/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn:() =>  axios.get<Book[]>('http://localhost:3000/books').then((response) => setBookData(response.data.reverse())),
  })

  if ( booksQuery.isLoading)  return <h1> Loading....</h1>

  
  const handleDeleteBook = (bookId: number) => {
    deleteBook.mutate(bookId);
    navigate(`/books/`)
  }
 

  return (
    <>
      <div className={styles.allBooksWrapper}>
        {
          bookData && bookData.filter(x => x.id === Number(id)).map((book) => (
            <div key={book.id} className={styles.wrapper}>

              <div className={styles.book}>

                <div className={styles.genreImageWrapper}>
                  <BooksImage genre={book.genre} />
                </div>

                <h1 className={styles.bookHeading}>{book.name}</h1>
                <h2 className={styles.authorHeading}> {book.author}</h2>
                <h3 className={styles.genreHeading}>{book.genre}  </h3>
                <h4 className={styles.yearHeading}>The year of publishing : {book.year}</h4>

                <button className={styles.deleteButton} onClick={() => handleDeleteBook(book.id)}> Delete </button>
                <button className={styles.goBackButton} onClick={() => navigate(`/books/`)}> Go Back </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BookShowCard;