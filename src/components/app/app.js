import { Component } from 'react';
import { Alert } from 'antd';
import { Online, Offline } from 'react-detect-offline';
import './app.css';

import Header from '../header';
import MoviesList from '../movies-list';
import Footer from '../footer';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className="movie-app">
        <Online>
          <Header />
          <main className="movie-app__main">
            <MoviesList />
          </main>
          <Footer />
        </Online>

        <Offline>
          <Header />
          <main className="movie-app__main">
            <Alert message="You are offline right now. Check your connection." type="error" />
          </main>
          <Footer />
        </Offline>
      </div>
    );
  }
}
