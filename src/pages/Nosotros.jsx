import React from 'react';

export default function Nosotros() {
  return (
    <div className="container main-content py-12">
      <div className="page-header text-center mb-8">
        <h1>Nuestra Labor</h1>
        <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)'}}>
          Nuestros compromisos y responsabilidades como Comisión de Síndicos del Colegio de Licenciados en Contaduría Pública de los Altos de Jalisco A.C. para el periodo 2024-2026.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="card" style={{borderTop: '4px solid var(--primary-light)'}}>
          <h3 style={{color: 'var(--primary)'}}>Funciones de Vigilancia</h3>
          <p style={{color: 'var(--text-muted)'}}>
            El rol del Síndico del Contribuyente es servir como un canal de comunicación directo y gratuito entre las autoridades fiscales (SAT) y los contribuyente.
          </p>
        </div>
        
        <div className="card" style={{backgroundColor: 'var(--blue-900)', color: 'white'}}>
          <h3 style={{color: 'white'}}>Transparencia Total</h3>
          <p style={{color: 'var(--gray-200)'}}>
            Nuestro principal propósito es  facilitar la relación entre ambas partes, apoyando el cumplimiento de las obligaciones fiscales de los afiliados.
          </p>
        </div>
        
        <div className="card" style={{borderTop: '4px solid var(--primary-light)'}}>
          <h3 style={{color: 'var(--primary)'}}>Ética Profesional</h3>
          <p style={{color: 'var(--text-muted)'}}>
            Buscamos representar honorablemente al Colegio y sus integrantes para dar a conocer sus problemáticas, lo que contribuye al fortalecimiento y la vinculación institucional de nuestra organización.
          </p>
        </div>
      </div>
    </div>
  );
}
