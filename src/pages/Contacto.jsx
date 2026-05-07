import React, { useState } from 'react';
import './Contacto.css';

export default function Contacto() {
  const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xyzkqovv', { // Nota: Aquí se debería usar el ID real de Formspree
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Nuevo mensaje de ${formData.name} - Web Síndicos`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus('error');
    }
  };

  // Alternativa simple si no quieren configurar Formspree: usar mailto directo
  const handleMailto = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Consulta de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:sindicosat.clcpa@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container main-content py-12">
      <div className="page-header text-center mb-8">
        <h1>Contacto</h1>
        <p className="subtitle">
          Comunícate con la Comisión de Síndicos para reportar incidencias con el SAT o realizar consultas sobre criterios fiscales.
        </p>
      </div>

      <div className="contacto-grid">
        <div className="contacto-info">
          <h2 style={{color: 'white', marginBottom: '2.5rem'}}>Información de Enlace</h2>
          
          <div className="info-item">
            <div className="info-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div className="info-content">
              <h3>Dirección</h3>
              <p>Calle Morelos 218-interior 3, Centro, 47600 Tepatitlán de Morelos, Jal.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div className="info-content">
              <h3>Teléfono</h3>
              <p>(378) 128 6076</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div className="info-content">
              <h3>Correo Electrónico</h3>
              <p>sindicosat.clcpa@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="contacto-form-container">
          <h2 style={{marginBottom: '2rem'}}>Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '1.25rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem'}}>Nombre Completo</label>
              <input 
                type="text" 
                name="name"
                className="input-field" 
                placeholder="Tu nombre" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div style={{marginBottom: '1.25rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem'}}>Correo Electrónico</label>
              <input 
                type="email" 
                name="email"
                className="input-field" 
                placeholder="tu@correo.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div style={{marginBottom: '1.75rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem'}}>Mensaje o Planteamiento</label>
              <textarea 
                name="message"
                className="input-field" 
                rows="5" 
                placeholder="Describe tu consulta o incidencia detalladamente..." 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{width: '100%'}}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {status === 'success' && (
              <div className="form-status status-success">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status status-error">
                Hubo un error al enviar el mensaje. Por favor intenta de nuevo o usa el correo directo.
              </div>
            )}
          </form>
          
          <div style={{marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--gray-100)', paddingTop: '1.5rem'}}>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
              ¿Prefieres usar tu aplicación de correo? 
              <a href="#" onClick={handleMailto} style={{marginLeft: '0.5rem', fontWeight: '600'}}>Abrir Correo Directo</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
