// Typen for én film
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

// Resultatet fra et søk (OBS: OMDb returnerer en array under "Search")
export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

// Detaljert filminfo
export interface MovieDetail extends Movie {
  Plot: string;
  Genre: string;
  Runtime: string;
  Director: string;
}