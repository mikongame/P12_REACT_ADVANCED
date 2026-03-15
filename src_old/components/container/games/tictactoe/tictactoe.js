import './tictactoe.css';

export function renderTicTacToe(container) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('tictactoe-wrapper');

  const title = document.createElement('h2');
  title.textContent = 'Juego de 3 en raya';

  const marcador = document.createElement('div');
  marcador.classList.add('tictactoe-marcador');
  marcador.setAttribute('role', 'status');
  marcador.setAttribute('aria-live', 'polite');
  marcador.setAttribute('aria-label', 'Marcador del juego');

  const tablero = document.createElement('section');
  tablero.classList.add('tictactoe-tablero');
  tablero.setAttribute('role', 'grid');
  tablero.setAttribute('aria-label', 'Tablero de 3 en raya');

  const botones = [];
  for (let i = 0; i < 9; i++) {
    const boton = document.createElement('button');
    boton.setAttribute('role', 'gridcell');
    boton.setAttribute('aria-label', `Casilla ${i + 1}`);
    tablero.appendChild(boton);
    botones.push(boton);
  }

  const botonReiniciar = document.createElement('button');
  botonReiniciar.classList.add('tictactoe-reiniciar');
  botonReiniciar.setAttribute('aria-label', 'Reiniciar partida');
  botonReiniciar.textContent = '🔄 Reiniciar partida';

  wrapper.append(title, marcador, tablero, botonReiniciar);
  container.appendChild(wrapper);

  let estadoTablero = new Array(9).fill(null);
  let nombreJugador;
  let victoriasJugador = 0;
  let victoriasCPU = 0;
  let esMonteCarlo = false;
  let partidasMonteCarlo = 0;
  let esperandoIA = false;

  const pedirNombre = () => {
    container.innerHTML = '';

    const selector = document.createElement('div');
    selector.classList.add('selector-jugador');

    const titulo = document.createElement('p');
    titulo.textContent = '¿Cómo quieres jugar?';
    selector.appendChild(titulo);

    const btnInvitado = document.createElement('button');
    btnInvitado.textContent = '🎮 Jugar como invitado';
    btnInvitado.addEventListener('click', () => {
      nombreJugador = 'Invitado';
      esMonteCarlo = false;
      iniciarPartida();
    });

    const btnMonteCarlo = document.createElement('button');
    btnMonteCarlo.textContent = '🤖 Usar MonteCarlo';
    btnMonteCarlo.addEventListener('click', () => {
      nombreJugador = 'MonteCarlo';
      esMonteCarlo = true;
      iniciarPartida();
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
      nombreJugador = input.value.trim() || 'Tú';
      esMonteCarlo = false;
      iniciarPartida();
    });

    selector.append(btnInvitado, btnMonteCarlo, form);
    container.appendChild(selector);
  };

  const iniciarPartida = () => {
    partidasMonteCarlo = 0;
    container.innerHTML = '';
    container.appendChild(wrapper);
    actualizarMarcador();
    reiniciarJuego();
    if (esMonteCarlo) setTimeout(turnoMonteCarlo, 500);
  };

  const manejarClick = (evento, indice) => {
    if (esperandoIA || esMonteCarlo || estadoTablero[indice] || verificarGanador()) return;

    esperandoIA = true;

    estadoTablero[indice] = nombreJugador;
    evento.target.textContent = 'X';
    evento.target.style.backgroundColor = '#5A9BD5';
    evento.target.disabled = true;

    if (verificarGanador()) return setTimeout(() => {
      anunciarGanador(nombreJugador);
      esperandoIA = false;
    }, 100);

    if (estadoTablero.every(c => c)) return setTimeout(() => {
      anunciarEmpate();
      esperandoIA = false;
    }, 100);

    setTimeout(() => turnoCPU(), 400);
  };

  const turnoCPU = () => {
    const libres = obtenerLibres();
    if (!libres.length) return;

    const puntuacion = [3, 2, 3, 2, 4, 2, 3, 2, 3];

    const jugadaGanadora = encontrarJugadaGanadora('CPU');
    if (jugadaGanadora !== null) return jugarCPUEn(jugadaGanadora);

    const jugadaBloqueo = encontrarJugadaGanadora(nombreJugador);
    if (jugadaBloqueo !== null) return jugarCPUEn(jugadaBloqueo);

    const mejor = libres
      .map(i => ({ i, score: puntuacion[i] }))
      .sort((a, b) => b.score - a.score)[0].i;

    jugarCPUEn(mejor);
  };

  const jugarCPUEn = (i) => {
    estadoTablero[i] = 'CPU';
    botones[i].textContent = 'O';
    botones[i].style.backgroundColor = '#EA711B';
    botones[i].disabled = true;

    if (verificarGanador()) return setTimeout(() => {
      anunciarGanador('CPU');
      esperandoIA = false;
    }, 100);

    if (estadoTablero.every(c => c)) return setTimeout(() => {
      anunciarEmpate();
      esperandoIA = false;
    }, 100);

    if (esMonteCarlo) {
      setTimeout(turnoMonteCarlo, 400);
    } else {
      esperandoIA = false;
    }
  };

  const turnoMonteCarlo = () => {
    esperandoIA = true;
    const libres = obtenerLibres();
    if (!libres.length) return;

    const mejor = monteCarloTreeSearch(estadoTablero, 'montecarlo');
    estadoTablero[mejor] = 'montecarlo';
    botones[mejor].textContent = 'X';
    botones[mejor].style.backgroundColor = '#5A9BD5';
    botones[mejor].disabled = true;

    if (verificarGanador()) return setTimeout(() => {
      anunciarGanador('montecarlo');
      esperandoIA = false;
    }, 100);

    if (estadoTablero.every(c => c)) return setTimeout(() => {
      anunciarEmpate();
      esperandoIA = false;
    }, 100);

    setTimeout(() => {
      turnoCPU();
      esperandoIA = false;
    }, 400);
  };

  const monteCarloTreeSearch = (estado, jugador) => {
    const libres = obtenerLibres(estado);
    const resultados = libres.map(pos => {
      let victorias = 0;
      for (let i = 0; i < 100; i++) {
        if (simularPartida(estado, pos, jugador)) victorias++;
      }
      return { pos, victorias };
    });
    resultados.sort((a, b) => b.victorias - a.victorias);
    return resultados[0].pos;
  };

  const simularPartida = (estadoOriginal, inicio, jugadorInicial) => {
    const estado = [...estadoOriginal];
    estado[inicio] = jugadorInicial;
    let turno = jugadorInicial === 'montecarlo' ? 'CPU' : 'montecarlo';
    while (true) {
      const libres = obtenerLibres(estado);
      if (!libres.length) return false;
      const mov = libres[Math.floor(Math.random() * libres.length)];
      estado[mov] = turno;
      if (combinacionGanadoraSimulada(estado, turno)) return turno === 'montecarlo';
      turno = turno === 'montecarlo' ? 'CPU' : 'montecarlo';
    }
  };

  const obtenerLibres = (estado = estadoTablero) =>
    estado.map((v, i) => v === null ? i : null).filter(i => i !== null);

  const combinacionGanadoraSimulada = (estado, jugador) =>
    [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    .some(([a,b,c]) => estado[a] === jugador && estado[b] === jugador && estado[c] === jugador);

  const encontrarJugadaGanadora = (jugador) =>
    [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    .find(([a,b,c]) => {
      const valores = [estadoTablero[a], estadoTablero[b], estadoTablero[c]];
      return valores.filter(v => v === jugador).length === 2 && valores.includes(null);
    })?.find(i => estadoTablero[i] === null) ?? null;

  const verificarGanador = () =>
    [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    .some(([a,b,c]) => estadoTablero[a] && estadoTablero[a] === estadoTablero[b] && estadoTablero[a] === estadoTablero[c]);

  const anunciarGanador = (ganador) => {
    botones.forEach(b => b.disabled = true);
    alert(`¡${ganador} ha ganado!`);
    if (ganador === nombreJugador) victoriasJugador++;
    else victoriasCPU++;
    if (esMonteCarlo) partidasMonteCarlo++;
    actualizarMarcador();
    if (esMonteCarlo && partidasMonteCarlo >= 3) {
      alert('Monte Carlo ha jugado 3 partidas. ¿Quieres tomar el relevo?');
      pedirNombre();
    } else {
      reiniciarJuego();
      if (esMonteCarlo) setTimeout(turnoMonteCarlo, 500);
    }
  };

  const anunciarEmpate = () => {
    botones.forEach(b => b.disabled = true);
    alert('¡Empate!');
    if (esMonteCarlo) partidasMonteCarlo++;
    actualizarMarcador();
    if (esMonteCarlo && partidasMonteCarlo >= 3) {
      alert('Monte Carlo ha jugado 3 partidas. ¿Quieres tomar el relevo?');
      pedirNombre();
    } else {
      reiniciarJuego();
      if (esMonteCarlo) setTimeout(turnoMonteCarlo, 500);
    }
  };

  const reiniciarJuego = () => {
    estadoTablero = new Array(9).fill(null);
    botones.forEach(btn => {
      btn.disabled = false;
      btn.textContent = '';
      btn.style.backgroundColor = '';
    });
  };

  const actualizarMarcador = () => {
    marcador.textContent = `${nombreJugador}: ${victoriasJugador} | CPU: ${victoriasCPU}`;
  };

  botones.forEach((btn, i) => btn.addEventListener('click', e => manejarClick(e, i)));
  botonReiniciar.addEventListener('click', pedirNombre);

  pedirNombre();
}
