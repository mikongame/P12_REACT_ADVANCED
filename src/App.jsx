import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import TicTacToe from './games/TicTacToe/TicTacToe';
import PPTLS from './games/PPTLS/PPTLS';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="tictactoe" element={<TicTacToe />} />
        <Route path="pps" element={<PPTLS />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
