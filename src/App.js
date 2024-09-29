// App.js (Add Tailwind classes)
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import NasaImageSearch from "./components/NasaImageSearch";
import Apod from "./components/Apod";
import NeoFeed from "./components/NeoFeed";
import Details from "./components/Details";

import Carousel from "./components/Carousel";

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex flex-col">
        <header className="navbar bg-gradient-to-r from-purple-800 via-indigo-900 to-blue-800 py-6">
          <nav>
            <ul className="nav-links flex justify-center gap-8 text-lg tracking-widest">
              <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                <Link to="/nasa-image-search">NASA Image Search</Link>
              </li>
              <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                <Link to="/apod">Astronomy Picture of the Day</Link>
              </li>
              <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                <Link to="/neo-feed">Neo Feed</Link>
              </li>
              <li className="hover:text-blue-400 transition duration-300 ease-in-out">
                <Link to="/epic">EPIC</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nasa-image-search" element={<NasaImageSearch />} />
            <Route path="/apod" element={<Apod />} />
            <Route path="/neo-feed" element={<NeoFeed />} />
            <Route path="/details" element={<Details />} />
            <Route path="/epic" element={<Carousel />} />
          </Routes>
        </main>

        <footer className="footer py-4 bg-gradient-to-r from-blue-900 to-black text-center text-sm">
          <p className="text-blue-400">
            &copy; 2024 Space Explorer. All rights reserved.
          </p>
          <p>Contact us at <a href="mailto:spaceexplorer@nasa.com" className="text-blue-500 hover:underline">spaceexplorer@nasa.com</a></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
