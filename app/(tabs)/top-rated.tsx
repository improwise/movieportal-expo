// app/(tabs)/top-rated.tsx

import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MovieList from "../../components/MovieList";
import { getTopRatedMovies } from "../../services/tmdbApi";
import { Movie } from "../../types/movie";

export default function TopRatedMoviesScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newMovies = await getTopRatedMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <MovieList
        movies={movies}
        onLoadMore={fetchMovies}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
