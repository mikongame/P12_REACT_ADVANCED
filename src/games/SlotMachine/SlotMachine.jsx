import { useSlotMachineLogic } from '../../hooks/useSlotMachineLogic';
import './SlotMachine.css';

const SlotMachine = () => {
  const {
    credits,
    reels,
    lastWin,
    isSpinning,
    bet,
    setBet,
    spin
  } = useSlotMachineLogic();

  return (
    <div className="slots-container animate-fade-in">
      <h1 className="title-retro">Vegas Reels</h1>
      
      <div className="slots-dashboard glass-panel">
        <div className="dashboard-metric">
          <span>Credits</span>
          <div className="metric-value">{credits}</div>
        </div>
        <div className="dashboard-metric">
          <span>Last Win</span>
          <div className="metric-value win-glow">{lastWin > 0 ? `+${lastWin}` : lastWin}</div>
        </div>
        
        <div className="dashboard-controls">
          <label>Bet Amount</label>
          <select 
            value={bet} 
            onChange={(e) => setBet(Number(e.target.value))}
            disabled={isSpinning}
            className="glass-panel"
          >
            {[1, 10, 20, 50, 100, 200, 500].map(v => (
              <option key={v} value={v}>{v}c</option>
            ))}
          </select>
        </div>
      </div>

      <div className="slots-machine glass-panel">
        <div className="machine-reels">
          {reels.map((symbol, idx) => (
            <div key={idx} className={`reel-slot ${isSpinning ? 'spinning' : ''}`}>
              <img src={`/img/${symbol}.png`} alt={`Symbol ${symbol}`} />
            </div>
          ))}
        </div>
        
        <button 
          className={`spin-btn ${isSpinning ? 'disabled' : ''}`} 
          onClick={spin}
          disabled={isSpinning || credits < bet}
        >
          {isSpinning ? 'SPINNING...' : '🎰 SPIN'}
        </button>
      </div>

      <div className="paytable-summary glass-panel">
        <h3>Paytable (3 of a kind)</h3>
        <div className="paytable-grid">
          {[9, 8, 7, 4].map(num => (
            <div key={num} className="pay-row">
              <img src={`/img/${num}.png`} alt={num} />
              <span>x3 = {num === 9 ? 1000 : num === 8 ? 500 : num === 7 ? 300 : 10}c</span>
            </div>
          ))}
        </div>
        <p className="hint">* 7 is wild (replaces others) in this version!</p>
      </div>
    </div>
  );
};

export default SlotMachine;
