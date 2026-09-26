// src/components/EnvelopeIntro.jsx
import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { CONFIG } from '../config';

export default function EnvelopeIntro({ onOpen }) {
  return (
    <div className="envelope-overlay">
      <div className="floating-sparks">
        {[...Array(16)].map((_, i) => (
          <span 
            key={i} 
            className="sparkle-dot" 
            style={{
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animationDelay: `${(i * 0.3).toFixed(1)}s`,
              animationDuration: `${2 + (i % 3)}s`
            }} 
          />
        ))}
      </div>

      <div className="envelope-card-container">
        <div className="envelope-badge">
          <Sparkles size={14} className="gold-icon" />
          <span>Invitación Especial</span>
          <Sparkles size={14} className="gold-icon" />
        </div>

        <div className="envelope-seal-wrapper">
          <div className="envelope-seal">
            <span className="seal-text">A & A</span>
          </div>
        </div>

        <h1 className="envelope-title">
          ¿Niño o Niña?
        </h1>
        
        <p className="envelope-names">
          {CONFIG.parents.mom} & {CONFIG.parents.dad}
        </p>

        <p className="envelope-subtitle">
          Te invitamos a ser parte del momento más emocionante de nuestras vidas: descubrir el género de nuestro
          <span className="highlight-angelito"> Hermoso Angelito 🤎</span>
        </p>

        <button 
          className="open-invitation-btn"
          onClick={onOpen}
          aria-label="Abrir invitación interactiva"
        >
          <span className="btn-shine"></span>
          <span className="btn-content">
            <Heart size={18} fill="#4A2E18" color="#4A2E18" className="btn-heart" />
            Tocar para Abrir
            <Sparkles size={16} color="#4A2E18" />
          </span>
        </button>

        <p className="audio-hint-text">
          🎵 Activa el sonido para una experiencia mágica
        </p>
      </div>
    </div>
  );
}
