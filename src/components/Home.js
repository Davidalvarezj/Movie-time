import React from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { APIlist } from "../features/APIget";
import "./Home.css";

const Home = () => {

    const API = 'https://api.themoviedb.org/3/movie/popular?api_key=6642151dc98f6562ab971bc2b1c00fca&language=en-US&page=';
    const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";

    const [movies, setMovies] = useState([])
    const [trailer, setsTrailer] = useState(null)
    const [playng, setPlaying] = useState(false); 
    const [onHover, setonHover] = useState(false); 
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

const mouseHover=(id)=>{
console.log("Esta en mouse hover")
console.log("id",id );
setonHover(true)

}

const mouseLeave = (id) => {
  console.log("Salio del hover");
  console.log("id", id);
  setonHover(false);
};




  return (
    <div className="home-content">
      <h3 className="text-white mb-5 pb-5"> Popular movies</h3>
      <div className="container mt-3">
        <div className="row">
          {movies.map((elm) => (
            <div
              key={elm.id}
              className="col-md-3 col-6 col-lg-2 mb-3 pb-0 moviecard "
            >
              <Link to={`${elm.id}`}>
                <img
                  src={`${IMAGE_PATH + elm.poster_path}`}
                  alt={elm.title}
                  height={300}
                  width="100%"
                  className="imgmovie"
                  onMouseOver={() => mouseHover(elm.id)}
                  onMouseLeave={() => mouseLeave(elm.id)}
                />
                <div className={onHover ? "hoverText active" : "hoverText"}>
                  Hello
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home