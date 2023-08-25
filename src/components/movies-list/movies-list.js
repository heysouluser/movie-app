import { Component } from 'react';

import './movies-list.css';

import MovieCard from '../movie-card';
import TMDBService from '../../services/tmdb-service';

export default class MoviesList extends Component {
  tmdbService = new TMDBService();

  state = {
    moviesList: null,
  };

  componentDidMount() {
    this.updateMovies();
  }

  updateMovies = () => {
    this.tmdbService.getMovies().then((movies) => {
      this.setState({
        moviesList: movies,
      });
    });
  };

  renderMovies = (moviesList) =>
    moviesList.map((item) => {
      const { id, title, release_date: releaseDate, poster_path: posterPath, overview } = item;

      return <MovieCard key={id} title={title} overview={overview} releaseDate={releaseDate} posterPath={posterPath} />;
    });

  render() {
    const { moviesList } = this.state;

    if (!moviesList) {
      return <div>Loading...</div>;
    }

    const elements = this.renderMovies(moviesList);

    return <div className="movie-list">{elements}</div>;
  }
}
