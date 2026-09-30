// src/components/FullCardView.jsx
import React from 'react';
import { 
  Calendar, MapPin, Sparkles, Gift, Shirt, MessageCircle, 
  Film, Heart, Baby, CheckCircle
} from 'lucide-react';
import { CONFIG } from '../config';

export default function FullCardView({ onSwitchToStoryMode }) {
  const whatsappUrl = `https://wa.me/${CONFIG.event.whatsappPhone}?text=${encodeURIComponent(
    `¡Hola Ammi y Alberth! 🤎 Confirmo con mucho amor mi asistencia a la revelación de género de su bebé este 18 de Octubre en Granja Pa' que Hugo. ¡Nos vemos allá! ✨`
  )}`;

  return (
    <div className="full-card-container">
      {/* Botón flotante superior para volver al modo Video / Historia */}
      <div className="full-card-top-bar">
        <button 
          className="switch-to-video-btn" 
          onClick={onSwitchToStoryMode}
        >
          <Film size={18} />
          <span>Ver en Modo Video / Historia</span>
        </button>
      </div>

      {/* 1. Header con Ilustración y Nombres */}
      <header className="card-hero-section">
        <div className="hero-badge">
          <Sparkles size={14} className="gold-text" />
          <span>Nuestra Revelación de Género</span>
          <Sparkles size={14} className="gold-text" />
        </div>

        <h1 className="hero-main-title">
          ¿Niño <span className="gold-question">?</span> Niña
        </h1>

        <p className="hero-parents">
          {CONFIG.parents.mom} & {CONFIG.parents.dad}
        </p>

        <div className="hero-image-frame">
          <img 
            src="/teddy_intro.jpg" 
            alt="Osito Teddy con globos" 
            className="hero-img" 
          />
        </div>

        <p className="hero-sweet-quote">
          "Estamos muy ansiosos por saber el género de nuestro bebé y queremos que nos acompañes en este hermoso momento."
        </p>
      </header>

      {/* 2. Sección Ecografía / La Dulce Espera */}
      <section className="card-section angelito-card-section">
        <div className="section-badge">El Milagro Más Grande</div>
        <h2 className="section-title">La Dulce Espera</h2>
        
        <div className="ultrasound-showcase">
          <img 
            src="/angelito_ultrasound.jpg" 
            alt="Ecografía con marco dorado" 
            className="ultrasound-display-img" 
          />
        </div>

        <p className="angelito-card-caption">
          "Estoy muy feliz que sean Mis papitos y Angelito mi hermanito"
          <br />
          <span className="angelito-caption-names">— {CONFIG.parents.mom}, {CONFIG.parents.dad} y Angelito 🤎✨</span>
        </p>
      </section>

      {/* 3. Sección de Fecha y Lugar (Granja Pa' que Hugo) */}
      <section className="card-section event-card-section">
        <div className="section-badge">Coordenadas del Evento</div>
        <h2 className="section-title">¿Cuándo y Dónde?</h2>

        <div className="info-cards-grid">
          {/* Tarjeta de Fecha */}
          <div className="info-block-card">
            <div className="info-icon-badge">
              <Calendar size={22} className="gold-icon" />
            </div>
            <span className="info-label">DÍA DEL EVENTO</span>
            <strong className="info-main-text">{CONFIG.event.fullDate}</strong>
            <span className="info-sub-text">{CONFIG.event.time}</span>
          </div>

          {/* Tarjeta de Lugar */}
          <div className="info-block-card">
            <div className="info-icon-badge">
              <MapPin size={22} className="gold-icon" />
            </div>
            <span className="info-label">UBICACIÓN</span>
            <strong className="info-main-text">{CONFIG.event.locationName}</strong>
            <span className="info-sub-text">{CONFIG.event.locationCity}</span>
            
            <a 
              href={CONFIG.event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="open-maps-link"
            >
              <MapPin size={16} />
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Sección de Código de Vestimenta */}
      <section className="card-section dress-code-section">
        <div className="section-badge">Etiqueta Sugerida</div>
        <h2 className="section-title">{CONFIG.dressCode.title}</h2>
        <p className="section-desc">
          {CONFIG.dressCode.colorsText}
        </p>

        <div className="swatches-container-card">
          {CONFIG.dressCode.swatches.map((swatch, idx) => (
            <div key={idx} className="swatch-card-item">
              <div 
                className="swatch-large-circle" 
                style={{ 
                  backgroundColor: swatch.color,
                  border: swatch.border ? `2px solid ${swatch.border}` : '2px solid rgba(0,0,0,0.08)'
                }} 
              />
              <span className="swatch-label-text">{swatch.name}</span>
            </div>
          ))}
        </div>
        <p className="dress-code-note">
          {CONFIG.dressCode.description}
        </p>
      </section>

      {/* 5. Sección de Dinámica de Regalos */}
      <section className="card-section gift-dynamics-section">
        <div className="section-badge">¿Niño o Niña?</div>
        <h2 className="section-title">{CONFIG.giftDynamics.title}</h2>
        <p className="section-desc">Trae tu regalo según tu sospecha:</p>

        <div className="gifts-comparison-grid">
          {/* Opción Niña */}
          <div className="gift-option-card girl-card">
            <div className="gift-badge-team">Team Niña 🎀</div>
            <div className="gift-image-thumb">
              <img src="/baby_shoes.jpg" alt="Team Niña" />
            </div>
            <h3 className="gift-team-title">Si crees que es Niña:</h3>
            <div className="gift-highlight-pill">
              <Gift size={16} />
              <strong>{CONFIG.giftDynamics.girl.gift}</strong>
            </div>
          </div>

          {/* Opción Niño */}
          <div className="gift-option-card boy-card">
            <div className="gift-badge-team">Team Niño 🧸</div>
            <div className="gift-image-thumb">
              <img src="/teddy_sleeping.jpg" alt="Team Niño" />
            </div>
            <h3 className="gift-team-title">Si crees que es Niño:</h3>
            <div className="gift-highlight-pill">
              <Gift size={16} />
              <strong>{CONFIG.giftDynamics.boy.gift}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer con Confirmación de WhatsApp */}
      <footer className="card-footer-section">
        <h2 className="footer-callout">¿Nos acompañas?</h2>
        <p className="footer-sub">
          Por favor, confirma tu asistencia para preparar todo con mucho amor.
        </p>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-main-button"
        >
          <MessageCircle size={22} />
          <span>Confirmar Asistencia con los Papás</span>
        </a>

        <div className="final-blessing-box">
          <Sparkles size={16} className="gold-text" />
          <span>Con amor, Ammi &amp; Alberth</span>
          <Sparkles size={16} className="gold-text" />
        </div>
      </footer>
    </div>
  );
}
