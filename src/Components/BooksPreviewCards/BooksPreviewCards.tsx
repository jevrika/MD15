
import styles from './BooksPreviewCards.module.css'
import axios from 'axios'
import BooksImage from '../BooksImage/BooksImage';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Book } from '../../type';
import Button from '../Button/Button';

const url = 'http://localhost:3000/books/'

const BooksPreviewCards = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const wait = (duration: number) => {
    return new Promise(resolve => setTimeout(resolve, duration))
  }

  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: () => wait(2000).then(() => axios.get<Book[]>(url)).then((response) => response.data.reverse())}
  );

  const deleteBook = useMutation({
    mutationFn: (bookId: number) => axios.delete(`${url}${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleDeleteBook = (bookId: number) => {
    deleteBook.mutate(bookId)
  }

  if (booksQuery.isPending) {
      return <h1 className={styles.loadingHeading}>Loading....</h1>;
    
  }

  if (booksQuery.isError) {
    return <h1 className={styles.loadingHeading}>{booksQuery.error.message}</h1>;
  }


  return (
    <>
      <div className={styles.allBooksWrapper}>
        {
          booksQuery.data && booksQuery.data.map((book) => (
            <div key={book.id} className={styles.book}>

              <div className={styles.genreImageWrapper}>
                <BooksImage genre={book.genre} />
              </div>

                <h1 className={styles.bookHeading}>{book.name}</h1>

                <Button buttonText={'Delete'} className={'deleteButton'} buttonType={'button'} onClick={() => handleDeleteBook(book.id)}/>
                <Button buttonText={'Open'} className={'openButton'} buttonType={'button'} onClick={() => navigate(`/books/${book.id}`)}/>

            </div>
          ))}
      </div>
    </>
  );
}

export default BooksPreviewCards;