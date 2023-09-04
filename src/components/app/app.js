import { Component } from 'react';
import { debounce } from 'lodash';
// import { Alert } from 'antd';
// import { Offline } from 'react-detect-offline';
import './app.css';

import Header from '../header';
import MoviesList from '../movies-list';
import Footer from '../footer';
import { GenreProvider } from '../movie-context';
import TMDBService from '../../services/tmdb-service';

export default class App extends Component {
  tmdbService = new TMDBService();

  state = {
    searchValue: '',
    currentPage: 1,
    totalPages: 0,
    genres: [],
    tab: '1',
  };

  debouncedSearch = debounce((value) => {
    this.setState({
      searchValue: value,
    });
  }, 500);

  componentDidMount() {
    this.tmdbService.createGuestSession();
    this.tmdbService.getGenres().then((genres) => {
      this.setState({
        genres,
      });
    });
  }

  onInputChange = (e) => {
    this.debouncedSearch(e.target.value);
  };

  updateCurrentPage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  getTotalPages = (totalPages) => {
    this.setState({
      totalPages,
    });
  };

  updateTab = (tab) => {
    this.setState({
      tab,
    });
  };

  render() {
    const { searchValue, currentPage, totalPages, genres, tab } = this.state;

    return (
      <div className="movie-app">
        <Header onInputChange={this.onInputChange} updateTab={this.updateTab} tab={tab} />
        <main className="movie-app__main">
          <GenreProvider value={genres}>
            <MoviesList
              searchValue={searchValue}
              currentPage={currentPage}
              updateCurrentPage={this.updateCurrentPage}
              getTotalPages={this.getTotalPages}
              tab={tab}
            />
          </GenreProvider>
        </main>
        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          updateCurrentPage={this.updateCurrentPage}
          searchValue={searchValue}
        />

        {/* <Offline>
          <Header />
          <main className="movie-app__main">
            <Alert message="You are offline right now. Check your connection." type="error" />
          </main>
          <Footer />
        </Offline> */}
      </div>
    );
  }
}
