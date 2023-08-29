import { Component } from 'react';
import './movies-list.css';
import { Spin, Alert } from 'antd';

import MovieCard from '../movie-card';
import TMDBService from '../../services/tmdb-service';

export default class MoviesList extends Component {
  tmdbService = new TMDBService();

  state = {
    moviesList: [],
    loading: false,
    error: false,
    errorText: '',
    noMovies: false,
  };

  componentDidUpdate(prevProps) {
    const { searchValue, currentPage, updateCurrentPage } = this.props;
    if (searchValue !== prevProps.searchValue || currentPage !== prevProps.currentPage) {
      this.setState({
        loading: true,
      });
      this.updateMovies();
    }
    if (searchValue !== prevProps.searchValue) {
      updateCurrentPage(1);
    }
  }

  onMoviesLoaded = (movies) => {
    this.setState({
      moviesList: movies.results,
      loading: false,
      noMovies: movies.results.length === 0,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
      errorText: err.message,
    });
  };

  // updateMovies = () => {
  //   const { searchValue, currentPage } = this.props;
  //   this.tmdbService.getMovies(searchValue, currentPage).then(this.onMoviesLoaded).catch(this.onError);
  // };

  updateMovies = () => {
    const { searchValue, currentPage } = this.props;
    this.tmdbService
      .getMovies(searchValue, currentPage)
      .then((movies) => {
        this.onMoviesLoaded(movies);
        this.props.getTotalPages(movies.total_pages * 10);
      })
      .catch(this.onError);
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
    const { moviesList, loading, error, errorText, noMovies } = this.state;
    const { searchValue } = this.props;
    const alertMovies = <Alert message="No results" description="Please enter another movie" type="warning" showIcon />;
    const hasData = !(loading || error || noMovies);

    const errorMessage = error ? <Alert message={errorText} type="error" /> : null;
    const spinner = loading ? <Spin size="large" /> : null;
    const content = hasData ? this.renderMovies(moviesList) : null;
    const warningContent = noMovies && searchValue !== '' && !loading ? alertMovies : null;
    return (
      <div className="movie-list">
        {errorMessage}
        {spinner}
        {content}
        {warningContent}
      </div>
    );
  }
}
