import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Movie } from "../types/Movie";

interface Props {
  movie: Movie;
  onPress: () => void;
  extraAction?: React.ReactNode;
}

export default function MovieCard({ movie, onPress, extraAction }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: movie.Poster }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{movie.Title}</Text>
          {extraAction}
        </View>
        <Text>
          {movie.Year} – {movie.Type}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", marginVertical: 8 },
  image: { width: 80, height: 120, borderRadius: 8 },
  info: { marginLeft: 12, justifyContent: "center", flex: 1 },
  title: { fontWeight: "bold", fontSize: 16 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
