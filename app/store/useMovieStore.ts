import { create } from "zustand";
import { Movie } from "@/app/types/Movie";

type MovieStore = {
  query: string;
  setQuery: (query: string) => void;
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};

export const useMovieStore = create<MovieStore>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  movies: [],
  setMovies: (movies) => set({ movies }),
}));
