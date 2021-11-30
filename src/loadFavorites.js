import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import ShowLargeCard from "./showLargeCard";
import BarWave from "react-cssfx-loading/lib/BarWave";
import { Container, Row, Col } from "react-bootstrap";
import { AiTwotoneDelete } from 'react-icons/ai';
import "./style.css"

export default function LoadFavorites(props) {

  const [movies, setMovies] = useState({
    loading: false,
    data: null,
    error: false
  })

  const { moviesFavorites } = useStoreState((store) => store);
  const { toggledCardView } = useStoreState((store) => store);
  const { LargeCardViewOn } = useStoreState((store) => store);

  const deleteMovie = useStoreActions((actions) => actions.deleteMovie);

  const setLargeCardView = useStoreActions((actions) => actions.setLargeCardView);
  const setLargeCardViewID = useStoreActions((actions) => actions.setLargeCardViewID);

  const setMovieToDelete = (title,poster,mtype,myear,m_imdbID) => {

    var index = moviesFavorites.findIndex(function(o){
      return o.imdbID === m_imdbID;
    })
    if (index !== -1) deleteMovie(index);
  
    setMovies({
      loading: false,
      data: moviesFavorites,
      error: false
    });

  }
  
  const setShowLargeCard = (imdbID) => {

    if (imdbID !== {}) {
      setLargeCardView(true);
      setLargeCardViewID(imdbID);
    }
    
  }

  useEffect(() => {

    LoadFavorites();

    function LoadFavorites() {
      try {

        console.log(movies);

        setMovies({
          loading: false,
          data: moviesFavorites,
          error: false
        });

      } catch (error) {
        setMovies({
          loading: false,
          data: null,
          error: true
        });
      }
    }
  }, [movies, moviesFavorites]);

  return (

    LargeCardViewOn ? <ShowLargeCard /> :

    toggledCardView ? 

    moviesFavorites ? 
    
      <Container>
          <Row>
            <div className="card-list">
            {moviesFavorites.filter(movie => movie.Poster).map(movie => (
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

                <button className="button-toggle" onClick={() => setMovieToDelete(movie.Title,movie.Poster,movie.Type,movie.Year,movie.imdbID)}>
                <i><AiTwotoneDelete className="icon-bin" size="3em" alt="Card view"/></i>
                </button>
              </div>
              </Col>
              
            ))}
            </div>
          </Row>
      </Container>

      : <div className="load-icon"><BarWave></BarWave></div>
        
      :

      moviesFavorites ?

      <Container>
        <Row>
          <div className="title--list">
            {moviesFavorites.filter(movie => movie.Poster).map(movie => (
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
                <button className="button-toggle-list" onClick={() => setMovieToDelete(movie.Title,movie.Poster,movie.Type,movie.Year,movie.imdbID)}>D</button>
                </Col>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </Container>

  : <div className="load-icon"><BarWave></BarWave></div>
  )
}
