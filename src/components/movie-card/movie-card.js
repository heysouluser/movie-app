import './movie-card.css';
import { format } from 'date-fns';
import { Rate } from 'antd';

import truncate from '../../utils/truncate';
import { GenreConsumer } from '../movie-context';

function addGenres(genresList, movieGenres) {
  const currentGenres = genresList.filter((genre) => movieGenres.includes(genre.id));
  const limitGenres = currentGenres.slice(0, 3);
  return limitGenres.map((genre) => (
    <li key={genre.id} className="movie-card__genre">
      {genre.name}
    </li>
  ));
}

function MovieCard(props) {
  const { title, releaseDate, posterPath, overview, genreId, rating, addRating, voteAverage } = props;
  let posterImg = `https://image.tmdb.org/t/p/original${posterPath}`;
  const emptyImg = 'http://dummyimage.com/183x279/99cccc.gif&text=Empty+pic';
  let formatDate = 'Date unknown';
  let movieOverview = 'Empty description';
  const movieRating = +voteAverage.toFixed(1);
  let ratingColor;

  if (!posterPath) {
    posterImg = emptyImg;
  }

  if (releaseDate) {
    formatDate = format(new Date(releaseDate), 'MMMM d, y');
  }

  if (overview) {
    movieOverview = truncate(overview, 180);
  }

  if (movieRating <= 3) {
    ratingColor = '#E90000';
  } else if (movieRating > 3 && movieRating <= 5) {
    ratingColor = '#E97E00';
  } else if (movieRating > 5 && movieRating <= 7) {
    ratingColor = '#E9D100';
  } else {
    ratingColor = '#66E900';
  }

  return (
    <div className="movie-card">
      <img className="movie-card__pic" src={posterImg} alt="" />
      <div className="movie-card__body">
        <div className="movie-card__header">
          <h3 className="movie-card__title">{title}</h3>
          <div className="movie-card__rating" style={{ borderColor: ratingColor }}>
            {movieRating}
          </div>
        </div>
        <div className="movie-card__date">{formatDate}</div>
        <GenreConsumer>
          {(genres) => <ul className="movie-card__genres-list">{addGenres(genres, genreId)}</ul>}
        </GenreConsumer>
        <div className="movie-card__desc">{movieOverview}</div>
        <Rate count={10} defaultValue={rating} allowHalf onChange={addRating} />
      </div>
    </div>
  );
}

export default MovieCard;
