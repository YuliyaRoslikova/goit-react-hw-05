import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../navigation/Navigation';
import css from './App.module.css';

const HomePage = lazy(() => import('../../pages/home-page/HomePage'));
const MoviesPage = lazy(() => import('../../pages/movies-page/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/movie-details-page/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/not-found-page/NotFoundPage'));
const MovieCast = lazy(() => import('../movie-cast/MovieCast'));
const MovieReviews = lazy(() => import('../movie-reviews/MovieReviews'));

const App = () => {
  return (
    <div>
      <header className={css.header}>
        <Navigation />
      </header>

      <main className={css.main}>
        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
