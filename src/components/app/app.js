import { Component } from 'react';
import './app.css';

import MoviesList from '../movies-list';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className="movie-app">
        <MoviesList />
      </div>
    );
  }
}
