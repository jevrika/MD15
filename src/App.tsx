import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home'
import About from './About/About';
import Navbar from './Navbar/Navbar'
import Form from './Form/Form'
import BooksPreviewCards from './BooksPreviewCards/BooksPreviewCards';
import BookShowCard from './BookShowCard/BookShowCard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<><div className={styles.wrapper}><Form/> <BooksPreviewCards /></div></>}/>
        <Route path='/books/:id' element={<BookShowCard />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
