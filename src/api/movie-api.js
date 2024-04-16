import axios from 'axios';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDM0Yzg3MzQ3Nzg3ZmZjOGFkNWI0ODA4ZmIz' +
  'MjE1MCIsInN1YiI6IjY2MTdiMjBjZTI5NWI0MDE3ZGFmN2EyMSIsInNjb3BlcyI6WyJhc' +
  'GlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._cVQYKt0OmayvmGIh7EhKPa8hDwjDNQlnxCCX6neUzM';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: 'application/json',
  },
});

export async function getTrending() {
  return instance.get('trending/movie/day?language=en-US').then(res => res.data);
}

export async function getMovie(movieId) {
  return instance.get(`/movie/${movieId}?language=en-US`).then(res => res.data);
}

export async function getMovieCredits(movieId) {
  return instance.get(`/movie/${movieId}/credits?language=en-US`).then(res => res.data);
}

export async function getMovieReviews(movieId) {
  return instance.get(`/movie/${movieId}/reviews?language=en-US`).then(res => res.data);
}

export async function searchMovie(query, page = 1) {
  return instance
    .get(`/search/movie?query=${query}&language=en-US&page=${page}`)
    .then(res => res.data);
}
