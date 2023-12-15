import styles from './BookShowCard.module.css'
import axios from 'axios'
import BooksImage from '../BooksImage/BooksImage';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Book } from '../../type';
import Button from '../Button/Button';

const url = 'http://localhost:3000/books/'

const BookShowCard = () => {
  const queryClient = useQueryClient();
  const { id } = useParams()
  const navigate = useNavigate();


  const deleteBook = useMutation({
    mutationFn: (bookId: number) => axios.delete(`${url}${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const booksQuery = useQuery({
    queryKey: ["books", id],
    queryFn: () => axios.get<Book[]>(`${url}${id}`).then((response) => response.data),
  })

  if (booksQuery.isLoading) return <h1> Loading....</h1>


  const handleDeleteBook = (bookId: number) => {
    deleteBook.mutate(bookId);
    navigate(`/books/`)
  }


  return (
    <>
      <div className={styles.allBooksWrapper}>
        {
          booksQuery.data && booksQuery.data.filter((x:Book) => x.id === Number(id)).map((book:Book) => (
            <div key={book.id} className={styles.wrapper}>

              <div className={styles.book}>

                <div className={styles.genreImageWrapper}>
                  <BooksImage genre={book.genre} />
                </div>

                <h1 className={styles.bookHeading}>{book.name}</h1>
                <h2 className={styles.authorHeading}> {book.author}</h2>
                <h3 className={styles.genreHeading}>{book.genre}  </h3>
                <h4 className={styles.yearHeading}>The year of publishing : {book.year}</h4>

                  <Button buttonText={'Delete'} className={'deleteButton'} buttonType={'button'} onClick={() => handleDeleteBook(book.id)}/>
                  <Button buttonText={'Go Back'} className={'goBackButton'} buttonType={'button'} onClick={() => navigate(`/books/`)}/>

              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BookShowCard;