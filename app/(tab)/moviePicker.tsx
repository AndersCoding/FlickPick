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

  const index = Math.floor(Math.random() * savedMovies.length);
  setPickedMovie(savedMovies[index]);
};
const acceptRecommendation = () => {
  if (pickedMovie) {
    removeMovie(pickedMovie.imdbID);
    setPickedMovie(null);
  }
};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velg en tilfeldig film</Text>

      <Pressable onPress={pickRandomMovie} style={styles.button}>
        <Text style={styles.buttonText}>Trykk for å velge film</Text>
      </Pressable>

      {pickedMovie ? (
        <View style={styles.result}>
          <Text style={styles.movieTitle}>{pickedMovie.Title}</Text>
          <Text>
            {pickedMovie.Year} – {pickedMovie.Type}
          </Text>
          <Pressable
            onPress={acceptRecommendation}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>✅ Godtatt anbefaling</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.placeholder}>Ingen filmer valgt ennå</Text>
      )}
    </View>
  );
}

export default moviePicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "dodgerblue",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  result: {
    alignItems: "center",
  },
  placeholder: {
    marginTop: 20,
    fontStyle: "italic",
    color: "gray",
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  confirmText: {
    color: "white",
    fontWeight: "bold",
  },
});