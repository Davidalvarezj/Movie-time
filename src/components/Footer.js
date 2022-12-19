import React from 'react'
import { FaFire } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaListOl } from "react-icons/fa";

import "./Footer.css";




const Footer = () => {
  return (
 
<footer className="site-footer">
    <div className="container">
        <div className="row">
            <div className="col-12 col-lg-4 text-center my-auto">
                
                <ul className="list-unstyled">
                   
                    <li><h4>Movie-time <small><i className="fa fa-film fa-md"></i></small></h4></li>

                </ul>
            </div>
            <div className="col-12 col-lg-4 text-center my-auto" >
                <div className="row">
                    <div className="col p-0 ">
                        <a className="text-white" target="_blank" href=""><h1><i className="fa fa-instagram"></i></h1></a>
                    </div>
                    <div className="col p-0">
                        <a className="text-white" href=""><h1><i className="fa fa-facebook"></i></h1></a>
                    </div>
                    <div className="col p-0">
                        <a className="text-white" href=""><h1><i className="fa fa-twitter"></i></h1></a>
                    </div>
                    <div className="col p-0">
                        <a className="text-white" href=""><h1><i className="fa fa-youtube"></i></h1></a>
                    </div>
                </div>    
            </div>
            <div className="col-12 col-lg-4 text-center pt-3 my-auto">
                
                <NavLink className="nav-link text-white" to="/">
                    <FaFire  className="fa" /> Popular
                </NavLink>
                <NavLink className="nav-link text-white" to="/toprated">
                    <FaListOl   className="fa" /> Top rated
                </NavLink>
                <NavLink className="nav-link text-white" to="/Nowplaying">
                    <i className="fa fa-video-camera fa" /> Now playing
                </NavLink>
                <NavLink className="nav-link text-white" to="/Upcoming">
                    <i className="fa fa-info-circle fa" /> Upcoming
                </NavLink>

            </div>
        </div>    
    </div>
    <div className="conatiner">
        <div className="row text-center">
            <div className="col">
            <a href="https://github.com/Davidalvarezj" target="_blank" className="text-white firma" >Created by David AJ</a>
            </div>
        </div>
    </div>
</footer>




)
}

export default Footer