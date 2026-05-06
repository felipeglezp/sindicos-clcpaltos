import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Papa from 'papaparse';
import './NoticiaDetail.css';

export default function NoticiaDetail() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/noticias.csv')
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el archivo de noticias");
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const found = results.data.find(n => n.ID === id);
            if (found) {
              setNoticia(found);
            } else {
              setError("Noticia no encontrada.");
            }
            setLoading(false);
          },
          error: (err) => {
            setError("Error al leer las noticias.");
            setLoading(false);
          }
        });
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container py-12 text-center">Cargando noticia...</div>;
  if (error) return (
    <div className="container py-12 text-center">
      <h2>Oops!</h2>
      <p>{error}</p>
      <Link to="/" className="btn btn-primary mt-4">Regresar al inicio</Link>
    </div>
  );
  if (!noticia) return null;

  // Split content by newlines to render paragraphs
  const paragraphs = noticia.Contenido ? noticia.Contenido.split(/\r?\n/).filter(p => p.trim() !== '') : [];

  return (
    <div className="noticia-detail-page">
      <div className="container py-8">
        <Link to="/" className="back-link">&larr; Volver al inicio</Link>
        
        <article className="noticia-article mt-6">
          <header className="article-header text-center">
            <span className="article-date">{new Date(noticia.Fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <h1 className="article-title">{noticia.Titulo}</h1>
          </header>
          
          <div className="article-image-container">
            <img src={noticia.Imagen} alt={noticia.Titulo} className="article-hero-image" />
          </div>

          <div className="article-body">
            <div className="article-resume">
              <strong>{noticia.Resumen}</strong>
            </div>
            
            <div className="article-content">
              {paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
