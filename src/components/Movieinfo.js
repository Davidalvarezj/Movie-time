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


const Movieinfo = ({ cartArray, setCartArray }) => {
  const [movie, setMovie] = useState([]);
  const [trailer, settrailer] = useState([]);
  const [objComment, setobjComment] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

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
  }, []);

  useEffect(() => {
    console.log("")
    async function fetch() {
      const data = await APIvideo(movieId);
      const video = data.find((elm) => {
        return elm.name.includes("Official") || elm.name.includes("Trailer") || elm.name.includes("TRAILER");
      });
      console.log("video",video)
      console.log("data",data)
      settrailer(video ? video : data[0]);
    }
    fetch();
  }, [modalOpen]);










  const handleSubmit = (values) => {
    const comment = {
      rating: values.rating,
      author: values.author,
      text: values.commentText,
    };
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
    console.log(cartItem);
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
                  <h3 className="card-title pt-3">{movie.title}</h3>
                  <p class="card-text pb-3">{movie.tagline}</p>
                  <dl className="row detailTable">
                    <dt className="col-sm-3 text-end descriptiontag">
                      Overview:
                    </dt>
                    <dd className="col-sm-9 text-start">{movie.overview}</dd>
                    <dt className="col-sm-3 text-end descriptiontag">
                      {movie.homepage && "Web page:"}
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
                      Relace date:
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
                    {objComment.author ? (
                      <>
                        <dt className="col-sm-3 text-end descriptiontag">
                          User: {objComment.author}
                        </dt>
                        <dd className="col-sm-2 text-start">
                          Rating: {objComment.rating}
                        </dd>
                        <dd className="col-sm-7 text-start">
                          {objComment.text}
                        </dd>
                      </>
                    ) : (
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
        {console.log("trailer", trailer)}
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

              <Field name="rating" as="select" className="form-control">
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
