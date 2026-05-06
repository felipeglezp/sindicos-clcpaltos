import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Planteamientos.css';

export default function Planteamientos() {
  const [planteamientos, setPlanteamientos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTema, setFilterTema] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Leer el archivo CSV automáticamente al cargar la página
    Papa.parse('/planteamientos.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPlanteamientos(results.data);
        setLoading(false);
      },
      error: (error) => {
        console.error('Error leyendo el CSV:', error);
        setLoading(false);
      }
    });
  }, []);

  // Extraer temas únicos para el filtro
  const temas = [...new Set(planteamientos.map(p => p.Tema))].filter(Boolean);

  // Filtrar resultados
  const filteredPlanteamientos = planteamientos.filter(p => {
    if (!p.Titulo) return false;
    const term = searchTerm.toLowerCase();
    const tituloMatch = p.Titulo.toLowerCase().includes(term);
    const respuestaMatch = p.RespuestaSAT ? p.RespuestaSAT.toLowerCase().includes(term) : false;
    
    const matchesSearch = tituloMatch || respuestaMatch;
    const matchesTema = filterTema === '' || p.Tema === filterTema;
    return matchesSearch && matchesTema;
  });

  if (loading) {
    return (
      <div className="container main-content text-center py-12">
        <h3 style={{color: 'var(--primary)'}}>Cargando planteamientos desde Excel...</h3>
      </div>
    );
  }

  return (
    <div className="container main-content planteamientos-page">
      <div className="page-header text-center mb-8">
        <h1>Buscador de Planteamientos</h1>
        <p className="subtitle">Consulta los planteamientos específicos y las respuestas del SAT. Los resultados incluyen enlaces directos a la minuta original en PDF.</p>
      </div>

      <div className="card search-panel mb-8">
        <div className="search-grid">
          <div className="search-group">
            <label>Buscar en Título o Respuesta SAT</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ej. situación fiscal, devoluciones, CSD..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="search-group">
            <label>Filtrar por Tema</label>
            <select 
              className="input-field"
              value={filterTema}
              onChange={e => setFilterTema(e.target.value)}
            >
              <option value="">Todos los temas</option>
              {temas.map(tema => (
                <option key={tema} value={tema}>{tema}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="results-container">
        {filteredPlanteamientos.length === 0 ? (
          <div className="no-results text-center py-12 card">
            <h3>No se encontraron planteamientos</h3>
            <p>Intenta con otras palabras clave.</p>
          </div>
        ) : (
          filteredPlanteamientos.map(item => (
            <div key={item.ID} className="card planteamiento-card mb-4">
              <div className="planteamiento-header">
                <span className="badge-tema">{item.Tema}</span>
                <span className="fecha">Origen: {item.MinutaOrigen} ({item.Fecha})</span>
              </div>
              <h3 className="planteamiento-titulo">{item.Titulo}</h3>
              
              <div className="planteamiento-respuesta mt-4 mb-4">
                <h4>Respuesta del SAT</h4>
                <p>{item.RespuestaSAT}</p>
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <a href={item.Archivo} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{display: 'inline-flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem'}}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Ver PDF Completo
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
