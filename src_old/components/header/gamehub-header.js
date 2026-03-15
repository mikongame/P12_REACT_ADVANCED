import './gamehub-header.css';

export function createGameHubHeader() {
  const header = document.createElement('header');
  header.classList.add('gamehub-header');

  const title = document.createElement('h1');
  title.classList.add('gamehub-logo');
  title.textContent = '🎮 Mikon Games Hub';

  const menuToggle = document.createElement('button');
  menuToggle.classList.add('menu-toggle');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  menuToggle.textContent = '☰';

  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  ul.classList.add('gamehub-nav-menu');

  const games = [
    { name: 'Tres en Raya', id: 'tictactoe' },
    { name: 'PPTLS', id: 'pptls' },
    { name: 'Tragaperras', id: 'slots' }
  ];

  games.forEach(({ name, id }) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = name;
    button.classList.add('gamehub-nav-button');
    button.dataset.game = id;
    li.appendChild(button);
    ul.appendChild(li);
  });

  menuToggle.addEventListener('click', () => {
    ul.classList.toggle('show');
  });

  ul.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      ul.classList.remove('show');
    }
  });

  nav.appendChild(ul);
  header.append(title, menuToggle, nav);
  return header;
}
