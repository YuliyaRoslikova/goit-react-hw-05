import { Suspense, useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovie } from '../../api/movie-api';
import MovieDetails from '../../components/movie-details/MovieDetails';

const MovieDetailsPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const params = useParams();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await getMovie(params.movieId);
        setMovie(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.movieId]);

  return (
    <div>
      {movie && !loading && !error && (
        <div>
          <Link to={backLinkRef.current ?? '/'}>Go back</Link>
          <MovieDetails movie={movie} />
          <hr />
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <hr />
            <Suspense fallback={<p>Loading subpage...</p>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
      {!loading && error && <p>Something happen, try again later.</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MovieDetailsPage;
