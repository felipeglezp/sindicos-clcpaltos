import React from 'react';

export default function Contacto() {
  return (
    <div className="container main-content py-12">
      <div className="page-header text-center mb-8">
        <h1>Contacto</h1>
        <p className="subtitle" style={{maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)'}}>
          Comunícate con la Comisión de Síndicos para reportar incidencias con el SAT o realizar consultas sobre criterios fiscales.
        </p>
      </div>

      <div className="card" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', padding: '0', overflow: 'hidden'}}>
        <div style={{backgroundColor: 'var(--blue-900)', color: 'white', padding: '3rem'}}>
          <h2 style={{color: 'white', marginBottom: '1.5rem'}}>Información</h2>
          <div style={{marginBottom: '1rem'}}>
            <strong>Dirección:</strong>
            <p style={{color: 'var(--gray-400)'}}>Calle Morelos 218-interior 3, Centro, 47600 Tepatitlán de Morelos, Jal.</p>
          </div>
          <div style={{marginBottom: '1rem'}}>
            <strong>Teléfono:</strong>
            <p style={{color: 'var(--gray-400)'}}>(378) 128 6076</p>
          </div>
          <div style={{marginBottom: '1rem'}}>
            <strong>Correo Electrónico:</strong>
            <p style={{color: 'var(--gray-400)'}}>sindicosat.clcpa@gmail.com</p>
          </div>
        </div>
        
        <div style={{padding: '3rem'}}>
          <h2 style={{marginBottom: '1.5rem'}}>Envíanos un Mensaje</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Nombre Completo</label>
              <input type="text" className="input-field" placeholder="Tu nombre" />
            </div>
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Correo Electrónico</label>
              <input type="email" className="input-field" placeholder="tu@correo.com" />
            </div>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>Mensaje o Planteamiento</label>
              <textarea className="input-field" rows="4" placeholder="Describe tu consulta..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
}
