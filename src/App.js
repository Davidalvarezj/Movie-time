import React from "react";
import Header from './components/Header'
import Jumbo from "./components/Jumbo";
import Home from "./components/Home";
import Toprated from "./components/Toprated";
import Upcomming from "./components/Upcomming";
import Nowplaying from "./components/Nowplaying";
import Movieinfo from "./components/Movieinfo";
import Moviesearch from "./components/Moviesearch";
import Footer from "./components/Footer";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIsearch } from "./features/APIget";
import './App.css';







function App() {


const [searchkey, setSearchkey] = useState("");





	return (
    <div className="App">
      <Header setSearchkey={setSearchkey} />
      <Jumbo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toprated" element={<Toprated />} />
        <Route path="/Upcoming" element={<Upcomming />} />
        <Route path="/Nowplaying" element={<Nowplaying />} />
        <Route path="/:movieId" element={<Movieinfo />} />
        <Route path="/Search" element={<Moviesearch searchkey={searchkey} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;


	
