import { Component } from 'react';
import { Alert } from 'antd';
import { Online, Offline } from 'react-detect-offline';
import './app.css';

import MoviesList from '../movies-list';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className="movie-app">
        <Offline>
          <Alert message="You are offline right now. Check your connection." type="error" />
        </Offline>
        <Online>
          <MoviesList />
        </Online>
      </div>
    );
  }
}
