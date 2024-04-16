import { IMAGE_BASE_URL } from '../../api/movie-api';
import css from './MovieDetails.module.css';

const MovieDetails = ({ movie }) => {
  return (
    <div className={css.container}>
      <div>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      </div>
      <div>
        <h2>
          {movie.title} ({movie.release_date.match(/^\d{4}/)})
        </h2>
        <p>User Score: {Math.floor(movie.popularity)}%</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movie.genres.map(({ name }) => name).join(' ')}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
