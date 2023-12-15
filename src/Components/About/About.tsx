import styles from './About.module.css'

const genreImages = [
   'fantasy',
   'history',
   'horror',
   'mystery',
   'psychology',
   'romance',
 ];

const About = () => {
  return (
     <div className={styles.wrapper}>
      <h1 className={styles.heading}> All available book genres</h1>
      <div className={styles.genreImageWrapper}>
         {genreImages.map((genre, index) => (
          <img
            key={index}
            className={styles.genreImage}
            src={`/src/assets/images/${genre}.png`}
            alt='Genre Image'
          />
        ))}
      </div>
     </div>
     );
}
 
export default About;