import React from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { APIlist } from "../features/APIget";
import { FaFire } from "react-icons/fa";
import "./Home.css";

const Home = () => {

    const API = 'https://api.themoviedb.org/3/movie/popular?api_key=6642151dc98f6562ab971bc2b1c00fca&language=en-US&page=';
    const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";

    const [movies, setMovies] = useState([])
    const [trailer, setsTrailer] = useState(null)
    const [playng, setPlaying] = useState(false); 
    const [onHover, setonHover] = useState([]); 
    const { movieId } = useParams();
    let data = []


  useEffect(() => {
    async function fetch() {
      data = await APIlist("popular",1);
      setMovies(data);
     
   }
    fetch()

    setTimeout(async() => {
      const data2 = await APIlist("popular", 2);
      setMovies([...data,...data2]);
    }, 2000);


  }, []);

const mouseHover=(id,index)=>{

const newHoverState = [];
newHoverState[index] = true;
setonHover(newHoverState);

}

const mouseLeave = (id, index) => {

  setonHover([]);
};




  return (
    <div className="home-content" id="home-content">
      <h3 className="text-white mb-5 pb-5 titlepage">
        <FaFire className="mb-2 " /> Popular Movies
      </h3>
      <div className="container mt-3">
        <div className="row offset-md-1">
          {movies.map((elm, index) => (
            <div
              key={elm.id}
              className=" col-md-3  col-6 col-lg-2 mb-3 pb-0 moviecard "
            >
              <Link to={`${elm.id}`}>
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

export default Home