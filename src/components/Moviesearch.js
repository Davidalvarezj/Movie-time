import React from 'react'
import { APIsearch } from "../features/APIget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";






const Moviesearch = ({ searchkey }) => {

const [movies, setMovies] = useState([]);
const [serchedmovies, setSerchedmovies] = useState([]);

useEffect(() => {
    async function fetch() {
		const {results: data} = await APIsearch(searchkey);
		setMovies(data);
    }
    fetch();
	console.log("Movie Search:", searchkey);
	console.log("Movie Search:", movies);
}, [searchkey]);




  return (
    <div className="home-content">
      <h3 className="text-white mb-5 pb-5"> Movie search: {searchkey}</h3>
      <div className="container mt-3">
        <div className="row">
          {movies.map((elm) => (
            <div
              key={elm.id}
              className="col-md-3 col-6 col-lg-2 mb-3 pb-0 moviecard"
            >
              <Link to={`/${elm.id}`}>
                <img
                  src={`${IMAGE_PATH + elm.poster_path}`}
                  alt={elm.title}
                  height={300}
                  width="100%"
                  className="imgmovie"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


};

export default Moviesearch