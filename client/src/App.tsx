import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/Home';
import { Routes, Route } from 'react-router-dom';
import WilderDetails from './screens/WilderDetails';
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wilders/:id' element={<WilderDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
