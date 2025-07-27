import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchWaitingPage';
import { UserProvider } from './context/UserContext';

import MenuPage from "./pages/MenuPage"

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matchWaiting" element={<MatchPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
