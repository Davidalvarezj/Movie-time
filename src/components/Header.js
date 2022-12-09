import { useState } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import "./Header.css";
import { FaFilm } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { NavLink } from "react-router-dom";




const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)



	return (
	<Navbar dark color="" fixed="top" expand="md" className="navbar">
		<NavbarBrand href="/" className="ms-5">
			<h4 className=" text-white">
			Movie-Time <FaFilm className="" />
			</h4>
		</NavbarBrand>

		<NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
		<Collapse navbar isOpen={menuOpen}>
			<Nav className="ms-auto text-white" navbar>
				<NavItem className="me-4">
					<FaFire  className="fa-lg" /> Popular
				</NavItem>
				<NavItem className="me-4">
					<i className="fa fa-list fa-lg" /> Top rated
				</NavItem>
				<NavItem className="me-4">
					<i className="fa fa-info fa-lg" /> Upcoming
				</NavItem>
				<NavItem className="me-4">
					<i className="fa fa-address-card fa-lg" /> Now playing
				</NavItem>

			</Nav>
		</Collapse>
			<Nav className="ms-auto text-white searchclass" navbar>
				<div className="row fluid search-row">
				<NavItem className="pe-0 col-9">
					<div class="input-group input-group-sm">
						<input
							type="text"
							class="form-control"
							placeholder="Search movie..."
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
						/>
						<button	class="btn btn-primary" type="button" id="button-addon2">Search</button>
					</div>
				</NavItem>
				<NavItem className=" col-4 carticon">
					<FaShoppingCart  className=" fa-lg pt-1" />
				</NavItem>
				</div>
			</Nav>

	</Navbar>
	);
};
export default Header;
