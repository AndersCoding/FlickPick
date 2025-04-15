import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Movie } from "../types/Movie";

type SavedMoviesStore = {
  savedMovies: Movie[];
  loadMovies: () => void;
  saveMovie: (movie: Movie) => void;
  removeMovie: (id: string) => void;
  clearMovies: () => void;
};

export const useSavedMovies = create<SavedMoviesStore>((set) => ({
  savedMovies: [],
  loadMovies: async () => {
    const json = await AsyncStorage.getItem("savedMovies");
    if (json) {
      set({ savedMovies: JSON.parse(json) });
    }
  },
  saveMovie: async (movie) => {
    set((state) => {
      const alreadySaved = state.savedMovies.some(
        (m) => m.imdbID === movie.imdbID
      );
      if (alreadySaved) return state;

      const updated = [...state.savedMovies, movie];
      AsyncStorage.setItem("savedMovies", JSON.stringify(updated));
      return { savedMovies: updated };
    });
  },
  removeMovie: async (id) => {
    set((state) => {
      const updated = state.savedMovies.filter((m) => m.imdbID !== id);
      AsyncStorage.setItem("savedMovies", JSON.stringify(updated));
      return { savedMovies: updated };
    });
  },
  clearMovies: async () => {
    await AsyncStorage.removeItem("savedMovies");
    set({ savedMovies: [] });
  },
}));
