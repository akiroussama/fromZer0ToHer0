import './App.css';
import Home from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import WilderDetails from './screens/WilderDetails';
import Header from './components/Header';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location', location);
  const notrecondition = location.pathname !== '/login';
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <>
      <Header />
      <main className='container pb-8 bg-cream'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/wilders/:id' element={<WilderDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      {notrecondition && <button onClick={handleLogout}>Logout</button>}
      <div> FOOTER </div>
    </>
  );
}

export default App;
