// app/(tabs)/index.tsx

import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import MovieList from "../../components/MovieList";
import { getPopularMovies } from "../../services/tmdbApi";
import { Movie } from "../../types/movie";

export default function PopularMoviesScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newMovies = await getPopularMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MovieList
        movies={movies}
        onLoadMore={fetchMovies}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
