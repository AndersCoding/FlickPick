import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getMovieById } from "@/app/services/movieApi";
import { MovieDetail } from "@/app/types/Movie";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native"; // Legg til import

export default function DetailScreen() {
  const router = useRouter(); // 🔙 Tilbake-funksjon
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieById(id as string);
      setMovie(data as MovieDetail);
    };
    fetchDetails();
  }, []);

  if (!movie) return <Text>Laster...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>Tilbake</Text>
      </Pressable>
      <Image source={{ uri: movie.Poster }} style={styles.image} />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text>
        {movie.Genre} – {movie.Runtime}
      </Text>
      <Text>📽️ {movie.Director}</Text>
      <Text style={styles.plot}>{movie.Plot}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  back: {
    marginBottom: 12,
    color: "blue",
    fontSize: 16,
  },
  image: { width: "100%", height: 500, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 12 },
  plot: { marginTop: 10, fontSize: 16 },
});
