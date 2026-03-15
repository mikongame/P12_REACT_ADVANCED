import './pptls.css';

export function renderPPTLS(container) {
  container.innerHTML = '';

  const selector = document.createElement('div');
  selector.classList.add('selector-jugador');

  const titulo = document.createElement('p');
  titulo.textContent = '¿Cómo quieres jugar a PPTLS?';

  const btnInvitado = document.createElement('button');
  btnInvitado.textContent = '🎮 Jugar como invitado';
  btnInvitado.addEventListener('click', () => iniciarJuego('Invitado', 'invitado'));

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
    iniciarJuego(nombre, 'jugador');
  });

  selector.append(titulo, btnInvitado, form);
  container.appendChild(selector);

  function iniciarJuego(nombreJugador, modo) {
    const clave = nombreJugador.toLowerCase().replace(/\s+/g, '_');
    let victorias = cargar(`pptls_victorias_${clave}`) || 0;
    let racha = cargar(`pptls_racha_${clave}`) || 0;

    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.classList.add('pptls-wrapper');

    const title = document.createElement('h2');
    title.textContent = 'Piedra, Papel, Tijeras, Lagarto, Spock';

    const resultado = document.createElement('div');
    resultado.classList.add('pptls-resultado');
    resultado.setAttribute('role', 'status');
    resultado.setAttribute('aria-live', 'polite');
    resultado.textContent = 'Elige una opción para empezar';

    const marcador = document.createElement('div');
    marcador.classList.add('pptls-marcador');

    const jugador = document.createElement('p');
    jugador.innerHTML = `👤 ${nombreJugador}: <span id="playerChoice">-</span>`;

    const cpu = document.createElement('p');
    cpu.innerHTML = `🖥️ CPU: <span id="computerChoice">-</span>`;

    const rachaEl = document.createElement('p');
    rachaEl.id = 'racha';
    rachaEl.textContent = `Racha de victorias: ${racha}`;

    marcador.append(jugador, cpu, rachaEl);

    const botones = document.createElement('div');
    botones.classList.add('pptls-buttons');

    const opciones = ['piedra', 'papel', 'tijeras', 'lagarto', 'spock'];
    opciones.forEach(op => {
      const boton = document.createElement('button');
      boton.dataset.choice = op;
      boton.innerHTML = `<img src="/img/${op}.png" alt="${op}">`;
      botones.appendChild(boton);
    });

    const reiniciar = document.createElement('button');
    reiniciar.classList.add('pptls-reiniciar');
    reiniciar.textContent = '🔄 Reiniciar';

    wrapper.append(title, marcador, resultado, botones, reiniciar);
    container.appendChild(wrapper);

    const rules = {
      piedra: ['tijeras', 'lagarto'],
      papel: ['piedra', 'spock'],
      tijeras: ['papel', 'lagarto'],
      lagarto: ['spock', 'papel'],
      spock: ['tijeras', 'piedra']
    };

    const choices = Object.keys(rules);
    const playerChoiceEl = wrapper.querySelector('#playerChoice');
    const computerChoiceEl = wrapper.querySelector('#computerChoice');
    const outcomeEl = resultado;

    wrapper.querySelectorAll('.pptls-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        playerChoiceEl.textContent = capitalize(playerChoice);
        computerChoiceEl.textContent = capitalize(computerChoice);

        if (playerChoice === computerChoice) {
          outcomeEl.textContent = "¡Empate!";
        } else if (rules[playerChoice].includes(computerChoice)) {
          outcomeEl.textContent = `✅ Ganaste: ${capitalize(playerChoice)} vence a ${capitalize(computerChoice)}.`;
          racha++;
          victorias++;
        } else {
          outcomeEl.textContent = `❌ Perdiste: ${capitalize(computerChoice)} vence a ${capitalize(playerChoice)}.`;
          racha = 0;
        }

        wrapper.querySelector('#racha').textContent = `Racha de victorias: ${racha}`;

        if (modo === 'jugador') {
          guardar(`pptls_victorias_${clave}`, victorias);
          guardar(`pptls_racha_${clave}`, racha);
        }
      });
    });

    reiniciar.addEventListener('click', () => {
      playerChoiceEl.textContent = "-";
      computerChoiceEl.textContent = "-";
      outcomeEl.textContent = "Elige una opción para empezar";
    });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function guardar(clave, valor) {
    localStorage.setItem(clave, valor.toString());
  }

  function cargar(clave) {
    return parseInt(localStorage.getItem(clave));
  }
}
