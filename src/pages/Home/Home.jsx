import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home animate-fade-in">
      <header className="home-header">
        <h1 className="title-retro">Welcome to MikonGames</h1>
        <p className="subtitle">Select a game to start playing. Built with Advanced React patterns.</p>
      </header>
      
      <div className="grid-cards games-grid">
        <Link to="/tictactoe" className="game-card glass-panel">
          <div className="game-card-img tictactoe-bg"></div>
          <div className="game-card-content">
            <h2>Tic Tac Toe</h2>
            <p>A classic game of X and O. Implemented using <strong>useReducer</strong> for precise state management.</p>
            <span className="play-btn">Play Now &rarr;</span>
          </div>
        </Link>
        
        <Link to="/pps" className="game-card glass-panel">
          <div className="game-card-img rps-bg"></div>
          <div className="game-card-content">
            <h2>PPTLS</h2>
            <p>Piedra, Papel, Tijera, Lagarto, Spock. El juego definitivo de <strong>The Big Bang Theory</strong> gestionado por hooks personalizados.</p>
            <span className="play-btn">Play Now &rarr;</span>
          </div>
        </Link>

        <Link to="/slots" className="game-card glass-panel">
          <div className="game-card-img slots-bg"></div>
          <div className="game-card-content">
            <h2>Vegas Slots</h2>
            <p>Prueba tu suerte en la tragaperras. Sistema de créditos y comodines implementado con **Custom Hooks** personalizados.</p>
            <span className="play-btn">Spin to Win &rarr;</span>
          </div>
        </Link>
      </div>

      <div className="tech-stack glass-panel mt-4">
        <h3 className="section-title">Mikon Engine Architecture</h3>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <h4>Advanced React 19</h4>
            <p>State logic driven by the latest standards of the React ecosystem.</p>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🎮</span>
            <h4>High-End Game Logic</h4>
            <p>Custom-built engines for AI simulations and game rules.</p>
          </div>
          <div className="tech-item">
            <span className="tech-icon">⚡</span>
            <h4>Optimal Performance</h4>
            <p>Strict memoization patterns for lightning-fast interactions.</p>
          </div>
          <div className="tech-item">
            <span className="tech-icon">📱</span>
            <h4>Responsive Design</h4>
            <p>A unified experience across all device formats.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
