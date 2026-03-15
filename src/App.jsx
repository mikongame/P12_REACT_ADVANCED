import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import TicTacToe from './games/TicTacToe/TicTacToe';
import RPS from './games/RPS/RPS';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tictactoe" element={<TicTacToe />} />
        <Route path="rps" element={<RPS />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
