import { Movie, MovieDetails, Genre } from "../types/movie";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error("Base URL is not set in .env file");
}
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
if (!TMDB_API_KEY) {
  throw new Error("TMDB API key is not set in .env file");
}

const fetchTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  const data = await fetchTMDB("/movie/popular", { page: page.toString() });
  return data.results;
};

export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  const data = await fetchTMDB("/search/movie", {
    query,
    page: page.toString(),
  });
  return data.results;
};

export const getTopRatedMovies = async (page: number = 1): Promise<Movie[]> => {
  const data = await fetchTMDB("/movie/top_rated", { page: page.toString() });
  return data.results;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const data = await fetchTMDB(`/movie/${movieId}`, {
    append_to_response: "credits",
  });
  return {
    ...data,
    cast: data.credits.cast.slice(0, 5),
  };
};

export const getGenres = async (): Promise<Genre[]> => {
  const data = await fetchTMDB("/genre/movie/list");
  return data.genres;
};
