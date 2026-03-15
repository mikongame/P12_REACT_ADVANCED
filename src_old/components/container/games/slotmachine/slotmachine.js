import './slotmachine.css';

export function renderSlots(container) {
  container.innerHTML = '';

  const selector = document.createElement('div');
  selector.classList.add('selector-jugador');

  const titulo = document.createElement('p');
  titulo.textContent = '¿Cómo quieres jugar a las tragaperras?';

  const btnInvitado = document.createElement('button');
  btnInvitado.textContent = '🎮 Jugar como invitado';
  btnInvitado.addEventListener('click', () => {
    iniciarSlots(container, 'Invitado', 'invitado');
  });

  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Introduce tu nombre';
  input.required = true;

  const btnSubmit = document.createElement('button');
  btnSubmit.type = 'submit';
  btnSubmit.textContent = '📝 Jugar como jugador';

  form.append(input, btnSubmit);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = input.value.trim() || 'Jugador';
    iniciarSlots(container, nombre, 'jugador');
  });

  selector.append(titulo, btnInvitado, form);
  container.appendChild(selector);
}

function iniciarSlots(container, nombreJugador, modo) {
  const clave = nombreJugador.toLowerCase().replace(/\s+/g, '_');

  let creditos = cargar(`slots_creditos_${clave}`) || 1000;
  let ganancia = cargar(`slots_ganancia_${clave}`) || 0;

  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.classList.add('slots-wrapper');

  const title = document.createElement('h2');
  title.textContent = 'Tragaperras';
  title.classList.add('slots-title');

  const scores = document.createElement('section');
  scores.classList.add('slots-scores');
  scores.innerHTML = `
    <label>Créditos:<input type="text" id="amount" value="${creditos}"></label>
    <label>Ganancia:<input type="text" id="win" disabled value="${ganancia}"></label>
  `;

  const controls = document.createElement('section');
  controls.classList.add('slots-controls');
  controls.innerHTML = `
    <label>Apuesta:
      <select id="bet">
        ${[1,10,20,40,60,100,200,500].map(v => `<option value="${v}">${v}c</option>`).join('')}
      </select>
    </label>
    <button id="spin">🎰 Girar</button>
  `;

  const panel = document.createElement('section');
  panel.classList.add('slots-panel');
  panel.append(scores, controls);

  const display = document.createElement('section');
  display.classList.add('slots-display');
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement('div');
    div.classList.add('slots-reel');
    div.innerHTML = `<img id="reel${i}" src="/img/7.png" alt="reel">`;
    display.appendChild(div);
  }

  const content = document.createElement('div');
  content.classList.add('slots-content');
  content.append(title, panel, display);

  const paytable = document.createElement('section');
  paytable.classList.add('slots-paytable');
  for (let i = 9; i >= 0; i--) {
    const fila = document.createElement('div');
    fila.innerHTML = `
      <img src="/img/${i}.png" alt="${i}">
      <img src="/img/${i}.png" alt="${i}">
      <img src="/img/${i}.png" alt="${i}">
      <span>${getReward([i, i, i])}</span>
    `;
    paytable.appendChild(fila);
  }

  wrapper.append(content, paytable);
  container.appendChild(wrapper);

  const spinButton = wrapper.querySelector('#spin');
  const amountInput = wrapper.querySelector('#amount');
  const winInput = wrapper.querySelector('#win');
  const betSelect = wrapper.querySelector('#bet');

  spinButton.addEventListener('click', () => {
    let amount = parseInt(amountInput.value);
    const bet = parseInt(betSelect.value);
    let wins = parseInt(winInput.value) || 0;

    if (isNaN(amount) || amount < bet) {
      alert('Saldo insuficiente o no válido');
      return;
    }

    const reels = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
    reels.forEach((num, i) => {
      document.getElementById(`reel${i + 1}`).classList.remove('spin');
      void document.getElementById(`reel${i + 1}`).offsetWidth; 
      document.getElementById(`reel${i + 1}`).classList.add('spin');
      document.getElementById(`reel${i + 1}`).src = `/img/${num}.png`;
    });

    const reward = getReward(reels);
    if (reward > 0) {
      const prize = reward * bet;
      wins = prize;
      amount += prize;
    }

    amount -= bet;
    amountInput.value = amount;
    winInput.value = wins;

    if (modo === 'jugador') {
      guardar(`slots_creditos_${clave}`, amount);
      guardar(`slots_ganancia_${clave}`, wins);
    }
  });

  function getReward(reels) {
    const paytable = {
      "0": 1, "1": 2, "2": 3, "3": 5, "4": 10,
      "5": 20, "6": 100, "7": 300, "8": 500, "9": 1000
    };

    const counts = {};
    for (const num of reels) {
      if (num === 9) continue;
      counts[num] = (counts[num] || 0) + 1;
    }

    for (let num in counts) {
      const total = counts[num] + reels.filter(n => n === 9).length;
      if (total >= 3) return paytable[num];
    }

    return reels.every(n => n === 9) ? paytable["9"] : 0;
  }

  function guardar(clave, valor) {
    localStorage.setItem(clave, valor.toString());
  }

  function cargar(clave) {
    return parseInt(localStorage.getItem(clave));
  }
}
