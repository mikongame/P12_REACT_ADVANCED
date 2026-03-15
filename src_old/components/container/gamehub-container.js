import { renderTicTacToe } from '../container/games/tictactoe/tictactoe.js';
import { renderPPTLS } from '../container/games/pptls/pptls.js';
import { renderSlots } from '../container/games/slotmachine/slotmachine.js';
import './gamehub-container.css';

export function createGameHubContainer() {
  const container = document.createElement('main');
  container.id = 'game-container';
  container.classList.add('gamehub-container');

  const intro = document.createElement('section');
  intro.classList.add('gamehub-intro');

  const title = document.createElement('h2');
  title.textContent = 'Bienvenido a mi Game Hub';

  const description = document.createElement('p');
  description.textContent = 'Aquí puedes jugar a tres minijuegos distintos que pondrán a prueba tu lógica, suerte y astucia. ¡Elige uno desde el menú superior!';

  const gameList = document.createElement('ul');
  gameList.classList.add('gamehub-rules');

  gameList.innerHTML = `
    <li><strong>🧠 Tres en Raya:</strong> Alinea tres fichas y vence a la CPU. Incluye un modo MonteCarlo automático.</li>
    <li><strong>✂️ PPTLS:</strong> Piedra, Papel, Tijeras, Lagarto, Spock. ¡Con rachas, imágenes divertidas y mucha emoción!</li>
    <li><strong>🎰 Tragaperras:</strong> Apuesta créditos y gira para ganar. Usa comodines y tabla de premios. ¡Suerte!</li>
  `;

  const note = document.createElement('p');
  note.classList.add('gamehub-note');
  note.textContent = '📝 Nota: Puedes jugar como invitado o registrar tu nombre para guardar puntuaciones.';

  intro.append(title, description, gameList, note);
  container.appendChild(intro);

  const placeholder = document.createElement('p');
  placeholder.classList.add('gamehub-placeholder');
  placeholder.textContent = 'Selecciona un juego del menú para comenzar';
  container.appendChild(placeholder);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.gamehub-nav-button')) {
      const game = e.target.dataset.game;
      container.innerHTML = '';

      switch (game) {
        case 'tictactoe':
          renderTicTacToe(container);
          break;
        case 'pptls':
          renderPPTLS(container);
          break;
        case 'slots':
          renderSlots(container);
          break;
        default:
          container.textContent = 'Juego no encontrado.';
      }
    }
  });

  return container;
}
