import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { searchMovies } from "../services/movieApi";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import { useRouter } from "expo-router";
import { useMovieStore } from "../store/useMovieStore";

export default function HomeScreen() {
  const router = useRouter();
  const query = useMovieStore((state) => state.query);
  const setQuery = useMovieStore((state) => state.setQuery);
  const movies = useMovieStore((state) => state.movies);
  const setMovies = useMovieStore((state) => state.setMovies);

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Søk etter filmer..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => router.push(`/movie/${item.imdbID}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
});
