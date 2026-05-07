import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Planteamientos from './pages/Planteamientos';
import Nosotros from './pages/Nosotros';
import Directorio from './pages/Directorio';
import Contacto from './pages/Contacto';
import NoticiaDetail from './pages/NoticiaDetail';
import Noticias from './pages/Noticias';
import './index.css';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/planteamientos" element={<Planteamientos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/directorio" element={<Directorio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/noticia/:id" element={<NoticiaDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
