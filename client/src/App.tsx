import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import WilderDetails from './screens/WilderDetails';
import Login from './screens/Login';
import NotFoundPage from './screens/NotFoundPage';
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wilders/:id' element={<WilderDetails />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
