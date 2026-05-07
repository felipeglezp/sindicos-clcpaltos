import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import './Home.css';

export default function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('/noticias.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const sortedData = results.data.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
            setNoticias(sortedData);
          }
        });
      })
      .catch(err => console.error("Error cargando noticias:", err));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge fade-in">Colegio de Licenciados en Contaduría Pública de los Altos de Jalisco A.C.</div>
          <h1 className="fade-in">Comisión de Síndicos 2024-2026</h1>
          <p className="hero-subtitle fade-in">
            Compromiso con la ética profesional contable en la región de los Altos de Jalisco
          </p>
          <div className="hero-actions fade-in">
            <Link to="/planteamientos" className="btn btn-primary">Ver Planteamientos SAT</Link>
            <Link to="/nosotros" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Nuestra Labor</Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section container py-12">
        <div className="section-header text-center mb-8">
          <h2>Últimas Noticias y Boletines</h2>
          <p className="subtitle">Mantente informado sobre los acontecimientos y actualizaciones de la Comisión de Síndicos</p>
        </div>

        <div className="news-grid">
          {noticias.slice(0, 3).map(noticia => (
            <div key={noticia.ID} className="card news-card">
              <div className="news-image" style={{ backgroundImage: `url(${noticia.Imagen})` }}></div>
              <div className="news-content">
                <span className="news-date">{new Date(noticia.Fecha).toLocaleDateString('es-MX')}</span>
                <h3>{noticia.Titulo}</h3>
                <p>{noticia.Resumen}</p>
                <Link to={`/noticia/${noticia.ID}`} className="btn-link" style={{ display: 'inline-block', marginTop: '15px' }}>
                  Leer más &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '40px' }}>
          <Link to="/noticias" className="btn btn-primary">Ver todas las noticias</Link>
        </div>
      </section>
    </div>
  );
}
