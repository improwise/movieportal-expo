// components/MovieCard.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { Movie, Genre } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  genres?: Genre[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres = [] }) => {
  const { width } = useWindowDimensions();
  const numColumns = Math.floor(width / 150); // 150 is minimum card width
  const cardWidth = width / numColumns - 16; // 16 is total horizontal margin

  const movieGenres =
    genres.length > 0
      ? genres
          .filter((genre) => movie.genre_ids.includes(genre.id))
          .map((genre) => genre.name)
          .slice(0, 2) // Limit to 2 genres for space
          .join(", ")
      : "";

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={[styles.poster, { height: cardWidth * 1.5 }]}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          {movieGenres ? (
            <Text style={styles.genres} numberOfLines={1}>
              {movieGenres}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    resizeMode: "cover",
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  genres: {
    fontSize: 12,
    color: "#666",
  },
});

export default MovieCard;
