import { Component } from 'react';
import './movies-list.css';
import { Spin, Alert } from 'antd';

import MovieCard from '../movie-card';
import TMDBService from '../../services/tmdb-service';

export default class MoviesList extends Component {
  tmdbService = new TMDBService();

  state = {
    moviesList: [],
    status: null,
    errorText: '',
    ratedMovies: [],
  };

  componentDidUpdate(prevProps) {
    const { searchValue, currentPage, updateCurrentPage, tab } = this.props;
    if (searchValue !== prevProps.searchValue || currentPage !== prevProps.currentPage || tab !== prevProps.tab) {
      this.setState({
        status: 'loading',
      });
      this.updateMovies();
    }
    if (searchValue !== prevProps.searchValue) {
      updateCurrentPage(1);
    }
  }

  onMoviesLoaded = (movies) => {
    const { ratedMovies } = this.state;
    const updatedMoviesList = movies.results.map((movie) => {
      const ratedMovie = ratedMovies.find((rated) => rated.id === movie.id);
      const rating = ratedMovie ? ratedMovie.rating : movie.rating;
      return {
        ...movie,
        rating,
      };
    });
    this.setState({
      moviesList: updatedMoviesList,
      status: movies.results.length === 0 ? 'noMovies' : null,
    });
  };

  onError = (err) => {
    this.setState({
      status: 'error',
      errorText: err.message,
    });
  };

  async updateMovies() {
    const { searchValue, currentPage, tab } = this.props;
    try {
      const ratedMovies = await this.tmdbService.getRatedMovies(currentPage);
      const movies = await this.tmdbService.getMovies(searchValue, currentPage);
      this.setState({ ratedMovies: ratedMovies.results });
      if (tab === '1') {
        this.onMoviesLoaded(movies);
        this.props.getTotalPages(movies.total_pages * 10);
      } else if (tab === '2') {
        if (ratedMovies.results.length === 0) {
          throw new Error('Please, rate any movie');
        }
        this.onMoviesLoaded(ratedMovies);
        this.props.getTotalPages(ratedMovies.total_pages * 10);
      }
    } catch (error) {
      this.onError(error);
    }
  }

  renderMovies = (moviesList) =>
    moviesList.map((item) => {
      const {
        id,
        title,
        release_date: releaseDate,
        poster_path: posterPath,
        overview,
        genre_ids: genreId,
        rating,
        vote_average: voteAverage,
      } = item;
      return (
        <MovieCard
          key={id}
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          posterPath={posterPath}
          loading={this.state.loading}
          genreId={genreId}
          rating={rating}
          voteAverage={voteAverage}
          addRating={(value) => this.tmdbService.addRating(id, value)}
        />
      );
    });

  render() {
    const { moviesList, status, errorText } = this.state;
    const { searchValue } = this.props;
    const alertMovies = <Alert message="No results" description="Please enter another movie" type="warning" showIcon />;
    const hasData = status === null;

    if (status === 'error') {
      return <Alert message={errorText} type="error" />;
    }
    if (status === 'loading') {
      return <Spin size="large" />;
    }
    if (status === 'noMovies' && searchValue !== '') {
      return alertMovies;
    }
    const content = hasData ? this.renderMovies(moviesList) : null;

    return <div className="movie-list">{content}</div>;
  }
}
