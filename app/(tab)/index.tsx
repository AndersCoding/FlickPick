import { FlatList, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { searchMovies } from "../services/movieApi";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import { useRouter } from "expo-router";
import { useMovieStore } from "../store/useMovieStore";
import { useSavedMovies } from "../store/useSavedMovies";
import {Ionicons} from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const query = useMovieStore((state) => state.query);
  const setQuery = useMovieStore((state) => state.setQuery);
  const movies = useMovieStore((state) => state.movies);
  const setMovies = useMovieStore((state) => state.setMovies);
  const saveMovie = useSavedMovies((state) => state.saveMovie);
  const savedMovies = useSavedMovies((state) => state.savedMovies);
  const removeMovie = useSavedMovies((state) => state.removeMovie);

  const isSaved = (movie: Movie) =>
    savedMovies.some((m) => m.imdbID === movie.imdbID);

  const toggleSave = (movie: Movie) => {
    isSaved(movie) ? removeMovie(movie.imdbID) : saveMovie(movie);
  };


  const handleSearch = async () => {
    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
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
            // 🔽 Lagre ved å trykke på filmikonet:
            extraAction={
              <Text onPress={() => saveMovie(item)} style={styles.saveIcon}>
                <Ionicons
                  name={isSaved(item) ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={isSaved(item) ? "dodgerblue" : "gray"}
                  onPress={() => toggleSave(item)}
                  style={styles.saveIcon}
                />
              </Text>
            }
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveIcon: {
    fontSize: 40,
    marginLeft: 12,
  },
});
