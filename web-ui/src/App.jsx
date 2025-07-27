import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/match" element={<MatchPage />} />
        {/* <Routes path="/game" element={<GamePage />} /> */}
        {/* <Routes path="/result" element={<ResultPage />} /> */}
        {/* <Routes path="/loading" element={<LoadingPage />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
