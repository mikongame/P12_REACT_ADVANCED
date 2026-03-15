import { memo } from 'react';
import { usePPTLSLogic, CHOICE_ICONS } from '../../hooks/usePPTLSLogic';
import './PPTLS.css';

const ChoiceButton = memo(({ choice, onClick, disabled }) => {
  const handleClick = () => onClick(choice);
  
  return (
    <button 
      className={`choice-btn glass-panel ${disabled ? 'disabled' : ''}`} 
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="choice-icon">{CHOICE_ICONS[choice]}</span>
      <span className="choice-name">{choice}</span>
    </button>
  );
});

const PPTLS = () => {
  const {
    scores,
    playerChoice,
    computerChoice,
    result,
    playRound,
    resetGame,
    choices,
    isAnimating
  } = usePPTLSLogic();

  return (
    <div className="pptls-container animate-fade-in">
      <div className="pptls-header">
        <h1 className="title-retro">PPTLS</h1>
        <p className="subtitle">Rock - Paper - Scissors - Lizard - Spock</p>
      </div>
      
      <div className="pptls-scores glass-panel">
        <div className="score-box player-score">
          <span>You</span>
          <strong>{scores.player}</strong>
        </div>
        <div className="score-box tie-score">
          <span>Ties</span>
          <strong>{scores.ties}</strong>
        </div>
        <div className="score-box comp-score">
          <span>CPU</span>
          <strong>{scores.computer}</strong>
        </div>
      </div>

      <div className="pptls-arena">
        <div className={`arena-side player-side ${isAnimating ? 'shaking' : ''}`}>
          <h3>YOU</h3>
          <div className={`choice-display ${playerChoice ? 'active' : ''}`}>
            {playerChoice ? CHOICE_ICONS[playerChoice] : '❓'}
          </div>
        </div>
        
        <div className="vs-badge">VS</div>
        
        <div className={`arena-side computer-side ${isAnimating ? 'shaking' : ''}`}>
          <h3>CPU</h3>
          <div className={`choice-display ${computerChoice ? 'active' : ''}`}>
            {computerChoice ? CHOICE_ICONS[computerChoice] : '❓'}
          </div>
        </div>
      </div>
      
      <div className="result-banner glass-panel">
        <h2 className={isAnimating ? 'pulse' : ''}>{isAnimating ? 'Bazinga...' : result}</h2>
      </div>

      <div className="pptls-controls">
        {choices.map(choice => (
          <ChoiceButton 
            key={choice} 
            choice={choice} 
            onClick={playRound} 
            disabled={isAnimating}
          />
        ))}
      </div>

      <button className="reset-btn btn glass-panel" onClick={resetGame}>
        Reset Score
      </button>

      <div className="rules-hint glass-panel">
        <p><strong>Rules:</strong> Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.</p>
      </div>
    </div>
  );
};

export default PPTLS;
