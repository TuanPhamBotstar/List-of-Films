// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Movie } from './../models/movie.class'

// Section 2
export const LOAD_MOVIE = '[MOVIE] Load Movies';
export const LOAD_MOVIE_SUCCESS = '[MOVIE] Load Movies Success';
export const LOAD_MOVIE_FAILURE = '[MOVIE] Load Movies Failure';
export const ADD_MOVIE = '[MOVIE] Add Movie';
export const ADD_MOVIE_SUCCESS = '[MOVIE] Add Movie Success';
export const ADD_MOVIE_FAILURE = '[MOVIE] Add Movie Failure';
export const REMOVE_MOVIE = '[MOVIE] Remove Movie';
export const REMOVE_MOVIE_SUCCESS = '[MOVIE] Remove Movie Success';
export const REMOVE_MOVIE_FAILURE = '[MOVIE] Remove Movie Failure';
export const SAVE_MOVIE = '[MOVIE] Save Movie';
export const SAVE_MOVIE_SUCCESS = '[MOVIE] Save Movie Success';
export const SAVE_MOVIE_FAILURE = '[MOVIE] Save Movie Failure';

export const LOAD_ONE_PAGE = '[MOVIE] Load One Page';
export const LOAD_ONE_PAGE_SUCCESS = '[MOVIE] Load One Page Success';
export const LOAD_ONE_PAGE_FAILURE = '[MOVIE] Load One Page Failure';
// Load Movies
export class LoadMovie implements Action {
    readonly type = LOAD_MOVIE

    // constructor(public no: number) { }
}
export class LoadMovieSuccess implements Action {
    readonly type = LOAD_MOVIE_SUCCESS;

    constructor(public payload: any) { }
}
export class LoadMovieFailure implements Action {
    readonly type = LOAD_MOVIE_FAILURE

    constructor(public payload: Error) { }
}
// add Movie
export class AddMovie implements Action {
    readonly type = ADD_MOVIE

    constructor(public payload: Movie) { }
}
export class AddMovieSucess implements Action {
    readonly type = ADD_MOVIE_SUCCESS

    constructor(public payload: Movie) { }
}
export class AddMovieFailure implements Action {
    readonly type = ADD_MOVIE_FAILURE

    constructor(public payload: Error) { }
}
// remove movie

export class RemoveMovie implements Action {
    readonly type = REMOVE_MOVIE

    constructor(public payload: string) { }
}
export class RemoveMovieSuccess implements Action {
    readonly type = REMOVE_MOVIE_SUCCESS

    constructor(public payload: string) { }
}
export class RemoveMovieFailure implements Action {
    readonly type = REMOVE_MOVIE_FAILURE

    constructor(public payload: Error) { }
}
// SAVE movie
export class SaveMovie implements Action {
    readonly type = SAVE_MOVIE

    constructor(public payload: Movie) { }
}
export class SaveMovieSuccess implements Action {
    readonly type = SAVE_MOVIE_SUCCESS

    constructor(public payload: Movie) { }
}
export class SaveMovieFailure implements Action {
    readonly type = SAVE_MOVIE_FAILURE

    constructor(public payload: Error) { }
}

// load one page
export class LoadOnePage implements Action {
    readonly type = LOAD_ONE_PAGE;

    constructor(public no: any) { }
}
export class LoadOnePageSuccess implements Action {
    readonly type = LOAD_ONE_PAGE_SUCCESS

    constructor(public payload: {}, public no: any) { }
}
export class LoadOnePageFailure implements Action {
    readonly type = LOAD_ONE_PAGE_FAILURE

    constructor(public payload: Error) { }
}

// export
export type action = LoadMovie | LoadMovieSuccess | LoadMovieFailure |
    RemoveMovie | RemoveMovieSuccess | RemoveMovieFailure |
    AddMovie | AddMovieSucess | AddMovieFailure |
    SaveMovie | SaveMovieSuccess | SaveMovieFailure |
    LoadOnePage | LoadOnePageSuccess | LoadOnePageFailure