
import React from "react";
import { Container } from "reactstrap";
import "./Jumbo.css";
import { FaFilm } from "react-icons/fa";

const Jumbo = (props) => {
    return (
        <div className={"jumbotron-fluid jumbo-main pt-5 pb-5"}>
            <Container fluid>
                <h1 className="h1 mb-3 mt-5 pt-5">Movie-Time <FaFilm/></h1>
                <h3 className="mb-5 pb-5"><span className="badge bg-primary">Your online movies database</span></h3>

            </Container>
        </div>
    );
};

export default Jumbo;