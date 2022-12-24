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







function App() {


const [searchkey, setSearchkey] = useState("");
const [cartArray, setCartArray] = useState([]);
const [scroled, setscroled] = useState(false);





	return (
    <div className="App">
      <Header
        setSearchkey={setSearchkey}
        cartArray={cartArray}
        setCartArray={setCartArray}
        scroled={scroled}
        setscroled={setscroled}
      />
      <Jumbo />
      <Routes>
        <Route path="/" element={<Home setscroled={setscroled} />} />
        <Route
          path="/toprated"
          element={<Toprated setscroled={setscroled} />}
        />
        <Route
          path="/Upcoming"
          element={<Upcomming setscroled={setscroled} />}
        />
        <Route
          path="/Nowplaying"
          element={<Nowplaying setscroled={setscroled} />}
        />
        <Route
          path="/:movieId"
          element={
            <Movieinfo
              cartArray={cartArray}
              setCartArray={setCartArray}
              setscroled={setscroled}
            />
          }
        />
        <Route
          path="/Search"
          element={
            <Moviesearch searchkey={searchkey} setscroled={setscroled} />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;


	
