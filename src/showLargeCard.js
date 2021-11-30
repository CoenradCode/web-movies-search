import React, {useState, useEffect} from "react";
import { useStoreState } from 'easy-peasy';
import BarWave from "react-cssfx-loading/lib/BarWave";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css"

export default function ShowLargeCard(props) {

  const [movies, setMovies] = useState({
    loading: true,
    data: null,
    error: false
  })

  const { LargeCardViewID } = useStoreState((store) => store);

  useEffect(() => {

    fetchMovies();

    async function fetchMovies() {
      try {

        const url = `${process.env.REACT_APP_RAPID_API_URL}?i=${LargeCardViewID}`;

        const response = await fetch(url,{
          //params: {s: "Avengers", r: "json", i: "tt4154796"},
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
          },
        });
        const json_movies = await response.json();
        setMovies({
          loading: false,
          data: json_movies,
          error: false
        });

        console.log(json_movies);

        const movie = json_movies;
      } catch (error) {
        setMovies({
          loading: false,
          data: null,
          error: true
        });
      }
    }
  }, []);
  
    return (

      movies.data ? 

      <div>
        <Container>
            <Row>
                <Col xl={12} lg={12} md={10}>
                  <div className="full-card--movie">
                  <Row>
                    <Col xl={3}>
                      <img className="full-card--image"
                        src={movies.data.Poster}
                        alt={movies.data.Title + ' poster'}
                      />
                    </Col>
                    <Col xl={4}>
                      <Row>
                      <h3 className="full-card--title">{movies.data.Title}</h3>
                      </Row>
                      <Row>
                      <p className="full-card--text mb-2"><small>{movies.data.Year}</small></p>
                      </Row>
                      <Row>
                      <p className="full-card--text mb-2"><small>{movies.data.Genre}</small></p>
                      </Row>
                      <Row>
                      <p className="full-card--plot mb-2"><small>{movies.data.Plot}</small></p>
                      </Row>
                      <Row>
                      <p className="full-card--text mb-2"><small>Rating {movies.data.imdbRating}</small></p>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="full-card--actors">
                    <Col>
                    <h3 className="full-card--text-2">Released: {movies.data.Released}</h3>
                    </Col>
                    <Col>
                    <h3 className="full-card--text-2">Runtime: {movies.data.Runtime}</h3>
                    </Col>
                    <Col>
                    <h3 className="full-card--text-2">Rated: {movies.data.Rated}</h3>
                    </Col>
                  </Row>
                  <Row className="full-card--actors-2">
                    <Col>
                    <h3 className="full-card--text-2">Director: {movies.data.Director}</h3>
                    </Col>
                  </Row>
                  <Row className="full-card--actors-2">
                    <Col>
                    <h3 className="full-card--text-2">Actors: {movies.data.Actors}</h3>
                    </Col>
                  </Row>
                  </div>
                </Col>
              
            </Row>
            <Row>
              <div className="footer-row"></div>
            </Row>


        </Container>
      </div>

      : <div className="load-icon"><BarWave></BarWave></div>
    )
}
