import axios from "axios";
import { MovieSearchResponse } from "@/app/types/Movie";
import { MovieDetail } from "@/app/types/Movie";

// API key
const API_KEY = "dad109de";
const BASE_URL = "https://www.omdbapi.com/";

// Search movies by title
export const searchMovies = async (query: string) => {
  const response = await axios.get<MovieSearchResponse>(BASE_URL, {
    params: {
      s: query,
      apikey: API_KEY,
    },
  });
  return response.data.Search || [];
};

// Get movie details by ID
export const getMovieById = async (id: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      i: id,
      apikey: API_KEY,
      plot: "full",
    },
  });
  return response.data;
};
