import { checkWinner } from './tictactoeUtils';

export const initialState = {
  view: 'SETUP',
  squares: Array(9).fill(null),
  playerName: 'Guest',
  mode: 'PLAYER_VS_CPU',
  xIsNext: true,
  status: '',
  winner: null,
  winningLine: null,
  scores: { Player: 0, CPU: 0, Ties: 0 },
  isThinking: false
};

export function tictactoeReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        view: 'PLAYING',
        playerName: action.name || 'Guest',
        mode: action.mode,
        squares: Array(9).fill(null),
        winner: null,
        winningLine: null,
        status: action.mode === 'CPU_VS_CPU' ? 'Monte Carlo (X) vs CPU (O)' : `${action.name} (X) goes first!`,
        xIsNext: true
      };

    case 'PLAY_MOVE': {
      if (state.winner || state.squares[action.index]) return state;

      const newSquares = [...state.squares];
      const currentSymbol = state.xIsNext ? 'X' : 'O';
      newSquares[action.index] = currentSymbol;

      const result = checkWinner(newSquares);
      let newStatus = '';
      let newScores = { ...state.scores };

      if (result) {
        if (result.winner === 'Draw') {
          newStatus = "It's a draw!";
          newScores.Ties += 1;
        } else {
          const winnerName = result.winner === 'X' 
            ? (state.mode === 'CPU_VS_CPU' ? 'Monte Carlo' : state.playerName) 
            : 'CPU';
          newStatus = `${winnerName} Wins!`;
          if (result.winner === 'X') newScores.Player += 1;
          else newScores.CPU += 1;
        }
      } else {
        newStatus = `Next: ${!state.xIsNext ? 'X' : 'O'}`;
      }

      return {
        ...state,
        squares: newSquares,
        xIsNext: !state.xIsNext,
        status: newStatus,
        winner: result?.winner || null,
        winningLine: result?.line || null,
        scores: newScores,
        isThinking: false
      };
    }

    case 'SET_THINKING':
      return { ...state, isThinking: action.value };

    case 'RESET_ROUND':
      return {
        ...state,
        squares: Array(9).fill(null),
        winner: null,
        winningLine: null,
        xIsNext: true,
        status: state.mode === 'CPU_VS_CPU' ? 'Monte Carlo (X) vs CPU (O)' : `${state.playerName} (X) goes first!`,
        isThinking: false
      };

    case 'EXIT_TO_SETUP':
      return initialState;

    default:
      return state;
  }
}
