import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import './Planteamientos.css';

export default function Planteamientos() {
  const [planteamientos, setPlanteamientos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTema, setFilterTema] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterTema]);

  // Extraer temas únicos para el filtro
  const temas = useMemo(() => {
    return [...new Set(planteamientos.map(p => p.Tema))].filter(Boolean);
  }, [planteamientos]);

  // Filtrar resultados
  const filteredPlanteamientos = useMemo(() => {
    return planteamientos.filter(p => {
      if (!p.Titulo) return false;
      const term = searchTerm.toLowerCase();
      const tituloMatch = p.Titulo.toLowerCase().includes(term);
      const respuestaMatch = p.RespuestaSAT ? p.RespuestaSAT.toLowerCase().includes(term) : false;
      
      const matchesSearch = tituloMatch || respuestaMatch;
      const matchesTema = filterTema === '' || p.Tema === filterTema;
      return matchesSearch && matchesTema;
    });
  }, [planteamientos, searchTerm, filterTema]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPlanteamientos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlanteamientos.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container main-content text-center py-12">
        <div className="loading-spinner"></div>
        <h3 className="mt-4" style={{color: 'var(--primary)'}}>Cargando planteamientos desde la base de datos...</h3>
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
            <div className="select-wrapper">
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
        <div className="results-count mt-4 text-center">
          <span className="badge-count">
            {filteredPlanteamientos.length} resultados encontrados
          </span>
        </div>
      </div>

      <div className="results-container">
        {filteredPlanteamientos.length === 0 ? (
          <div className="no-results text-center py-12 card">
            <h3>No se encontraron planteamientos</h3>
            <p>Intenta con otras palabras clave o cambia los filtros.</p>
          </div>
        ) : (
          <>
            {currentItems.map(item => (
              <div key={item.ID} className="card planteamiento-card mb-4">
                <div className="planteamiento-header">
                  <span className="badge-tema">{item.Tema}</span>
                  <span className="fecha">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{marginRight: '4px'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Origen: {item.MinutaOrigen} ({item.Fecha})
                  </span>
                </div>
                <h3 className="planteamiento-titulo">{item.Titulo}</h3>
                
                <div className="planteamiento-respuesta mt-4 mb-4">
                  <h4>Respuesta del SAT</h4>
                  <p>{item.RespuestaSAT}</p>
                </div>

                <div className="planteamiento-footer">
                  <a href={item.Archivo} target="_blank" rel="noopener noreferrer" className="btn btn-outline pdf-link">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Ver Minuta Original PDF
                  </a>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-btn" 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                
                <span className="page-info">
                  Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
                </span>

                <button 
                  className="page-btn" 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
