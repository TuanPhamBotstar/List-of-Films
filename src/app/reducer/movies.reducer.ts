import { createSelector, createFeatureSelector  } from '@ngrx/store'
import { Movie } from './../models/movie.class'
import * as MovieActions from './../action/movies.actions'


export interface MovieState {
    list: Movie[],
    loading: boolean,
    error: Error
}
const initialState: MovieState = {
    list: [],
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
            return {
                ...state,
                list: action.payload,
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
                list: state.list.filter(item => item._id !== action.payload),
                loading: true
            };
        case MovieActions.REMOVE_MOVIE_SUCCESS:
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
        case MovieActions.SAVE_MOVIE:
            return {
                ...state,
                loading: true,
            }
        case MovieActions.SAVE_MOVIE_SUCCESS:
            let newList = [...state.list]
            for (let i in newList) {
                if (newList[i]._id === action.payload._id) {
                    newList.splice(+i, 1, action.payload)
                    // newList[i].name=action.payload.name
                    // newList[i].link=action.payload.link
                    // newList[i].author=action.payload.author
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
        // let delList=[...state];
        // delList.splice(action.payload,1);
        // return delList;
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



