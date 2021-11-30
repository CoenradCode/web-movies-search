import React, {useState} from "react";
import MoviesFind from "./moviesFind";
import LoadFavorites from "./loadFavorites";
import { useStoreState, useStoreActions, useStoreRehydrated } from 'easy-peasy';
import { BsGridFill } from 'react-icons/bs';
import { IoListSharp } from 'react-icons/io5';
import { Container, Row, Col, Button } from "react-bootstrap";
import "./style.css"

export default function MoviesMain() {

  const [toggleFavSearch, settoggleFavSearch] = useState('');

  const [query, setQuery] = useState('');

  let propOptions = { loading: false, toggleCard: false };

  const { LargeCardViewOn } = useStoreState((store) => store);

  const setToggleView = useStoreActions((actions) => actions.setToggleView);
  const setLargeCardView = useStoreActions((actions) => actions.setLargeCardView);
  const setLargeCardViewID = useStoreActions((actions) => actions.setLargeCardViewID);

  const switchViewList = () => {
    setToggleView(false);
  }

  const searchClicked = () => {
    settoggleFavSearch('SEARCH');
    setHideLargeCard();
  }

  const favClicked = () => {
    settoggleFavSearch('FAV');
    setHideLargeCard();
  }

  const switchViewCard = () => {
    setToggleView(true);
  }

  const setHideLargeCard = () => {
      setLargeCardView(false);
      setLargeCardViewID('');
  }

  return (

    <div>
      <Container className="pad-bottom">
        <Row>
          <Col lg={5} className="col-center">
            <div>
              {/* <i className="fa fa-user icon"></i> */}
              <input className="input" type="text" name="query"
              placeholder="Type movie name"
              value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className="d-flex">
            <Button className="button btn-margin" variant="secondary" onClick={() => searchClicked()}>Movies search</Button>{' '}
            <Button className="button btn-margin" variant="secondary" onClick={() => favClicked()}>Favorites</Button>{' '}
            </div>

            {
            toggleFavSearch === 'FAV' ? <h1 className="sub-title mb-7">My Favorites</h1>
            : null
            }
          </Col>
        </Row>
      </Container>

      {
      toggleFavSearch == '' ? null
      : 
      !LargeCardViewOn ? 
      <Container className="top-empty">
        <Row>
          <Col lg={2} className="col-center toggle-buttons-pos">
            <div className="toggle-icons">  
              <i onClick={switchViewList}><IoListSharp size="4em" color="#fff" alt="List view"/></i>
              <i onClick={switchViewCard}><BsGridFill size="3em" color="#fff" alt="Card view"/></i>
            </div>
          </Col>
        </Row>
      </Container>
      : null

      }
  
      {
      toggleFavSearch == 'SEARCH' ? <MoviesFind
                                      showOptions = {propOptions}
                                      searchTitle = {query}
                                    />
      : toggleFavSearch == 'FAV' ? <LoadFavorites loading = {true}/> : null
      }
      </div>

  )
}
