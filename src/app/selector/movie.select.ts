import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state/moives.state';
import { Movie } from '../models/movie.class';
import { Observable } from 'rxjs/observable';

const selectMovie = (state: AppState) => state.movie;

export const selectMovies = createSelector(
  selectMovie,
  (movie) => {
    console.log('tasks in selectors is: ', movie);
    return movie;
  }
);