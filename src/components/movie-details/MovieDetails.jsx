import { IMAGE_BASE_URL } from '../../api/movie-api';
import css from './MovieDetails.module.css';

const defaultImg =
  '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/' +
  '95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

const MovieDetails = ({ movie }) => {
  return (
    <div className={css.container}>
      <div>
        <img
          className={css.img}
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : defaultImg}
          alt={movie.title}
        />
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
