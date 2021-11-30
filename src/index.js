import React from 'react';
import ReactDOM from 'react-dom';
import MoviesMain from './moviesMain';
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider, createStore, action, persist } from 'easy-peasy';

//Create store
const store = createStore(
  persist({
  toggledCardView: true,
  LargeCardViewOn: false,
  LargeCardViewID: '',
  moviesSearched: [],
  moviesFavorites: [],
  addMovie: action((state, movie) => {
    state.moviesFavorites.push(movie);
  }),
  deleteMovie: action((state, index) => {
    state.moviesFavorites.splice(index, 1);
  }),
  setToggleView: action((state, view) => {
    state.toggledCardView = view;
  }),
  setLargeCardView: action((state, view) => {
    state.LargeCardViewOn = view;
  }),
  setLargeCardViewID: action((state, id) => {
    state.LargeCardViewID = id;
  }),
}));

function Home() {

  return (
    
    <StoreProvider store={store}>
      <div className="container">
        <h1 className="title mb-7 text--white">Movie Search</h1>
      </div>
      <MoviesMain />
    </StoreProvider>
  )
}

ReactDOM.render(<Home />, document.getElementById('root'));