import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Components/Home/Home'
import About from '../Components/About/About';
import Navbar from '../Components/Navbar/Navbar'
import Form from '../Components/Form/Form'
import BooksPreviewCards from '../Components/BooksPreviewCards/BooksPreviewCards';
import BookShowCard from '../Components/BookShowCard/BookShowCard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<><div className={styles.wrapper}><Form /> <BooksPreviewCards /></div></>} />
        <Route path='/books/:id' element={<BookShowCard />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
