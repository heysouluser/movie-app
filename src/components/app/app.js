import { Component } from 'react';
import './app.css';

import MoviesList from '../movies-list';

export default class App extends Component {
  render() {
    return (
      <div>
        <MoviesList />
      </div>
    );
  }
}
