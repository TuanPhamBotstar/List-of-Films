//import { Movie } from './models/movie.class';
import { MovieState } from './reducer/movies.reducer'; 
export interface AppState {
  readonly movie: MovieState;
}