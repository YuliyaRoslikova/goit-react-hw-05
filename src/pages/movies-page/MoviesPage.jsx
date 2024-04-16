import { useSearchParams } from 'react-router-dom';
import { Filter } from '../../components/filter/Filter';
import { useEffect, useState } from 'react';
import { searchMovie } from '../../api/movie-api';
import MovieList from '../../components/movie-list/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(() => params.get('query') ?? '');

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await searchMovie(query, 1);
        setMovies(data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const onFilter = newQuery => {
    setQuery(newQuery);
    params.set('query', newQuery);
    setParams(params);
  };

  return (
    <div>
      <Filter setQuery={onFilter} />

      {movies && !loading && !error && <MovieList movies={movies} />}
      {movies?.length === 0 && !loading && !error && (
        <p>Nothing found, change query and try again.</p>
      )}
      {!loading && error && <p>Something happen, try again later.</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MoviesPage;
