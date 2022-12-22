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
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import './App.css';



// test



function App() {


const [searchkey, setSearchkey] = useState("");
const [cartArray, setCartArray] = useState([]);





	return (

      <div className="App">
        <Header
          setSearchkey={setSearchkey}
          cartArray={cartArray}
          setCartArray={setCartArray}
        />
        <Jumbo />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toprated" element={<Toprated />} />
          <Route path="/Upcoming" element={<Upcomming />} />
          <Route path="/Nowplaying" element={<Nowplaying />} />
          <Route
            path="/:movieId"
            element={
              <Movieinfo cartArray={cartArray} setCartArray={setCartArray} />
            }
          />
          <Route
            path="/Search"
            element={<Moviesearch searchkey={searchkey} />}
          />
        </Routes>

        <Footer />
      </div>
   
  );
}

export default App;


	
