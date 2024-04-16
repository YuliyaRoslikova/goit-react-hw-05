import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/movie-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!params.movieId) return;
      setLoading(true);
      setError(false);

      try {
        const data = await getMovieReviews(params.movieId);
        setReviews(data.results);
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
      {reviews.length > 0 && !loading && !error && (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.id} className={css.review}>
                <h3 className={css.title}>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {reviews.length === 0 && !loading && !error && (
        <p>We do not have any reviews for this movie.</p>
      )}
      {!loading && error && <p>Something happen, try again later.</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MovieReviews;
