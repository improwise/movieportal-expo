// types/movie.ts

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  cast: { id: number; name: string; character: string }[];
}

export interface Genre {
  id: number;
  name: string;
}