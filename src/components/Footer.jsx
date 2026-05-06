import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h4>Síndicos del Contribuyente</h4>
          <p>Colegio de Licenciados en Contaduría Pública de los Altos de Jalisco A.C.</p>
          <p className="mt-4">Vigilancia, transparencia y compromiso con la ética profesional contable.</p>
        </div>
        <div className="footer-links">
          <h5>Enlaces Rápidos</h5>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/planteamientos">Consultas SAT</a></li>
            <li><a href="/nosotros">Quiénes Somos</a></li>
            <li><a href="/directorio">Directorio</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h5>Contacto</h5>
          <p>Email: contacto@colegiodecontadoresaltos.mx</p>
          <p>Tel: (378) 123 4567</p>
          <p>Tepatitlán de Morelos, Jalisco</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Colegio de Licenciados en Contaduría Pública de los Altos A.C. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
