import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import './Home.css'; // Podemos reusar los estilos de grid de noticias del Home

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/noticias.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setNoticias(results.data);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error("Error cargando noticias:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-wrapper fade-in">
      <div className="container py-12">
        <div className="section-header text-center mb-10">
          <h1>Boletines emitidos por la Comisión de Síndicos</h1>
          <p className="subtitle">Historial completo de acontecimientos, boletines y actualizaciones importantes.</p>
        </div>

        {loading ? (
          <div className="text-center py-8">Cargando boletines...</div>
        ) : (
          <div className="news-grid">
            {noticias.map(noticia => (
              <div key={noticia.ID} className="card news-card">
                <div className="news-image" style={{backgroundImage: `url(${noticia.Imagen})`}}></div>
                <div className="news-content">
                  <span className="news-date">{new Date(noticia.Fecha).toLocaleDateString('es-MX')}</span>
                  <h3>{noticia.Titulo}</h3>
                  <p>{noticia.Resumen}</p>
                  <Link to={`/noticia/${noticia.ID}`} className="btn-link" style={{display: 'inline-block', marginTop: '15px'}}>
                    Leer más &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
