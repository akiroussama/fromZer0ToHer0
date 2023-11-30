import './App.css';
import Home from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import WilderDetails from './screens/WilderDetails';
import Header from './components/Header';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
function App() {
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
      <div> FOOTER </div>
    </>
  );
}

export default App;
