# RTC Proyecto 12: React Avanzado - MikonGames Hub

Este proyecto es una plataforma de mini-juegos desarrollada con **React 19** y **Vite**, centrada en el uso de hooks avanzados, optimización de renderizado y una arquitectura modular y escalable.

## Juegos Disponibles

- **Tic Tac Toe (IA Monte Carlo)**: Implementación avanzada del tres en raya con un motor de búsqueda de árbol de Monte Carlo para la CPU. Incluye modos Jugador vs CPU y CPU vs CPU.
- **PPTLS**: Versión extendida de Piedra, Papel o Tijera (Lagarto y Spock) inspirada en The Big Bang Theory, gestionada mediante lógica desacoplada en Hooks.
- **Vegas Slots**: Simulador de tragaperras con sistema de créditos, apuestas variables y mecánicas de comodines (*wildcards*).

## Lógica de los Motores de Juego

Aunque el proyecto es puramente Frontend, se han desarrollado "motores" de lógica desacoplada para cada juego:

### Motor de IA (Tic Tac Toe)
El juego presenta un duelo entre dos sistemas de inteligencia artificial distintos en su modo "CPU vs CPU":
1. **Monte Carlo Tree Search (MCTS)** (Jugador X): Realiza **150 simulaciones aleatorias** por cada movimiento legal para determinar la posición con mayor probabilidad de victoria a largo plazo.
2. **Lógica Heurística Estratégica** (Jugador O): Un sistema basado en reglas de prioridad que evalúa:
   - Victorias inmediatas (Ataque).
   - Bloqueos críticos (Defensa).
   - Pesos posicionales (Centro > Esquinas > Laterales).

Esta comparativa permite observar la diferencia entre un enfoque estadístico y uno basado en reglas predefinidas.

### Motor de Reglas (PPTLS)
Gestiona una matriz de adyacencia para las **10 condiciones de victoria** únicas del juego (Piedra, Papel, Tijera, Lagarto, Spock), permitiendo una resolución de victorias instantánea y escalable.

### Motor de Probabilidades (Slots)
Implementa un sistema de validación por conteo de símbolos que permite el uso de **Wildcards (Comodines)**. La lógica calcula dinámicamente el multiplicador de recompensa basándose en la rareza del símbolo obtenido.

## Tecnologías y Características Técnicas

### React Avanzado
- **`useReducer`**: Utilizado para la gestión de estados complejos, como el tablero del Tic Tac Toe.
- **`useContext`**: Implementación de un `UserProvider` global para gestionar la sesión del jugador en toda la aplicación, permitiendo que los juegos reconozcan al usuario automáticamente tras el login.
- **Custom Hooks**: Lógica de negocio extraída en hooks reutilizables (`usePPTLSLogic`, `useSlotMachineLogic`) para mantener componentes limpios.
- **Optimización de Renderizado**: Uso estratégico de `React.memo`, `useCallback` y `useMemo` para garantizar que solo los componentes necesarios se vuelvan a renderizar, cumpliendo con los estándares de rendimiento más exigentes.

### Arquitectura y Navegación
- **React Router Dom**: Implementación de un sistema de navegación fluido con Layouts compartidos.
- **Formularios Nativos**: Sistema de Login implementado de forma nativa (sin librerías externas) para demostrar el control total sobre el estado y la validación.

### Estilos
- **CSS Vanilla**: Diseño personalizado con CSS puro.
- **Full Responsive**: Totalmente adaptado a dispositivos móviles, tablets y escritorio.

## Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Construir para producción:
   ```bash
   npm run build
   ```

## Cumplimiento de Requisitos del Proyecto

Este proyecto ha sido diseñado para cumplir y superar los criterios de evaluación de React Avanzado:

- **Full Responsive**: Implementado mediante CSS moderno (Flexbox, Grid) y breakpoints estratégicos en todos los juegos y componentes.
- **Arquitectura y Semántica**: Estructura de carpetas modular por dominios (`/context`, `/hooks`, `/games`) y uso estricto de etiquetas HTML5 semánticas.
- **Navegación**: Sistema de rutas dinámico con `react-router-dom`, incluyendo layouts compartidos y manejo de rutas inexistentes (404).
- **Hooks Avanzados**:
  - `useReducer`: Gestión de estados complejos en el TicTacToe.
  - `useContext`: Implementación de sesión global de usuario.
  - `Custom Hooks`: Lógica de negocio encapsulada en `usePPTLSLogic` y `useSlotMachineLogic`.
- **Optimización de Renderizado**: Uso riguroso de `React.memo`, `useCallback` y `useMemo`. Se ha minimizado el número de renderizados innecesarios, lo cual puede verificarse mediante las React Developer Tools.
- **Formularios Nativos**: Sistema de login desarrollado íntegramente con lógica de React, evitando librerías de terceros para demostrar el control sobre el ciclo de vida de los datos.

---
Proyecto desarrollado para el curso de **Frontend Avanzado con React**.
