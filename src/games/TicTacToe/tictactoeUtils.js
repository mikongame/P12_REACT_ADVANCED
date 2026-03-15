// TicTacToe Game Utilities with Monte Carlo Tree Search

export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const checkWinner = (squares) => {
  for (let i = 0; i < WIN_LINES.length; i++) {
    const [a, b, c] = WIN_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: WIN_LINES[i] };
    }
  }
  return squares.includes(null) ? null : { winner: 'Draw', line: null };
};

export const getAvailableMoves = (squares) =>
  squares.map((v, i) => (v === null ? i : null)).filter((i) => i !== null);

const checkWinnerSim = (squares, player) =>
  WIN_LINES.some(([a, b, c]) => squares[a] === player && squares[b] === player && squares[c] === player);

const simulateGame = (squares, startMove, player) => {
  const tempSquares = [...squares];
  tempSquares[startMove] = player;
  
  let currentPlayer = player === 'montecarlo' ? 'CPU' : 'montecarlo';
  
  while (true) {
    if (checkWinnerSim(tempSquares, 'montecarlo')) return true;
    if (checkWinnerSim(tempSquares, 'CPU')) return false;

    const available = getAvailableMoves(tempSquares);
    if (available.length === 0) return false;

    const move = available[Math.floor(Math.random() * available.length)];
    tempSquares[move] = currentPlayer;
    currentPlayer = currentPlayer === 'montecarlo' ? 'CPU' : 'montecarlo';
  }
};

export const monteCarloNextMove = (squares) => {
  const available = getAvailableMoves(squares);
  if (available.length === 0) return null;

  const results = available.map((pos) => {
    let wins = 0;
    const iterations = 150;
    for (let i = 0; i < iterations; i++) {
      if (simulateGame(squares, pos, 'montecarlo')) wins++;
    }
    return { pos, wins };
  });

  results.sort((a, b) => b.wins - a.wins);
  return results[0].pos;
};

export const findStrategicMove = (squares, player) => {
  for (const [a, b, c] of WIN_LINES) {
    const values = [squares[a], squares[b], squares[c]];
    if (values.filter(v => v === player).length === 2 && values.includes(null)) {
      return [a, b, c].find(i => squares[i] === null);
    }
  }

  const opponent = player === 'X' ? 'O' : 'X';
  for (const [a, b, c] of WIN_LINES) {
    const values = [squares[a], squares[b], squares[c]];
    if (values.filter(v => v === opponent).length === 2 && values.includes(null)) {
      return [a, b, c].find(i => squares[i] === null);
    }
  }

  const weights = [3, 2, 3, 2, 4, 2, 3, 2, 3];
  const available = getAvailableMoves(squares);
  available.sort((a, b) => weights[b] - weights[a]);
  
  return available[0];
};
