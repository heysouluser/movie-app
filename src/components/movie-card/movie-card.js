import './movie-card.css';
import { format } from 'date-fns';

function truncate(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  const spaceIndex = str.indexOf(' ', maxLength);

  return `${str.slice(0, spaceIndex)}...`;
}

function MovieCard(props) {
  const { title, releaseDate, posterPath, overview } = props;

  let posterImg = `https://image.tmdb.org/t/p/original${posterPath}`;
  let formatDate = 'Date unknown';
  let movieOverview = 'Empty description';

  if (!posterPath) {
    posterImg = 'http://dummyimage.com/183x279/99cccc.gif&text=Empty+pic';
  }

  if (releaseDate) {
    formatDate = format(new Date(releaseDate), 'MMMM d, y');
  }

  if (overview) {
    movieOverview = truncate(overview, 210);
  }

  return (
    <div className="movie-card">
      <img className="movie-card__pic" src={posterImg} alt="" />
      <div className="movie-card__body">
        <div className="movie-card__title">{title}</div>
        <div className="movie-card__date">{formatDate}</div>
        <ul className="movie-card__genres-list">
          <li className="movie-card__genre">Genre</li>
          <li className="movie-card__genre">Genre</li>
        </ul>
        <div className="movie-card__desc">{movieOverview}</div>
      </div>
    </div>
  );
}

export default MovieCard;
