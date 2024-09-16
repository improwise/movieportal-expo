// app/movie/[id].tsx

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getMovieDetails } from "../../services/tmdbApi";
import { MovieDetails } from "../../types/movie";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(Number(id));
        setMovie(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: movie.title }} />
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>
          {new Date(movie.release_date).getFullYear()}
        </Text>
        <Text style={styles.genres}>
          {movie.genres.map((g) => g.name).join(", ")}
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.sectionTitle}>Cast</Text>
        {movie.cast.map((actor) => (
          <Text key={actor.id} style={styles.castMember}>
            {actor.name} as {actor.character}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  poster: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  year: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  genres: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  castMember: {
    fontSize: 16,
    marginBottom: 4,
  },
});
