import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, IMAGE_BASE_URL } from '../../api/movie-api';
import css from './MovieCast.module.css';

const defaultImg =
  '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/' +
  '95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

const MovieCast = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!params.movieId) return;
      setLoading(true);
      setError(false);

      try {
        const data = await getMovieCredits(params.movieId);
        setCast(data.cast);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.movieId]);

  return (
    <div className={css.container}>
      {cast.length > 0 && !loading && !error && (
        <ul>
          {cast.map(actor => {
            return (
              <li key={actor.id} className={css.card}>
                <img
                  src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : defaultImg}
                  alt={actor.name}
                  className={css.img}
                />
                <h3>{actor.name}</h3>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
      {cast.length === 0 && !loading && !error && <p>We do not have cast for this movie.</p>}
      {!loading && error && <p>Something happen, try again later.</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MovieCast;
