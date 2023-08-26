import { Component } from 'react';
import './movies-list.css';
import { Spin, Alert } from 'antd';

import MovieCard from '../movie-card';
import TMDBService from '../../services/tmdb-service';

export default class MoviesList extends Component {
  tmdbService = new TMDBService();

  state = {
    moviesList: [],
    loading: true,
    error: false,
    errorText: '',
  };

  componentDidMount() {
    this.updateMovies();
  }

  onMoviesLoaded = (movies) => {
    this.setState({
      moviesList: movies,
      loading: false,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
      errorText: err.message,
    });
  };

  updateMovies = () => {
    this.tmdbService.getMovies().then(this.onMoviesLoaded).catch(this.onError);
  };

  renderMovies = (moviesList) =>
    moviesList.map((item) => {
      const { id, title, release_date: releaseDate, poster_path: posterPath, overview } = item;

      return (
        <MovieCard
          key={id}
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          posterPath={posterPath}
          loading={this.state.loading}
        />
      );
    });

  render() {
    const { moviesList, loading, error, errorText } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <Alert message={errorText} type="error" /> : null;
    const spinner = loading ? <Spin /> : null;
    const content = hasData ? this.renderMovies(moviesList) : null;

    return (
      <div className="movie-list">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}
