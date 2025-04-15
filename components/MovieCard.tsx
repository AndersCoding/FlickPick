import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Movie } from "@/app/types/Movie";
import { useRouter } from "expo-router";

interface Props {
  movie: Movie;
  onPress: () => void;
}

export default function MovieCard({ movie, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: movie.Poster }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.Title}</Text>
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
});
