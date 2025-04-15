import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Innstillinger</Text>

      {/* 🎥 Her kan du vise lagrede filmer senere */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎬 Lagrede filmer</Text>
        <Text style={styles.placeholder}>(Ingen filmer lagret ennå)</Text>
      </View>

      {/* Her kan du legge til flere innstillinger senere */}
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
