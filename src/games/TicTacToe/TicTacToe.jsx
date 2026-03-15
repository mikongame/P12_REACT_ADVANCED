import { useReducer, useCallback, memo } from 'react';
import './TicTacToe.css';

// 1. Initial State
const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  status: 'Ready to play! X goes first.',
  winner: null,
  winningLine: null,
  scores: { X: 0, O: 0 }
};

// 2. Reducer
function tictactoeReducer(state, action) {
  switch (action.type) {
    case 'PLAY': {
      if (state.winner || state.squares[action.index]) {
        return state;
      }
      const newSquares = [...state.squares];
      newSquares[action.index] = state.xIsNext ? 'X' : 'O';
      
      const { winner, line } = calculateWinner(newSquares);
      let newScores = { ...state.scores };
      let newStatus = `Next player: ${!state.xIsNext ? 'X' : 'O'}`;
      
      if (winner) {
        newStatus = `Winner: ${winner}!`;
        newScores[winner] += 1;
      } else if (!newSquares.includes(null)) {
        newStatus = "It's a draw!";
      }

      return {
        ...state,
        squares: newSquares,
        xIsNext: !state.xIsNext,
        status: newStatus,
        winner,
        winningLine: line,
        scores: newScores
      };
    }
    case 'RESET_GAME': {
      return {
        ...initialState,
        scores: state.scores // keep scores
      };
    }
    case 'RESET_SCORES': {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}

// 3. Helper
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // col
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}

// 4. Memoized Square Component
const Square = memo(({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className={`square ${isWinningSquare ? 'winning-square' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
});

// 5. Main Component
const TicTacToe = () => {
  const [state, dispatch] = useReducer(tictactoeReducer, initialState);

  // useCallback prevents re-creating the function on every render,
  // making React.memo on Square effective.
  const handleSquareClick = useCallback((index) => {
    dispatch({ type: 'PLAY', index });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const handleResetScores = useCallback(() => {
    dispatch({ type: 'RESET_SCORES' });
  }, []);

  return (
    <div className="ttt-container animate-fade-in">
      <h1 className="title-retro">Tic Tac Toe</h1>
      
      <div className="ttt-scores glass-panel">
        <div className="score-box X-score">
          <span>X:</span> {state.scores.X}
        </div>
        <div className="score-box O-score">
          <span>O:</span> {state.scores.O}
        </div>
      </div>
      
      <p className="status-message">{state.status}</p>

      <div className="board glass-panel">
        {state.squares.map((value, idx) => {
          const isWinningSquare = state.winningLine?.includes(idx);
          return (
            <Square
              key={idx}
              value={value}
              onClick={() => handleSquareClick(idx)}
              isWinningSquare={isWinningSquare}
            />
          );
        })}
      </div>

      <div className="ttt-controls">
        <button className="btn primary-btn glass-panel" onClick={handleReset}>
          Play Again
        </button>
        <button className="btn secondary-btn glass-panel" onClick={handleResetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
