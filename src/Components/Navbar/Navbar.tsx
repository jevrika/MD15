import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <nav className={styles.navbar}>
      <div className={styles.linkWrapper}>
        <Link className={styles.link} to='/'> Home </Link>
        <Link className={styles.link} to='/books'> Books </Link>
        <Link className={styles.link} to='/about'> About </Link>
      </div>
    </nav>
  );
}

export default Navbar;