// components/MovieList.tsx

import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet, View } from "react-native";
import MovieCard from "./MovieCard";
import { Movie, Genre } from "../types/movie";
import { getGenres } from "../services/tmdbApi";

interface MovieListProps {
  movies: Movie[];
  onLoadMore: () => void;
  isLoading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onLoadMore,
  isLoading,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <MovieCard movie={item} genres={genres} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default MovieList;
