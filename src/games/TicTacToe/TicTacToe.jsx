import { useReducer, useEffect, useCallback, memo } from 'react';
import { useUser } from '../../context/UserContext';
import { monteCarloNextMove, findStrategicMove } from './tictactoeUtils';
import { tictactoeReducer, initialState } from './tictactoeReducer';
import './TicTacToe.css';

const Square = memo(({ value, onClick, index, isWinningSquare, disabled }) => {
  const handleClick = () => onClick(index);
  
  return (
    <button
      className={`square ${isWinningSquare ? 'winning-square' : ''} ${value === 'X' ? 'x-player' : value === 'O' ? 'o-player' : ''}`}
      onClick={handleClick}
      disabled={disabled || !!value}
    >
      {value}
    </button>
  );
});

const TicTacToe = () => {
  const { user } = useUser();
  const [state, dispatch] = useReducer(tictactoeReducer, initialState);

  // Auto-login to the game if user exists in context
  useEffect(() => {
    if (user && state.view === 'SETUP') {
      dispatch({ type: 'START_GAME', name: user.username, mode: 'PLAYER_VS_CPU' });
    }
  }, [user, state.view]);

  const handleStart = (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    dispatch({ type: 'START_GAME', name, mode: 'PLAYER_VS_CPU' });
  };

  const handleMonteCarloStart = () => {
    dispatch({ type: 'START_GAME', name: 'Monte Carlo', mode: 'CPU_VS_CPU' });
  };

  const handleGuestStart = () => {
    dispatch({ type: 'START_GAME', name: 'Guest', mode: 'PLAYER_VS_CPU' });
  };

  // Logic for CPU moves
  useEffect(() => {
    if (state.view !== 'PLAYING' || state.winner) return;

    let timer;
    const isCpuTurn = (state.mode === 'PLAYER_VS_CPU' && !state.xIsNext) || state.mode === 'CPU_VS_CPU';

    if (isCpuTurn) {
      dispatch({ type: 'SET_THINKING', value: true });
      
      timer = setTimeout(() => {
        let move;
        if (state.mode === 'CPU_VS_CPU' && state.xIsNext) {
          move = monteCarloNextMove(state.squares);
        } else {
          move = findStrategicMove(state.squares, state.xIsNext ? 'X' : 'O');
        }
        
        if (move !== undefined) {
          dispatch({ type: 'PLAY_MOVE', index: move });
        }
      }, 600);
    }

    return () => clearTimeout(timer);
  }, [state.view, state.xIsNext, state.winner, state.mode, state.squares]);

  const handleSquareClick = useCallback((idx) => {
    dispatch({ type: 'PLAY_MOVE', index: idx });
  }, []);

  if (state.view === 'SETUP') {
    return (
      <div className="ttt-setup animate-fade-in">
        <div className="glass-panel setup-card">
          <h1 className="title-retro">Tic Tac Toe</h1>
          <p className="subtitle">Choose how you want to play</p>
          
          <div className="setup-options">
            <button className="btn setup-btn glass-panel" onClick={handleGuestStart}>
              🎮 Play as Guest
            </button>
            
            <button className="btn setup-btn glass-panel" onClick={handleMonteCarloStart}>
              🤖 CPU vs CPU (Monte Carlo)
            </button>
            
            <div className="divider"><span>OR</span></div>
            
            <form onSubmit={handleStart} className="setup-form">
              <input name="username" placeholder="Enter your GamerTag" required />
              <button type="submit" className="btn primary-btn">Start Game</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ttt-container animate-fade-in">
      <div className="ttt-header">
        <h1 className="title-retro">Tic Tac Toe</h1>
        <button className="exit-btn" onClick={() => dispatch({ type: 'EXIT_TO_SETUP' })}>← Change Mode</button>
      </div>
      
      <div className="ttt-scores glass-panel">
        <div className="score-box X-score">
          <span>{state.mode === 'CPU_VS_CPU' ? 'Monte Carlo (X)' : `${state.playerName} (X)`}</span>
          <strong>{state.scores.Player}</strong>
        </div>
        <div className="score-box tie-score">
          <span>Ties</span>
          <strong>{state.scores.Ties}</strong>
        </div>
        <div className="score-box O-score">
          <span>CPU (O)</span>
          <strong>{state.scores.CPU}</strong>
        </div>
      </div>
      
      <div className={`status-banner ${state.isThinking ? 'thinking' : ''}`}>
        {state.isThinking ? "CPU is thinking..." : state.status}
      </div>

      <div className="board glass-panel">
        {state.squares.map((value, idx) => (
          <Square
            key={idx}
            value={value}
            onClick={handleSquareClick}
            index={idx}
            isWinningSquare={state.winningLine?.includes(idx)}
            disabled={state.isThinking}
          />
        ))}
      </div>

      <div className="ttt-controls">
        <button className="btn primary-btn glass-panel" onClick={() => dispatch({ type: 'RESET_ROUND' })}>
          New Round
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
