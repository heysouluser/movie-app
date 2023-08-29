import { Component } from 'react';
import { debounce } from 'lodash';
// import { Alert } from 'antd';
// import { Offline } from 'react-detect-offline';
import './app.css';

import Header from '../header';
import MoviesList from '../movies-list';
import Footer from '../footer';

export default class App extends Component {
  state = {
    searchValue: '',
    currentPage: 1,
    totalPages: 0,
  };

  debouncedSearch = debounce((value) => {
    this.setState({
      searchValue: value,
    });
  }, 500);

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

  render() {
    const { searchValue, currentPage, totalPages } = this.state;

    return (
      <div className="movie-app">
        <Header onInputChange={this.onInputChange} />
        <main className="movie-app__main">
          <MoviesList
            searchValue={searchValue}
            currentPage={currentPage}
            updateCurrentPage={this.updateCurrentPage}
            getTotalPages={this.getTotalPages}
          />
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
