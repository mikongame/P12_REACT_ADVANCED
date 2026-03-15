import { memo } from 'react';
import { useRPSLogic } from '../../hooks/useRPSLogic';
import './RPS.css';

const ICONS = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

// Memoized choice button to avoid re-renders if the main component state updates with result
const ChoiceButton = memo(({ choice, onClick, disabled }) => {
  return (
    <button 
      className={`choice-btn glass-panel ${disabled ? 'disabled' : ''}`} 
      onClick={() => onClick(choice)}
      disabled={disabled}
      aria-label={`Choose ${choice}`}
    >
      <span className="choice-icon">{ICONS[choice]}</span>
      <span className="choice-name">{choice}</span>
    </button>
  );
});

const RPS = () => {
  const {
    scores,
    playerChoice,
    computerChoice,
    result,
    playRound,
    resetGame,
    choices
  } = useRPSLogic({ player: 0, computer: 0, ties: 0 });

  return (
    <div className="rps-container animate-fade-in">
      <h1 className="title-retro">Rock Paper Scissors</h1>
      
      <div className="rps-scores glass-panel">
        <div className="score-box player-score">
          <span>Player</span>
          <strong>{scores.player}</strong>
        </div>
        <div className="score-box tie-score">
          <span>Ties</span>
          <strong>{scores.ties}</strong>
        </div>
        <div className="score-box comp-score">
          <span>Computer</span>
          <strong>{scores.computer}</strong>
        </div>
      </div>

      <div className="rps-arena">
        <div className="player-side">
          <h3>You</h3>
          <div className={`choice-display ${playerChoice ? 'active' : ''}`}>
            {playerChoice ? ICONS[playerChoice] : '❓'}
          </div>
        </div>
        
        <div className="vs-badge">VS</div>
        
        <div className="computer-side">
          <h3>Computer</h3>
          <div className={`choice-display ${computerChoice ? 'active' : ''}`}>
            {computerChoice ? ICONS[computerChoice] : '❓'}
          </div>
        </div>
      </div>
      
      <div className="result-banner glass-panel">
        <h2>{result}</h2>
      </div>

      <div className="rps-controls">
        {choices.map(choice => (
          <ChoiceButton 
            key={choice} 
            choice={choice} 
            onClick={playRound} 
          />
        ))}
      </div>

      <button className="reset-btn btn glass-panel" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default RPS;
