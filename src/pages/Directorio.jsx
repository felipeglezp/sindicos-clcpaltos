import React from 'react';

export default function Directorio() {
  const sindicos = [
    { id: 1, nombre: 'C.P. Juan Pérez López', cargo: 'Síndico Titular', contacto: 'juan.perez@ejemplo.com' },
    { id: 2, nombre: 'C.P. María González', cargo: 'Síndico Suplente', contacto: 'maria.g@ejemplo.com' },
    { id: 3, nombre: 'C.P. Roberto Sánchez', cargo: 'Asesor del Consejo', contacto: 'roberto.s@ejemplo.com' },
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
