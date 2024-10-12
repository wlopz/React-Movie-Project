// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import Query from './pages/Movies'; // Make sure the path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Query />} /> {/* Ensure this route exists */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
