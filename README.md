# RTC Proyecto 12: React Avanzado - MikonGames Hub

Este proyecto es una plataforma de mini-juegos desarrollada con **React 19** y **Vite**, centrada en el uso de hooks avanzados, optimización de renderizado y una arquitectura modular y escalable.

## Juegos Disponibles

- **Tic Tac Toe (IA Monte Carlo)**: Implementación avanzada del tres en raya con un motor de búsqueda de árbol de Monte Carlo para la CPU. Incluye modos Jugador vs CPU y CPU vs CPU.
- **PPTLS**: Versión extendida de Piedra, Papel o Tijera (Lagarto y Spock) inspirada en The Big Bang Theory, gestionada mediante lógica desacoplada en Hooks.
- **Vegas Slots**: Simulador de tragaperras con sistema de créditos, apuestas variables y mecánicas de comodines (*wildcards*).

## Tecnologías y Características Técnicas

### React Avanzado
- **`useReducer`**: Utilizado para la gestión de estados complejos, como el tablero del Tic Tac Toe y el sistema de validación de formularios nativos.
- **Custom Hooks**: Lógica de negocio extraída en hooks reutilizables (`usePPTLSLogic`, `useSlotMachineLogic`) para mantener componentes limpios.
- **Optimización de Renderizado**: Uso estratégico de `React.memo`, `useCallback` y `useMemo` para garantizar que solo los componentes necesarios se vuelvan a renderizar, cumpliendo con los estándares de rendimiento más exigentes.

### Arquitectura y Navegación
- **React Router Dom**: Implementación de un sistema de navegación fluido con Layouts compartidos.
- **Formularios Nativos**: Sistema de Login implementado de forma nativa (sin librerías externas) para demostrar el control total sobre el estado y la validación.

### Estética Premium
- **CSS Vanilla**: Diseño moderno con efectos de glassmorphism, gradientes vibrantes y animaciones fluidas para una experiencia de usuario premium.
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

---
Proyecto desarrollado para el curso de **Frontend Avanzado con React**.
