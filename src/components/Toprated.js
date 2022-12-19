import React from 'react'
import { useEffect, useState } from "react";
import {APIlist} from '../features/APIget'
import { Link } from "react-router-dom";
import "./Toprated.css";





const Toprated = () => {
const [movies, setMovies] = useState([]);
const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";
let data = [];


  useEffect(() => {
    async function fetch() {
      data = await APIlist("top_rated", 1);
      setMovies(data);
    }
    fetch();

    setTimeout(async () => {
      const data2 = await APIlist("top_rated", 2);
      setMovies([...data, ...data2]);
      
    }, 2000);
  }, []);


	return (
    <div className="home-content">
      <h3 className="text-white mb-5 pb-5"><i className="fa fa-list-ol"></i> Top Rated </h3>
      <div className="container mt-3">
        <div className="row">
          {movies.map((elm) => (
            <div key={elm.id} className="col-md-3 col-6 col-lg-2 mb-3 pb-0 moviecard">
              <Link to={`/${elm.id}`}>
                <img
                  src={`${IMAGE_PATH + elm.poster_path}`}
                  alt={elm.title}
                  height={300}
                  width="100%"
                  className="imgmovie"
                />
              </Link>
              <div className="rank text-white">
                <p className="m-0 p-0 ">
                  <small>{elm.vote_average}</small>{" "}
                </p>
                <i className="fa fa-thumbs-o-up"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Toprated