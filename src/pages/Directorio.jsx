import React from 'react';

export default function Directorio() {
  const sindicos = [
    { id: 1, nombre: 'L.C.P. Martha Patricia Aguilar Navarro', cargo: 'Síndico Titular Administración Desconcentrada de Servicios al Contribuyente de Jalisco 2.', contacto: 'paty_ta8@hotmail.com' },
    { id: 2, nombre: 'L.C.P. Jorge Enrique Mendoza González', cargo: 'Síndico Suplente', contacto: 'cpjorgemendoza23@gmail.com' },
    { id: 3, nombre: 'MDFA. L.D. y L.C.P. Felipe de Jesús González Pérez', cargo: 'Síndico Titular Administración Desconcentrada de Servicios al Contribuyente de Jalisco 3. ', contacto: 'felipeglezp@gmail.com' },
    { id: 4, nombre: 'M.I. y L.C.P. Maria Eugenia Gomez Gutierrez ', cargo: 'Síndica Suplente', contacto: 'eugenia.8888@hotmail.com' }
  ];

  return (
    <div className="container main-content py-12">
      <div className="page-header text-center mb-8">
        <h1>Directorio de Síndicos</h1>
        <p className="subtitle" style={{maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)'}}>
          Profesionales comprometidos con la integridad y el desarrollo del gremio contable en los Altos de Jalisco.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {sindicos.map(sindico => (
          <div key={sindico.id} className="card text-center" style={{padding: '2.5rem 1.5rem'}}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', 
              backgroundColor: 'var(--blue-100)', color: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', margin: '0 auto 1.5rem', border: '2px solid var(--primary-light)'
            }}>
              👤
            </div>
            <h3 style={{fontSize: '1.2rem', marginBottom: '0.25rem'}}>{sindico.nombre}</h3>
            <p style={{color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase'}}>{sindico.cargo}</p>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{sindico.contacto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
