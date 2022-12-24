import { Card, CardImg, CardText, CardBody, Col } from "reactstrap";
import { useParams } from "react-router-dom";   
import { useEffect, useState } from "react";
import { APIdetail } from "../features/APIget";
import { APIvideo } from "../features/APIget";
import { validateform } from "../features/validateform"
import { Formik, Field, Form, ErrorMessage } from "formik";
import YouTube from "react-youtube";
import "./Movieinfo.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { useScrollTo } from "react-use-window-scroll";


const Movieinfo = ({ cartArray, setCartArray }) => {
  const [movie, setMovie] = useState([]);
  const [trailer, settrailer] = useState([]);
  const [ArrComment, setobjComment] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const scrollTo = useScrollTo();
  let scroll = false;
  const heigth = window.innerHeight * 0.4;




  const IMAGE_PATH = "https://www.themoviedb.org/t/p/original";
    const IMAGE_PATH_SMALL = "https://www.themoviedb.org/t/p/w500";
  const { movieId } = useParams();
  let bgimage = IMAGE_PATH + movie.backdrop_path;

 useEffect(() => {
    async function fetch() {
      const data = await APIdetail(movieId);
      setMovie(data);

    }
    fetch();

  setTimeout(() => {
    if (!scroll) {
      scrollTo({ top: 0, left: 0, behavior: "smooth" });
      scrollTo({ top: heigth, left: 0, behavior: "smooth" });
      scroll = true;
    }
  }, 100);
  }, []);

  useEffect(() => {

    async function fetch() {
      const data = await APIvideo(movieId);
      const video = data.find((elm) => {
        return elm.name.includes("Official") || elm.name.includes("Trailer") || elm.name.includes("TRAILER");
      });
   
      settrailer(video ? video : data[0]);
    }
    fetch();
  }, [modalOpen]);



  const handleSubmit = (values) => {
    const comment = [...ArrComment,{
      rating: values.rating,
      author: values.author,
      text: values.commentText,
    }];
    setobjComment(comment);
    setModalOpen2(false);
  };


  const handdleCartclick = ()=>{
    const cartItem = {
      name: movie.title,
      image: IMAGE_PATH_SMALL + movie.poster_path,
      price: movie.revenue,
    };
    setCartArray([...cartArray, cartItem]);

  }



 return (
  <>
    <div
      className=" pb-5 bgmovieinfo"
      style={{ backgroundImage: "url(" + bgimage + ")" }}
    >
      <div className="container pb-5">
        <div className="row d-flex justify-content-center pb-5">
          <div
            className="card mb-3 card-content text-white"
            style={{ maxWidth: "1200px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`${IMAGE_PATH + movie.poster_path}`}
                  className="img-fluid  imagedetail"
                  alt={movie.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 className="card-title pt-3 ">{movie.title}</h1>
                  <p class="card-text pb-3 "><em>{movie.tagline}</em></p>
                  <dl className="row detailTable">
                    <dt className="col-sm-3 text-end descriptiontag">
                      Overview:
                    </dt>
                    <dd className="col-sm-9 text-start">{movie.overview}</dd>

                    <dt className="col-sm-3 text-end descriptiontag">
                      Genres:
                    </dt>
                        <dd className="col-sm-9 text-start">{!!movie.genres && movie.genres.map((elm,index)=>(<div key={index}>{elm.name}</div>))}</dd>
                    
                    <dt className="col-sm-3 text-end descriptiontag">
                      {movie.homepage && "Official website:"}
                    </dt>
                    <dd className="col-sm-9">
                      <a
                        className="text-white"
                        href={movie.homepage}
                        target="_blank"
                      >
                        <p className="text-start m-0">{movie.homepage}</p>
                      </a>
                    </dd>
                    <dt className="col-sm-3 text-end descriptiontag">
                      Relase date:
                    </dt>
                    <dd className="col-sm-9 text-start">
                      {movie.release_date}
                    </dd>
                    <dt className="col-sm-3 text-end descriptiontag">
                      Rating:
                    </dt>
                    <dd className="col-sm-9 text-start">
                      {parseFloat(movie.vote_average).toFixed(1)}
                    </dd>
                    <dt className="col-sm-3 text-end descriptiontag">
                      Revenue:
                    </dt>
                    <dd className="col-sm-9 text-start">
                      $ {movie.revenue && movie.revenue.toLocaleString()}
                    </dd>
                    {!!ArrComment.length && <><dt className="col-sm-3 text-end descriptiontag mt-3 mb-2 ">
                      <strong>Users Review:</strong>
                    </dt>
                    <dd className="col-sm-9 text-start">
                    </dd></> }
                    {ArrComment.length>0 ? ArrComment.map((elm, index) => (
                      <>
                        <dt className="col-sm-3 text-end descriptiontag">
                          <em>{elm.author}</em>
                        </dt>
                        <dd className="col-sm-2 text-start">
                          <em>Rating: {elm.rating}</em>
                        </dd>
                        <dd className="col-sm-7 text-start">
                          <em>{elm.text}</em>
                        </dd>
                      </>
                    )) : (
                      <dt className="col-sm-3 "></dt>
                    )}
                  </dl>
                  <button
                    href="#"
                    className="btn btn-primary m-2"
                    onClick={() => setModalOpen(true)}
                  >
                    <i className="fa fa-play" /> Play trailer
                  </button>
                  <button
                    href="#"
                    className="btn btn-primary m-2"
                    onClick={() => setModalOpen2(true)}
                  >
                    <i className="fa fa-pencil" /> Add review
                  </button>
                  <button
                    href="#"
                    className="btn btn-primary m-2"
                    onClick={handdleCartclick}
                  >
                    <i className="fa fa-shopping-cart" /> Add cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      className="trailermodal "
      centered
      size="xl"
      isOpen={modalOpen}
      toggle={() => setModalOpen(false)}
    >
      <ModalHeader toggle={() => setModalOpen(false)}>
        {movie.title} Trailer
      </ModalHeader>
      <ModalBody>
          <YouTube
        
          videoId={trailer ? trailer.key : "none"}
          className="reproductor container"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 1,
              cc_load_policy: 0,
              fs: 0,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
            },
          }}
        />
      </ModalBody>
    </Modal>
    <Modal
      centered
      size="md"
      isOpen={modalOpen2}
      toggle={() => setModalOpen2(false)}
    >
      <ModalHeader toggle={() => setModalOpen2(false)}>
        {movie.title}
      </ModalHeader>
      <ModalBody>
        <h4>New review:</h4>

        <Formik
          initialValues={{ rating: undefined, author: "", commentText: "" }}
          onSubmit={handleSubmit}
          validate={validateform}
        >
          <Form>
            <FormGroup>
              <Label htmlFor="rating"> Rating: 1-10 </Label>

              <Field name="rating" as="select" className="form-control" style={{backgroundColor: "transparent", color: "white"}}>
                <option>Select...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Field>
              <ErrorMessage name="rating">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="author">Your Name</Label>
              <Field
                name="author"
                placeholder="Your Name"
                className="form-control"
                style={{backgroundColor: "transparent", color: "white"}}
                id="namefield"
              />
              <ErrorMessage name="author">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="commentText"> Review</Label>
              <Field
                name="commentText"
                as="textarea"
                rows="12"
                className="form-control"
                style={{backgroundColor: "transparent", color: "white"}}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Formik>
      </ModalBody>
    </Modal>
  </>
);
};



export default Movieinfo;
