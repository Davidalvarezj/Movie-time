import React from 'react'
import { APIsearch } from "../features/APIget";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";






const Moviesearch = ({ searchkey }) => {

const [movies, setMovies] = useState([]);
      const [onHover, setonHover] = useState([]); 
const [serchedmovies, setSerchedmovies] = useState([]);

useEffect(() => {
    async function fetch() {
		const {results: data} = await APIsearch(searchkey);
		setMovies(data);
    }
    fetch();
}, [searchkey]);

      const mouseHover = (id, index) => {
        const newHoverState = [];
        newHoverState[index] = true;
        setonHover(newHoverState);
      };

      const mouseLeave = (id, index) => {

        setonHover([]);
      };


  return (
    <div className="home-content">
      <h3 className="text-white mb-5 pb-5 titlepage">
        <i class="fa fa-search"></i> Movie Search: "{searchkey}"
      </h3>
      <div className="container mt-3">
        <div className="row offset-md-1">
          {movies.map((elm, index) => (
            <div
              key={elm.id}
              className=" col-md-3  col-6 col-lg-2 mb-3 pb-0 moviecard "
            >
              <Link to={`/${elm.id}`}>
                <img
                  src={`${IMAGE_PATH + elm.poster_path}`}
                  alt={elm.title}
                  width="100%"
                  className="imgmovie"
                  onMouseEnter={() => mouseHover(elm.id, index)}
                  onMouseLeave={() => mouseLeave(elm.id, index)}
                />
              </Link>
              {onHover[index] ? (
                <>
                  <div className="rank text-white">
                    <p className="m-0 p-0 ">
                      <small>{elm.vote_average}</small>{" "}
                    </p>
                    {elm.vote_average > 7.4 ? (
                      <i className="fa fa-thumbs-o-up"></i>
                    ) : (
                      <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );


};

export default Moviesearch