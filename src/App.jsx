// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import Query from './pages/Movies';
import MovieInfo from './pages/MovieInfo';
import { Helmet } from 'react-helmet';

function App() {
  // Log when App component is rendered
  // console.log("App component rendered"); 

  return (
    <Router>
      <Helmet>
        <title>Flixster - Find your next favorite movie!</title>
      </Helmet>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Query />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
