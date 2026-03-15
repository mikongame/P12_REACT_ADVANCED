import { useState, useCallback } from 'react';

const CHOICES = ['rock', 'paper', 'scissors'];

const WIN_MAP = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

export function useRPSLogic(initialScores = { player: 0, computer: 0, ties: 0 }) {
  const [scores, setScores] = useState(initialScores);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('Make your move to start!');

  const playRound = useCallback((choice) => {
    const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    
    setPlayerChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("It's a Tie!");
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    } else if (WIN_MAP[choice] === compChoice) {
      setResult('You Win! 🎉');
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('Computer Wins! 😭');
      setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  }, []);

  const resetGame = useCallback(() => {
    setScores(initialScores);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('Make your move to start!');
  }, [initialScores]);

  return {
    scores,
    playerChoice,
    computerChoice,
    result,
    playRound,
    resetGame,
    choices: CHOICES
  };
}
