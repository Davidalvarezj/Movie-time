import axios from "axios";
import { FaRunning } from "react-icons/fa";



export const APIlist = (category, page = 1) => {
  let movies = [];
  const API = `https://api.themoviedb.org/3/movie/${category}?api_key=6642151dc98f6562ab971bc2b1c00fca&language=en-US&page=${page}`;
  const fetchmovies = async () => {
    const {
      data: { results },
    } = await axios.get(API);
    movies = results;

    return movies;
  };

  return fetchmovies();
};

export const APIdetail = async (id) => {
  let movie = {};
  const API = `https://api.themoviedb.org/3/movie/${id}?api_key=6642151dc98f6562ab971bc2b1c00fca&language=en-US`;
  const fetchmovies = async () => {
    const {data: data} = await axios.get(API);
    return data;
  };

  return await fetchmovies();
};


export const APIsearch = async (id) => {
  let movie = {};
  const API = `https://api.themoviedb.org/3/search/movie?api_key=6642151dc98f6562ab971bc2b1c00fca&language=en-US&query=${id}&page=1`;
  const fetchmovies = async () => {
    const { data: data } = await axios.get(API);
    return data;
  };

  return await fetchmovies();
};


export const APIvideo = async (id) => {
  let movie = {};
  const API = `https://api.themoviedb.org/3/movie/${id}?api_key=6642151dc98f6562ab971bc2b1c00fca&language=en-US&append_to_response=videos`;
  const fetchmovies = async () => {
    const { data: data } = await axios.get(API);
    return data.videos.results;
  };

  return await fetchmovies();
};



