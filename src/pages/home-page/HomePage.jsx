import { useEffect, useState } from 'react';
import { getTrending } from '../../api/movie-api';
import MovieList from '../../components/movie-list/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await getTrending();
        setMovies(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {movies.length > 0 && !loading && !error && <MovieList movies={movies} />}
      {!loading && error && <p>Something happen, try again later.</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
