// src/App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginRegister from './pages/LoginRegister';
import Home from './pages/Home';
import BreedingStock from './pages/BreedingStock';
import Menu from './components/Menu';
import BreedingStockCard from './pages/BreedingStockCard';
import BullsOwn from './pages/BullsOwn';
import BullsOwnCard from './pages/BullsOwnCard';
import BullsForeing from './pages/BullsForeing';
import BullsForeingCard from './pages/BullsForeingCard';

// Компонент для условного рендеринга Menu
const ConditionalMenu = () => {
  const location = useLocation();
  // Показываем Menu только если маршрут не '/'
  return location.pathname !== '/' ? <Menu /> : null;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ConditionalMenu />
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/home" element={<Home />} />
          <Route path="/breedingStock" element={<BreedingStock />} />
          <Route path="/breedingStockCard" element={<BreedingStockCard />} />
          <Route path="/bullsOwn" element={<BullsOwn />} />
          <Route path="/bullsOwnCard" element={<BullsOwnCard />} />
          <Route path="/bullsForeing" element={<BullsForeing />} />
          <Route path="/bullsForeingCard" element={<BullsForeingCard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
