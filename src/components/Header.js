import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import "./Header.css";
import { FaFilm } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";






const Header = ({ setSearchkey, cartArray, setCartArray }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchval, setsearchval] = useState("");
  const [navbar, setNavbar] = useState(false);
  const [openCart, setopenCart] = useState(false);
  const [rerender, setrerenderHeader] = useState(false);
  const navigate = useNavigate(); 


  const handleSearch = (event) => {
    setsearchval(event.target.value);
  };

  const handleSummit = () => {
    setSearchkey(searchval);
    document.getElementById("myInput").value = "";
    setMenuOpen(false)
    
  };

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNav);


 const handleKeyDown = (event) => {
   if (event.key === "Enter") {
       navigate("/Search")
       handleSummit()


   }
 };



  return (
    <>
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

        <NavbarToggler
          onClick={() => {
            setMenuOpen(!menuOpen);
            setopenCart(false);
          }}
          className="me-4"
        />
        <Collapse navbar isOpen={menuOpen}>
          <Nav className="ms-auto text-white " navbar>
            <NavItem className="me-4 fs-0.5" onClick={() => setMenuOpen(false)}>
              <NavLink className="nav-link" to="/">
                <FaFire className="fa" /> Popular
              </NavLink>
            </NavItem>
            <NavItem className="me-4" onClick={() => setMenuOpen(false)}>
              <NavLink className="nav-link" to="/toprated">
                <FaListOl className="fa" /> Top rated
              </NavLink>
            </NavItem>
            <NavItem className="me-4" onClick={() => setMenuOpen(false)}>
              <NavLink className="nav-link" to="/Nowplaying">
                <i className="fa fa-video-camera fa" /> Now playing
              </NavLink>
            </NavItem>
            <NavItem className="me-4" onClick={() => setMenuOpen(false)}>
              <NavLink className="nav-link" to="/Upcoming">
                <i className="fa fa-flag"></i> Upcoming
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
                  onKeyDown={handleKeyDown}
                />
                <NavLink className="" to="/Search" on>
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
            <NavItem className=" col-4 carticon h5">
              <div className="IconCart-cont">
                <FaShoppingCart
                  className=" fa-lg pt-1"
                  onClick={() => {
                    setopenCart(!openCart);
                    setMenuOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                />
                {cartArray.length > 0 ? (
                  <div className="counterCart">{cartArray.length}</div>
                ) : (
                  ""
                )}
              </div>
            </NavItem>
          </div>
          {openCart && (
            <Cart
              cartArray={cartArray}
              setCartArray={setCartArray}
              setrerenderHeader={setrerenderHeader}
            />
          )}
        </Nav>
      </Navbar>
    </>
  );
};
export default Header;
