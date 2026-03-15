import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="navbar glass-panel">
        <Link to="/" className="logo">
          <span className="title-retro">Mikon</span>Games
        </Link>
        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Hub</Link>
          <Link to="/tictactoe" className={location.pathname === '/tictactoe' ? 'active' : ''}>Tic Tac Toe</Link>
          <Link to="/rps" className={location.pathname === '/rps' ? 'active' : ''}>Rock Paper Scissors</Link>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer glass-panel">
        <p>&copy; {new Date().getFullYear()} MikonGames - Advanced React Projects</p>
      </footer>
    </div>
  );
};

export default Layout;
