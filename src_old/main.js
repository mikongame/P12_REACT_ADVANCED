import './style/gamehub-style.css';
import { createGameHubHeader } from './components/header/gamehub-header.js';
import { createGameHubContainer } from './components/container/gamehub-container.js';
import { createGameHubFooter } from './components/footer/gamehub-footer.js';

const app = document.querySelector('#app');

app.append(
  createGameHubHeader(),
  createGameHubContainer(),
  createGameHubFooter()
);
