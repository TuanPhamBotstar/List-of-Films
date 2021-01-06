import { Movie } from '../models/movie.class';

export interface AppState {
  readonly movie: Movie[];
}