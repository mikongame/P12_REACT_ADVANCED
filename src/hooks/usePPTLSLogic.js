import { useState, useCallback } from 'react';

// Choices for the Big Bang Theory version
export const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

// Rule map: what each choice defeats
export const WIN_RULES = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock']
};

export const CHOICE_ICONS = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
  lizard: '🦎',
  spock: '🖖'
};

export function usePPTLSLogic(initialScores = { player: 0, computer: 0, ties: 0 }) {
  const [scores, setScores] = useState(initialScores);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('Bazinga! Make your move.');
  const [isAnimating, setIsAnimating] = useState(false);

  const playRound = useCallback((choice) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('Ready...');

    // Small delay to simulate "thinking" and allow animations to reset
    setTimeout(() => {
      const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      
      setPlayerChoice(choice);
      setComputerChoice(compChoice);
      setIsAnimating(false);

      if (choice === compChoice) {
        setResult("It's a Tie! Great minds think alike.");
        setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
      } else if (WIN_RULES[choice].includes(compChoice)) {
        setResult(`You Win! ${choice} beats ${compChoice}.`);
        setScores(prev => ({ ...prev, player: prev.player + 1 }));
      } else {
        setResult(`CPU Wins! ${compChoice} beats ${choice}.`);
        setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
    }, 600);
  }, [isAnimating]);

  const resetGame = useCallback(() => {
    setScores(initialScores);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('Bazinga! Make your move.');
  }, [initialScores]);

  return {
    scores,
    playerChoice,
    computerChoice,
    result,
    playRound,
    resetGame,
    choices: CHOICES,
    isAnimating
  };
}
