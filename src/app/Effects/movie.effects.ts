import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogingService } from '../services/loging.service';
//self
import * as MovieActions from './../action/movies.actions'
@Injectable()
export class MovieEffects {

  @Effect() loadMovies$ = this.actions$.pipe(
    ofType(MovieActions.LOAD_MOVIE),
    mergeMap((action:MovieActions.LoadMovie) => this.moviesService.getMoviesFromServer()
      .pipe(
        map((data) =>  new MovieActions.LoadMovieSuccess(data)),
        catchError(error => of(new MovieActions.LoadMovieFailure(error)))
      ))
  );

  @Effect() loadOnePage$ = this.actions$.pipe(
    ofType(MovieActions.LOAD_ONE_PAGE),
    mergeMap((action:MovieActions.LoadOnePage) => this.moviesService.getOnePage(action.no)
      .pipe(
        map(data =>  new MovieActions.LoadOnePageSuccess(data, action.no)),
        catchError(error => of(new MovieActions.LoadOnePageFailure(error)))
      ))
  );

  @Effect() addMovies$ = this.actions$.pipe(
    ofType(MovieActions.ADD_MOVIE),
    mergeMap((action:MovieActions.AddMovie) => this.moviesService.addMovie(action.payload)
      .pipe(
        map(() => new MovieActions.AddMovieSucess(action.payload)),
        catchError(error => of(new MovieActions.AddMovieFailure(error)))
      ))
  );
  
  @Effect() delMovies$ = this.actions$.pipe(
    ofType('[MOVIE] Remove Movie'),
    mergeMap((action:MovieActions.RemoveMovie) => this.moviesService.delMovie(action.payload)
      .pipe(
        map(() => new MovieActions.RemoveMovieSuccess(action.payload)),
        catchError(error => of(new MovieActions.RemoveMovieFailure(error)))
      ))
  );

  @Effect() saveMovie$ = this.actions$.pipe(
    ofType(MovieActions.SAVE_MOVIE),
    mergeMap(
      (action:MovieActions.SaveMovie) => this.moviesService.saveMovie(action.payload._id,action.payload)
      .pipe(
          map(
            () => new MovieActions.SaveMovieSuccess(action.payload)
          ),
          catchError(error => of(new MovieActions.SaveMovieFailure(error)))
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private moviesService: LogingService
  ) {}
}
