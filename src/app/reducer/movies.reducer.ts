import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Movie } from './../models/movie.class'
import * as MovieActions from './../action/movies.actions'


export interface MovieState {
    list: Movie[],
    total: number,
    loading: boolean,
    error: Error
}
const initialState: MovieState = {
    list: [],
    total: 0,
    loading: false,
    error: undefined
}
export function reducer(state: MovieState = initialState, action: MovieActions.action) {

    switch (action.type) {
        //load Movies
        case MovieActions.LOAD_MOVIE:
            return {
                ...state,
                loading: true
            };
        case MovieActions.LOAD_MOVIE_SUCCESS:
            // console.log(action.payload)
            // let allMovies = action.payload
            // let no = action.no
            // let moviesOnePage = []
            // // moviesOnePage.splice(0,5)
            // console.log(allMovies)
            // let idx = no == 1 ? 0 : (no - 1) * 5
            // for (let i = 0; i < 5; i++) {
            //     if (allMovies[idx]) {
            //         moviesOnePage.push(allMovies[idx])
            //     }
            //     idx++
            // }
            // console.log(moviesOnePage)
            console.log(action.payload.length);
            return {
                ...state,
                // list: action.payload,
                total:action.payload.length,
                loading: false
            }
        case MovieActions.LOAD_MOVIE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        // add movie
        case MovieActions.ADD_MOVIE:
            return {
                ...state,
                // list: [...state.list, action.payload],
                loading: true
            };
        case MovieActions.ADD_MOVIE_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                list: [...state.list, action.payload],
                loading: false
            }
        case MovieActions.ADD_MOVIE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        //remove Movie
        case MovieActions.REMOVE_MOVIE:
            return {
                ...state,
                loading: true
            };
        case MovieActions.REMOVE_MOVIE_SUCCESS:
            console.log(state.list)
            return {
                ...state,
                list: state.list.filter(item => item._id !== action.payload),
                loading: false
            }
        case MovieActions.REMOVE_MOVIE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        // Update moive
        case MovieActions.SAVE_MOVIE:
            return {
                ...state,
                loading: true,
            }
        case MovieActions.SAVE_MOVIE_SUCCESS:
            let newList = [...state.list]
            console.log(action.payload)
            for (let i in newList) {
                if (newList[i]._id === action.payload._id) {
                    newList.splice(+i, 1, action.payload)
                    break
                }

            }

            console.log(newList)
            return {
                ...state,
                list: newList,
                loading: false
            }
        case MovieActions.SAVE_MOVIE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case MovieActions.LOAD_ONE_PAGE:
            return {
                ...state,
                loading: true
            }
        case MovieActions.LOAD_ONE_PAGE_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case MovieActions.LOAD_ONE_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

// Selectors
// export const getMovieState = createFeatureSelector<MovieState>('movie');
// export const getAllMoives = createSelector(
//     getMovieState,
//   (state: MovieState) => {
//     console.log('state now: ', state);
//     return state.list;
//   }
// );



