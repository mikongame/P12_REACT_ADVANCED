import { useState, useCallback } from 'react';

const PAYTABLE = {
  "0": 1, "1": 2, "3": 5, "4": 10,
  "5": 20, "6": 100, "7": 300, "8": 500, "9": 1000
};

export function useSlotMachineLogic(initialCredits = 1000) {
  const [credits, setCredits] = useState(initialCredits);
  const [lastWin, setLastWin] = useState(0);
  const [reels, setReels] = useState([7, 7, 7]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [bet, setBet] = useState(1);

  const getReward = (reelsArr) => {
    const counts = {};
    for (const num of reelsArr) {
      if (num === 9) continue;
      counts[num] = (counts[num] || 0) + 1;
    }

    for (let num in counts) {
      const total = counts[num] + reelsArr.filter(n => n === 9).length;
      if (total >= 3) return PAYTABLE[num] || 0;
    }

    return reelsArr.every(n => n === 9) ? PAYTABLE["9"] : 0;
  };

  const spin = useCallback(() => {
    if (isSpinning || credits < bet) return;

    setIsSpinning(true);
    setCredits(prev => prev - bet);
    setLastWin(0);

    const spinInterval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalReels = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ];
      setReels(finalReels);
      
      const multiplier = getReward(finalReels);
      if (multiplier > 0) {
        const prize = multiplier * bet;
        setLastWin(prize);
        setCredits(prev => prev + prize);
      }
      setIsSpinning(false);
    }, 1200);
  }, [credits, bet, isSpinning]);

  return {
    credits,
    reels,
    lastWin,
    isSpinning,
    bet,
    setBet,
    spin
  };
}
