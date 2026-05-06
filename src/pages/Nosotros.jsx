import React from 'react';

export default function Nosotros() {
  return (
    <div className="container main-content py-12">
      <div className="page-header text-center mb-8">
        <h1>Nuestra Labor</h1>
        <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)'}}>
          Los Síndicos son encargados de vigilar y fiscalizar la gestión administrativa y financiera, garantizando la transparencia en el uso de los recursos.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="card" style={{borderTop: '4px solid var(--primary-light)'}}>
          <h3 style={{color: 'var(--primary)'}}>Funciones de Vigilancia</h3>
          <p style={{color: 'var(--text-muted)'}}>
            Revisión permanente de los procesos y cumplimiento normativo. Supervisamos que las operaciones ante las autoridades fiscales se realicen conforme a la ley.
          </p>
        </div>
        
        <div className="card" style={{backgroundColor: 'var(--blue-900)', color: 'white'}}>
          <h3 style={{color: 'white'}}>Transparencia Total</h3>
          <p style={{color: 'var(--gray-200)'}}>
            Presentamos informes periódicos a la asamblea general. Nuestro compromiso es mantener una gestión abierta ante todos los miembros de la organización.
          </p>
        </div>
        
        <div className="card" style={{borderTop: '4px solid var(--primary-light)'}}>
          <h3 style={{color: 'var(--primary)'}}>Ética Profesional</h3>
          <p style={{color: 'var(--text-muted)'}}>
            Velamos por el cumplimiento del Código de Ética del Colegio. Promovemos las mejores prácticas y proponemos mejoras en los procesos.
          </p>
        </div>
      </div>
    </div>
  );
}
