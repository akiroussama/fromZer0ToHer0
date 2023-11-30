import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import WilderDetails from './screens/WilderDetails';
import Login from './screens/Login';
import NotFoundPage from './screens/NotFoundPage';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Perform logout logic here
    navigate('/login'); // Redirect to login page after logout
  };

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
      {location.pathname !== '/login' && (
        <button onClick={handleLogout}>Logout</button>
      )}
      <Footer />
    </>
  );
}

export default App;
