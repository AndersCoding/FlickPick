import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from "react";
import React from 'react'
import { useSavedMovies } from "../store/useSavedMovies";
import { Movie } from '../types/Movie';


// Randomly select a movie from a list of movies
const moviePicker = () => {

// Starting with an empty number
const [number, setNumber] = useState(0)
const savedMovies = useSavedMovies((state) => state.savedMovies);
const removeMovie = useSavedMovies((state) => state.removeMovie);


const [pickedMovie, setPickedMovie] = useState<Movie | null>(null);

const pickRandomMovie = () => {
  if (savedMovies.length === 0) {
    setPickedMovie(null);
    return;
  }

  // Filtrer bort nåværende film fra listen
  const availableMovies = pickedMovie
    ? savedMovies.filter((m) => m.imdbID !== pickedMovie.imdbID)
    : savedMovies;

  // Hvis bare én film er igjen og det er den samme → ikke gjør noe
  if (availableMovies.length === 0) return;

  const index = Math.floor(Math.random() * availableMovies.length);
  setPickedMovie(availableMovies[index]);
};

const acceptRecommendation = () => {
  if (pickedMovie) {
    removeMovie(pickedMovie.imdbID);
    setPickedMovie(null);
  }
};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a random movie</Text>

      <View style={styles.content}>
        {pickedMovie ? (
          <View style={styles.result}>
            <Text style={styles.movieTitle}>{pickedMovie.Title}</Text>
            <Text>
              {pickedMovie.Year} – {pickedMovie.Type}
            </Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>No movies stored</Text>
        )}
      </View>

      <View style={styles.footer}>
        <Pressable onPress={pickRandomMovie} style={styles.button}>
          <Text style={styles.buttonText}>Press to choose movie</Text>
        </Pressable>

        {pickedMovie && (
          <Pressable
            onPress={acceptRecommendation}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>Accept recommendation</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default moviePicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginBottom: 40,
    alignItems: "center",
  },
  button: {
    padding: 12,
    backgroundColor: "dodgerblue",
    borderRadius: 8,
    marginBottom: 12,
    width: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    width: 220,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    fontWeight: "bold",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  placeholder: {
    fontStyle: "italic",
    color: "gray",
  },
  result: {
    alignItems: "center",
  },
});