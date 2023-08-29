export default class TMDBService {
  _apiBase = 'https://api.themoviedb.org/3/';

  apiKey = 'f0868cb7b9b71a7a54f419950c222b40';

  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  async getMovies(search, currentPage) {
    const response = await this.getResource(`search/movie?query=${search}&page=${currentPage}&api_key=${this.apiKey}`);
    return response;
  }
}
