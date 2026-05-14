import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="home animate-fade-in">
      <header className="home-header">
        <h1 className="title-retro">MikonGames</h1>
        <p className="subtitle">Selecciona un juego. Proyecto final aplicando patrones avanzados de React.</p>
      </header>
      
      <section className="grid-cards games-grid">
        <Link to="/tictactoe" className="game-card glass-panel">
          <div className="game-card-img tictactoe-bg"></div>
          <div className="game-card-content">
            <h2>Tic Tac Toe</h2>
            <p>El clásico tres en raya. Implementado usando <strong>useReducer</strong> para controlar el estado.</p>
            <span className="play-btn">Jugar &rarr;</span>
          </div>
        </Link>
        
        <Link to="/pps" className="game-card glass-panel">
          <div className="game-card-img rps-bg"></div>
          <div className="game-card-content">
            <h2>PPTLS</h2>
            <p>Piedra, Papel, Tijera, Lagarto, Spock. El juego de <strong>The Big Bang Theory</strong> gestionado por custom hooks.</p>
            <span className="play-btn">Jugar &rarr;</span>
          </div>
        </Link>

        <Link to="/slots" className="game-card glass-panel">
          <div className="game-card-img slots-bg"></div>
          <div className="game-card-content">
            <h2>Vegas Slots</h2>
            <p>Tragaperras con sistema de créditos y comodines. Creado con <strong>Hooks personalizados</strong>.</p>
            <span className="play-btn">Tirar &rarr;</span>
          </div>
        </Link>
      </section>

      <section className="tech-stack glass-panel mt-4">
        <h3 className="section-title">Tecnologías Aplicadas</h3>
        <div className="tech-grid">
          <article className="tech-item">
            <span className="tech-icon">⚛️</span>
            <h4>Hooks de React</h4>
            <p>Uso de hooks como useState, useReducer y useEffect.</p>
          </article>
          <article className="tech-item">
            <span className="tech-icon">🎮</span>
            <h4>Lógica separada</h4>
            <p>Separación de las reglas del juego y la IA usando custom hooks y utilidades.</p>
          </article>
          <article className="tech-item">
            <span className="tech-icon">⚡</span>
            <h4>Optimización</h4>
            <p>Uso de memo y useCallback para evitar renderizados innecesarios.</p>
          </article>
          <article className="tech-item">
            <span className="tech-icon">📱</span>
            <h4>Diseño Responsive</h4>
            <p>Interfaz adaptable a móviles, tablets y escritorio.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
