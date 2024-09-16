import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import MovieList from '../../components/MovieList';
import { searchMovies } from '../../services/tmdbApi';
import { Movie } from '../../types/movie';

export default function SearchScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    setIsLoading(true);
    try {
      const searchResults = await searchMovies(query, 1);
      setMovies(searchResults);
      setPage(2);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoading || query.trim() === "") return;
    setIsLoading(true);
    try {
      const newMovies = await searchMovies(query, page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        placeholder="Search movies..."
        returnKeyType="search"
      />
      <MovieList
        movies={movies}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});