import { useState } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import "./Header.css";
import { FaFilm } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Header = ({setSearchkey}) => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [searchval, setsearchval] = useState("");
	const [navbar, setNavbar] = useState(false);

	const handleSearch = (event) => {
		setsearchval(event.target.value);
		
	};

	const handleSummit = () => {
		setSearchkey(searchval);
		console.log(searchval);
		document.getElementById('myInput').value = '';
	};

	const changeNav = () => {
		if (window.scrollY >= 80){
			setNavbar(true)
		} else{
			setNavbar(false)
		}
	}

	window.addEventListener("scroll", changeNav);


	return (
    <Navbar
      dark
      color=""
      fixed="top"
      expand="md"
      className={navbar ? "navbar active" : "navbar"}
    >
      <NavbarBrand href="/" className="ms-5 ">
        <h4 className=" text-white me-5">
          Movie-Time <FaFilm className="" />
        </h4>
      </NavbarBrand>

      <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} className="me-4" />
      <Collapse navbar isOpen={menuOpen}>
        <Nav className="ms-auto text-white " navbar>
          <NavItem className="me-4 fs-0.5">
            <NavLink className="nav-link" to="/">
              <FaFire className="fa" /> Popular
            </NavLink>
          </NavItem>
          <NavItem className="me-4">
            <NavLink className="nav-link" to="/toprated">
              <FaListOl className="fa" /> Top rated
            </NavLink>
          </NavItem>
          <NavItem className="me-4">
            <NavLink className="nav-link" to="/Nowplaying">
              <i className="fa fa-video-camera fa" /> Now playing
            </NavLink>
          </NavItem>
          <NavItem className="me-4">
            <NavLink className="nav-link" to="/Upcoming">
              <i className="fa fa-info-circle fa" /> Upcoming
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <Nav className="ms-auto text-white searchclass" navbar>
        <div className="row fluid search-row">
          <NavItem className="pe-0 col-9">
            <div className="input-group input-group-sm">
              <input
                id="myInput"
                type="text"
                className="form-control searchinput"
                placeholder="Search movie..."
                aria-describedby="button-addon2"
                onChange={handleSearch}
              />
              <NavLink className="" to="/Search">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSummit}
                >
                  Search
                </button>
              </NavLink>
            </div>
          </NavItem>
          <NavItem className=" col-4 carticon">
            <FaShoppingCart className=" fa-lg pt-1" />
          </NavItem>
        </div>
      </Nav>
    </Navbar>
  );
};
export default Header;
