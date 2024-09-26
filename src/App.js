import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home'; 
import NasaImageSearch from './components/NasaImageSearch';
import Apod from './components/Apod';
import NeoFeed from './components/NeoFeed';
import Details from './components/Details';
import './App.css'; 
import Carousel from './components/Carousel';

function App() {
  return (
    <Router>
      <div className="app">
      
        <header className="navbar">
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/nasa-image-search">NASA Image Search</Link></li>
              <li><Link to="/apod">Astronomy Picture of the Day</Link></li>
              <li><Link to="/neo-feed">Neo Feed</Link></li>
              <li><Link to="/epic">EPIC</Link></li>
            </ul>
          </nav>
        </header>

       
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nasa-image-search" element={<NasaImageSearch />} />
            <Route path="/apod" element={<Apod />} />
            <Route path="/neo-feed" element={<NeoFeed />} />
            <Route path="/details" element={<Details />} />
            <Route path="/epic" element={<Carousel />} />
          </Routes>
        </main>

        
        <footer className="footer">
          <p>&copy; 2024 Space Explorer. All rights reserved.</p>
          <p>Contact us at spaceexplorer@nasa.com</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
