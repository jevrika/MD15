import styles from './BooksImage.module.css'

const BooksImage = ({ genre }: { genre: string }) => {
  if (genre === "") {
    return (
      <>
        <img className={styles.genreImage} src={`/src/assets/images/unknown.png`} alt="Genre Image" />
      </>
    );
  } else {
    return (
      <>
        <img className={styles.genreImage} src={`/src/assets/images/${genre.toLowerCase()}.png`} alt="Genre Image" />
      </>
    );
  }
};

export default BooksImage