// src/components/StoryViewer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, MapPin, Calendar, Clock, 
  Gift, Sparkles, MessageCircle, RotateCcw, ChevronLeft, ChevronRight,
  Shirt, Heart
} from 'lucide-react';
import { CONFIG } from '../config';

export default function StoryViewer({ 
  onToggleSound, 
  isMuted, 
  onSwitchToScrollMode 
}) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isPaused, setIsPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const scenes = CONFIG.storyScenes;
  const currentScene = scenes[currentSceneIndex];
  const duration = currentScene.duration || 6500;

  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);

  // Control del temporizador de progreso
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = performance.now();
    pausedTimeRef.current = 0;

    const animateProgress = (now) => {
      if (isPaused || isHolding) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
        return;
      }

      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current - pausedTimeRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct >= 100) {
        goToNextScene();
      } else {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentSceneIndex, isPaused, isHolding, duration]);

  const goToNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      // En la última escena pausar para que lean con tranquilidad
      setIsPaused(true);
    }
  };

  const goToPrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    } else {
      setProgress(0);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  // Manejo de toques laterales para avanzar/retroceder
  const handleTap = (e) => {
    // Si hizo clic en un botón interactivo o enlace, no cambiar de escena
    if (e.target.closest('button') || e.target.closest('a')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftSide = x < rect.width * 0.35;

    if (isLeftSide) {
      goToPrevScene();
    } else {
      goToNextScene();
    }
  };

  const handleHoldStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    setIsHolding(true);
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
  };

  // Mensaje pre-armado de WhatsApp
  const whatsappUrl = `https://wa.me/${CONFIG.event.whatsappPhone}?text=${encodeURIComponent(
    `¡Hola Ammi y Alberth! 🤎 Confirmo con mucho amor mi asistencia a la revelación de género de su bebé este 18 de Octubre en Granja Pa' que Hugo. ¡Nos vemos allá! ✨`
  )}`;

  return (
    <div 
      className="story-container"
      onClick={handleTap}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      {/* 1. Barras de progreso superiores estilo Instagram Story */}
      <div className="story-progress-bar">
        {scenes.map((scene, idx) => {
          let fillWidth = '0%';
          if (idx < currentSceneIndex) {
            fillWidth = '100%';
          } else if (idx === currentSceneIndex) {
            fillWidth = `${progress}%`;
          }
          return (
            <div key={scene.id} className="progress-segment-track">
              <div 
                className="progress-segment-fill" 
                style={{ width: fillWidth }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. Barra de controles superiores (Play/Pausa, Sonido, Contador de escena) */}
      <div className="story-top-controls">
        <div className="story-scene-badge">
          <Sparkles size={12} className="gold-text" />
          <span>{currentSceneIndex + 1} / {scenes.length}</span>
        </div>

        <div className="story-actions">
          <button 
            className="story-icon-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(!isPaused);
            }}
            title={isPaused ? "Reanudar" : "Pausar"}
          >
            {isPaused ? <Play size={17} /> : <Pause size={17} />}
          </button>

          <button 
            className={`story-icon-btn ${!isMuted ? 'music-playing' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSound();
            }}
            title={isMuted ? "Activar música" : "Silenciar música"}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
      </div>

      {/* 3. Contenido visual dinámico de la escena actual */}
      <div className="story-scene-wrapper key-{currentScene.id}">
        {/* Fondo con imagen y overlay cálido */}
        <div className="story-media-layer">
          <img 
            src={currentScene.image} 
            alt={currentScene.title}
            className={`story-bg-image ${isPaused || isHolding ? 'paused-animation' : ''}`} 
          />
          <div className="story-gradient-overlay" />
          <div className="gold-particles-overlay" />
        </div>

        {/* 4. Textos y contenido superpuesto según la escena */}
        <div className="story-content-layer">
          {/* Escena 1: Intro */}
          {currentScene.id === 'intro' && (
            <div className="scene-content intro-scene">
              <span className="scene-tag">Un Hermoso Milagro</span>
              <h1 className="title-gender-reveal">
                <span className="bubble-boy">¿Niño</span>
                <span className="bubble-question">?</span>
                <span className="bubble-girl">Niña</span>
              </h1>
              <p className="scene-subtitle-italic">
                {currentScene.subtitle}
              </p>
              <div className="cute-scroll-hint">
                <span>Toca para avanzar</span>
                <ChevronRight size={16} />
              </div>
            </div>
          )}

          {/* Escena 2: Mensaje de los padres */}
          {currentScene.id === 'message' && (
            <div className="scene-content message-scene">
              <span className="scene-tag boy-girl-badge">Boy 🧸 Girl</span>
              <div className="message-uppercase-box">
                <p className="message-uppercase-text">
                  ESTAMOS MUY ANSIOSOS POR SABER EL GÉNERO DE NUESTRO BEBÉ Y QUEREMOS QUE NOS ACOMPAÑES EN ESTE HERMOSO MOMENTO
                </p>
              </div>
              <p className="parents-signature">
                Con amor, <strong>{CONFIG.parents.mom} & {CONFIG.parents.dad}</strong>
              </p>
            </div>
          )}

          {/* Escena 3: Team Niña */}
          {currentScene.id === 'girl-team' && (
            <div className="scene-content team-bubble-scene team-girl">
              <span className="scene-tag girl-tag">{currentScene.badge}</span>
              <h2 className="bubble-title-line">Muchos quieren</h2>
              <h3 className="bubble-subtitle-line">Que sea</h3>
              <h1 className="bubble-highlight-girl">Niña!</h1>
            </div>
          )}

          {/* Escena 4: Team Niño */}
          {currentScene.id === 'boy-team' && (
            <div className="scene-content team-bubble-scene team-boy">
              <span className="scene-tag boy-tag">{currentScene.badge}</span>
              <h2 className="bubble-title-line">Y otros que</h2>
              <h1 className="bubble-highlight-boy">Sea un niño</h1>
            </div>
          )}

          {/* Escena 5: Angelito / Ecografía */}
          {currentScene.id === 'angelito' && (
            <div className="scene-content angelito-scene">
              <span className="scene-tag gold-border-tag">
                <Sparkles size={12} className="gold-text" />
                {currentScene.badge}
                <Sparkles size={12} className="gold-text" />
              </span>
              <h2 className="angelito-title">{currentScene.title}</h2>
              <div className="angelito-message-card">
                <h3 className="angelito-parents-names">
                  {CONFIG.parents.mom} & {CONFIG.parents.dad}
                </h3>
                <p className="angelito-voice-text">
                  "{currentScene.text}"
                </p>
                <div className="angelito-sparkle-stars">🤎 ? 💛</div>
              </div>
            </div>
          )}

          {/* Escena 6: Dinámica de Regalos (Exacta de la imagen) */}
          {currentScene.id === 'gifts-team' && (
            <div className="scene-content gifts-exact-scene">
              <span className="scene-tag">Dinámica de Regalos</span>

              <div className="gift-group-block">
                <p className="gift-team-intro">Si crees que es</p>
                <h2 className="bubble-exact-nina">NIÑA</h2>
                <p className="gift-instruction-bold">Puedes traer</p>
                <p className="gift-instruction-sub">pañales 🎀</p>
              </div>

              <div className="gift-exact-divider">
                <span>🧸</span>
              </div>

              <div className="gift-group-block">
                <p className="gift-team-intro">Si crees que es</p>
                <h2 className="bubble-exact-nino">NIÑO</h2>
                <p className="gift-instruction-bold">Kit de higiene</p>
                <p className="gift-instruction-sub">o toallitas húmedas 🧸</p>
              </div>
            </div>
          )}

          {/* Escena 7: Fecha, Granja Pa' que Hugo y Dress Code */}
          {currentScene.id === 'event-details' && (
            <div className="scene-content event-details-scene">
              <span className="scene-tag final-tag">¡Acompáñanos!</span>
              <h2 className="event-location-title">{CONFIG.event.locationName}</h2>
              <p className="event-location-city">{CONFIG.event.locationCity}</p>

              <div className="event-date-card">
                <Calendar size={18} className="gold-icon" />
                <strong>{CONFIG.event.fullDate}</strong>
              </div>

              {/* Botón de Google Maps para Pa' que Hugo */}
              <a 
                href={CONFIG.event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="maps-action-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPin size={17} />
                <span>Ver Ubicación en Google Maps</span>
              </a>

              {/* Código de vestimenta */}
              <div className="dress-code-box">
                <div className="dress-code-header">
                  <Shirt size={16} className="gold-icon" />
                  <strong>Dress Code: Colores Neutros</strong>
                </div>
                <p className="dress-code-desc">
                  Beige, Marrón y Blanco
                </p>
                <div className="color-swatches-row">
                  {CONFIG.dressCode.swatches.map((swatch, i) => (
                    <div key={i} className="swatch-item">
                      <span 
                        className="swatch-circle" 
                        style={{ 
                          backgroundColor: swatch.color,
                          border: swatch.border ? `1px solid ${swatch.border}` : '1px solid rgba(0,0,0,0.1)'
                        }} 
                      />
                      <span className="swatch-name">{swatch.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Escena 8: Confirmación de Asistencia (Exacta de la imagen de Francis) */}
          {currentScene.id === 'rsvp-final' && (
            <div className="scene-content rsvp-exact-scene">
              <h1 className="rsvp-headline-title">Confirma tu asistencia</h1>

              {/* Botón Principal: Confirmar Asistencia por WhatsApp */}
              <div className="rsvp-action-center">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="confirm-whatsapp-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle size={20} />
                  <span>Confirmar vía WhatsApp</span>
                </a>
              </div>

              {/* Texto inferior de la imagen: Te esperamos No faltes */}
              <div className="rsvp-bottom-callout">
                <h2 className="rsvp-esperamos-text">Te esperamos</h2>
                <h3 className="rsvp-nofaltes-text">No faltes</h3>
              </div>

              {/* Acciones secundarias */}
              <div className="final-secondary-actions">
                <button 
                  className="restart-video-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestart();
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Ver Historia Nuevamente</span>
                </button>

                <button 
                  className="view-card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSwitchToScrollMode();
                  }}
                >
                  <span>Modo Tarjeta Completa</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flechas de navegación visuales en los bordes para usuarios en PC */}
      <button 
        className="nav-arrow-btn nav-left" 
        onClick={(e) => {
          e.stopPropagation();
          goToPrevScene();
        }}
        title="Escena anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        className="nav-arrow-btn nav-right" 
        onClick={(e) => {
          e.stopPropagation();
          goToNextScene();
        }}
        title="Siguiente escena"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
