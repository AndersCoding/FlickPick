import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSavedMovies } from "../store/useSavedMovies";

const SettingsScreen = () => {
  const { savedMovies, loadMovies, removeMovie, clearMovies } =
    useSavedMovies();

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎬 Stored movies</Text>

        {savedMovies.length === 0 ? (
          <Text style={styles.placeholder}>(No movies stored, yet)</Text>
        ) : (
          <FlatList
            data={savedMovies}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 8 }}>
                <Text>{item.Title}</Text>
                <Pressable onPress={() => removeMovie(item.imdbID)}>
                  <Text style={{ color: "red" }}>🗑️ Slett</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>

      <Pressable
        onPress={clearMovies}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#ddd" : "#eee" },
          { padding: 16, borderRadius: 8 },
        ]}
      >
        <Text>🧹 Clear stored movies</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white", // eller dynamic theme senere
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  placeholder: {
    color: "gray",
  },
});
