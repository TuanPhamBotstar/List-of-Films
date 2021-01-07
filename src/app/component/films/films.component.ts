import { Component, OnInit, DoCheck } from '@angular/core';

import { LogingService } from './../../services/loging.service';
import { Movie } from './../../models/movie.class';
//server
import { Subscription } from 'rxjs/Subscription';
//NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../state/moives.state';
import * as Actions from '../../action/movies.actions';
import { Observable } from 'rxjs/observable';
import { Action } from 'rxjs/internal/scheduler/Action';
//pagination
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  public subscription: Subscription;//server
  public txthl: string = "";
  public nameSearch: string = "";
  public movie: Movie;
  movies: Movie[];
  no: number = 1;
  _id: string;
  page: number;
  constructor(
    private moviesService: LogingService,
    private store: Store<AppState>,
    public routerService: Router,
    public activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    
    this.moviesService.ngLoadMovie();
    this.moviesService.ngGetMovies()
      .subscribe(data => {
        this.movies = data['list']
        this.page = this.movies.length % 5 == 0 ? this.movies.length / 5 :
          1 + (this.movies.length - this.movies.length % 5) / 5;
      });
    this.activatedRoute.queryParams
      .subscribe(data => { 
        console.log(data.page); 
        this.no = data.page ? data.page : this.no; console.log(this.no) 
      });
      
  }

  //search and highlight match character
  search(value: string) {
    let filter = value.toUpperCase();
    this.movies.forEach((movie) => {
      let name = movie.name;
      let NAME = name.toUpperCase();
      let idx = NAME.indexOf(filter);
      if (idx > -1 && value) {
        this.txthl = name.replace(
          name.slice(idx, idx + filter.length), `<strong>${name.slice(idx, idx + filter.length)}</strong>`);
        console.log(this.txthl);
        movie.show = true;
        // console.log(movie.hl)
        movie.hl = true;
      }
      else if (value == '') {
        movie.show = true;
        movie.hl = false;
      }
      else {
        movie.show = false;
        movie.hl = false;
      }
    });
  }

  delFilm(index: number) {
    let id = this.movies[index]._id;
    // this.store.dispatch(new Actions.RemoveMovie(id));
    this.moviesService.ngDelMovie(id);
    console.log(this.movies)
  }

  back() {
    if (this.no > 1) {
      this.no--;
    }
    this.routerService.navigate(['/'], { queryParams: { page: this.no } });
  }
  forward() {
    if (this.no < this.page) {
      this.no++;
      console.log(`no: ${this.no}`)
    }
    this.routerService.navigate(['/'], { queryParams: { page: this.no } });
  }
  goTo(i: number) {
    this.no = i + 1;
    this.routerService.navigate(['/'], { queryParams: { page: this.no } });
  }
  arrayV() {
    return Array(this.page);
  }

}
