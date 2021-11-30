import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import ShowLargeCard from "./showLargeCard";
import BarWave from "react-cssfx-loading/lib/BarWave";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css"
import { AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesFind(props) {

  const [movies, setMovies] = useState({
    loading: false,
    data: null,
    error: false
  })

  const { moviesFavorites } = useStoreState((store) => store);
  const { toggledCardView } = useStoreState((store) => store);
  const { LargeCardViewOn } = useStoreState((store) => store);

  const addMovie = useStoreActions((actions) => actions.addMovie);

  const setLargeCardView = useStoreActions((actions) => actions.setLargeCardView);
  const setLargeCardViewID = useStoreActions((actions) => actions.setLargeCardViewID);

  toast.configure();

  //const isRehydrated = useStoreRehydrated();

  const setMovieToAdd = (title,poster,mtype,myear,m_imdbID) => {
    let movieAdded = {Title: title, Year: myear, imdbID: m_imdbID, Type: mtype, Poster: poster}

    let itemFound = false;

    moviesFavorites.forEach(function(mv) {
      if (mv.imdbID === m_imdbID) {
        itemFound = true;
      } 
    })

    if (!itemFound) {
      addMovie(movieAdded);
    }

    toast(`${title} was added to favourites`);
  }

  const setShowLargeCard = (imdbID) => {

    if (imdbID !== {}) {
      //setLargeCardOn(true);
      setLargeCardView(true);
      setLargeCardViewID(imdbID);
    }
    
  }

  useEffect(() => {

    fetchMovies();

    async function fetchMovies() {
      try {

        const url = `${process.env.REACT_APP_RAPID_API_URL}?s=${props.searchTitle}`;

        const response = await fetch(url,{
          //params: {s: "Avengers", r: "json", i: "tt4154796"},
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
          },
        });
        const json_movies = await response.json();

        let imdbIDs = [];
        let uniqueMovies = [];
        
        //Find unique movies, with no duplicate imdbIDs
        json_movies.Search.forEach(function(mv) {

          let id_found = false;

          imdbIDs.forEach(function(mv_check) {

            if (mv_check === mv.imdbID) {
              id_found = true;
            }

          });

          imdbIDs.push(mv.imdbID);

          if (!id_found) {
            uniqueMovies.push(mv);
          }  

        });

        setMovies({
          loading: false,
          data: uniqueMovies,
          error: false
        });

        console.log(json_movies);

      } catch (error) {
        setMovies({
          loading: false,
          data: null,
          error: true
        });
      }
    }
  }, [props.searchTitle]);

  return (
    
    //isRehydrated ?

    LargeCardViewOn ? <ShowLargeCard /> :
        
        toggledCardView ? 
        
        movies.data ? 

          <Container>
              <Row>
                <div className="card-list">
                {movies.data.filter(movie => movie.Poster).map(movie => (
                  <Col xl={3} lg={4} md={6}>
                  <div className="card--movie" key={movie.imdbID}>
                    <p className="card--text mb-0"><small>{movie.Type}</small></p>
                    <img className="card--image"
                      onClick={() => setShowLargeCard(movie.imdbID)}
                      src={movie.Poster}
                      alt={movie.Title + ' poster'}
                    />
                    <div className="card--content">
                      <h3 className="card--title" onClick={() => setShowLargeCard(movie.imdbID)}>{movie.Title}</h3>
                      <p className="card--text mb-2"><small>{movie.Year}</small></p>
                    </div>
                    
                    <button className="button-toggle" onClick={() => setMovieToAdd(movie.Title,movie.Poster,movie.Type,movie.Year,movie.imdbID)}>
                    <i><AiFillHeart className="icon-heart" size="3em" alt="Card view"/></i>
                    </button>
                  </div>
                  </Col>
                  
                ))}
                </div>
              </Row>

          </Container>

          : <div className="load-icon"><BarWave></BarWave></div>
          
          :

          movies.data ?

            <Container>
              <Row>
                <div className="title--list">
                  {movies.data.filter(movie => movie.Poster).map(movie => (
                    <div className="list" key={movie.imdbID}>
                      <div className="list--content">
                      <Col lg={2}>  
                      <img className="list--image"
                        onClick={() => setShowLargeCard(movie.imdbID)}
                        src={movie.Poster}
                        alt={movie.Title + ' poster'}
                      />
                      </Col>
                      <Col lg={10}>
                        <h3 className="list--title" onClick={() => setShowLargeCard(movie.imdbID)}>{movie.Title}</h3>
                        <p className="list--text mb-0"><small>{movie.Type}</small></p>
                        <p className=" list--text mb-2"><small>{movie.Year}</small></p>
                        <button className="button-toggle-list" onClick={() => setMovieToAdd(movie.Title,movie.Poster,movie.Type,movie.Year,movie.imdbID)}>
                        <i><AiFillHeart className="icon-heart" size="3em" alt="Card view"/></i>
                        </button>
                      </Col>
                      </div>
                    </div>
                  ))}
                </div>
              </Row>
            </Container>

            : <div className="load-icon"><BarWave></BarWave></div> 
            
            //: <div className="load-icon"><BarWave></BarWave></div>
  )
}

