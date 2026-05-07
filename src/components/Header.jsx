import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo-section">
          <div className="logo-icon">SC</div>
          <div className="logo-text">
            <strong>Comisión de Síndicos del Contribuyente</strong>
            <span>Colegio de Contadores Públicos de los Altos de Jalisco A.C.</span>
          </div>
        </Link>
        <nav className="main-nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Inicio</Link>
          <Link to="/noticias" className={`nav-link ${isActive('/noticias')}`}>Boletines</Link>
          <Link to="/planteamientos" className={`nav-link ${isActive('/planteamientos')}`}>Planteamientos SAT</Link>
          <Link to="/nosotros" className={`nav-link ${isActive('/nosotros')}`}>Quiénes Somos</Link>
          <Link to="/directorio" className={`nav-link ${isActive('/directorio')}`}>Directorio</Link>
          <Link to="/contacto" className={`nav-link ${isActive('/contacto')}`}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
