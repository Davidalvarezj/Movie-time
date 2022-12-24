import React from 'react'
import { useEffect, useState } from "react";
import {APIlist} from '../features/APIget'
import { Link } from "react-router-dom";
import { FaListOl } from "react-icons/fa";
import { useScrollTo } from "react-use-window-scroll";
import "./Toprated.css";





const Toprated = () => {
const [movies, setMovies] = useState([]);
const [onHover, setonHover] = useState([]); 
const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";
let data = [];
const scrollTo = useScrollTo();
let scroll = false;
const heigth = window.innerHeight * 0.4;






  useEffect(() => {
    async function fetch() {
      data = await APIlist("top_rated", 1);
      setMovies(data);
    }
    fetch();

    setTimeout(async () => {
      const data2 = await APIlist("top_rated", 2);
      setMovies([...data, ...data2]);
    }, 200);



  setTimeout(() => {
    if (!scroll) {
      scrollTo({ top: 0, left: 0, behavior: "smooth" });
      scrollTo({ top: heigth, left: 0, behavior: "smooth" });
      scroll = true;
    }
  }, 100);



  }, []);

  const mouseHover = (id, index) => {
    console.log("Esta en mouse hover");
    console.log("id", id);
    const newHoverState = [];
    newHoverState[index] = true;
    setonHover(newHoverState);
  };

  const mouseLeave = (id, index) => {
    console.log("Salio del hover");
    console.log("id", id);
    setonHover([]);
  };


	return (
    <div className="home-content" id="home-content">
      <h3 className="text-white mb-5 pb-5 titlepage" id="toprated">
        <FaListOl className="mb-2" /> Top Rated{" "}
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
}

export default Toprated