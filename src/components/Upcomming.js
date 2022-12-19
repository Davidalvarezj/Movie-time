import React from "react";
import { useEffect, useState } from "react";
import { APIlist } from "../features/APIget";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";
  let data = [];

  useEffect(() => {
    async function fetch() {
      data = await APIlist("upcoming", 1);
      setMovies(data);
    }
    fetch();

    setTimeout(async () => {
      const data2 = await APIlist("upcoming", 2);
      setMovies([...data, ...data2]);
    }, 2000);
  }, []);

  return (
    <div className="home-content">
      <h3 className="text-white mb-5 pb-5"> Cooming Soon</h3>
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

export default Upcoming;
