/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css';
import { useMutation } from '@tanstack/react-query';
import { Book } from '../../type';
import Button from '../Button/Button';

const url = 'http://localhost:3000/books/'

const Form = () => {
  const [formData, setFormData] = useState<Book>({
    id: 0,
    name: '',
    author: '',
    genre: '',
    year: '',
    createdAt: '',
  })

  // const newBookMutation = useMutation({
  //   mutationFn: () =>
  //     axios.post(url, formData).catch((errorData) => alert(`Name, author cannot contain numbers ${errorData.error}`)),
  // })
  
  const newBookMutation = useMutation({
    mutationFn: () =>
      axios.post(url, formData),
      onError: (error) => {
          alert(`Error: ${(error as any).response.data.error}`);}
  })

  const handleFormSubmit = () => {
    newBookMutation.mutate()
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.bookForm} >
        <div className={styles.headingWrapper}>
          <h1 className={styles.formHeading}>Add new book!</h1>
        </div>
        <input type="text" className={styles.formInput} name="book-name" placeholder="add book" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" className={styles.formInput} name="author-name" placeholder="add author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />

        <select required className={styles.genreSelect} name="book-genre" id="book-genre" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} >
          <option value="choose a book genre">choose a book genre</option>
          <option value="Mystery">Mystery</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Psychology">Psychology</option>
          <option value="History">History</option>
        </select>

        <input type="number" min="1900" max="2060" className={styles.formInput} name="book-year" placeholder="add publishing year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} required />

          <Button disabled={newBookMutation.isPending} buttonText={'Add Book!'} className={'addButton'} buttonType={'submit'} onClick={() => handleFormSubmit()}/>

      </form>
    </div>

  );
}

export default Form;