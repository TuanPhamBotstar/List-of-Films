import { Component, OnInit, Input, Output, EventEmitter, resolveForwardRef } from '@angular/core';
import { LogingService } from './../../services/loging.service';
import { Movie } from './../../models/movie.class';
import { Subscription } from 'rxjs/Subscription';
//NgRx
import { resultMemoize, Store } from '@ngrx/store';
import { AppState } from '../../state/moives.state';
import * as Actions from '../../action/movies.actions';
import { Observable } from 'rxjs/observable';
//reactive forms
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// URL
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  no:number;
  public movieQty: number = 5;
  public movies: Movie[];
  public subscription: Subscription;
  public frmFilm: FormGroup
  //movies:Movie[];
  // @Input('isShowAddBox') isShowAddBox:boolean=false;
  // @Output() isHideAddBox = new EventEmitter<string>();
  constructor(
    public movieService: LogingService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private activaroute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.activaroute.queryParams.subscribe(data => this.no = data.page)
    console.log(this.no)
    this.movieService.ngGetMovies().subscribe(data => this.movies = data['list']);
  }

  createForm() {
    this.frmFilm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        link: ['', [Validators.required]], 
        author: ['', [Validators.required]],
      }
    );
  }
  onSubmitForm(name: string, link: string, author: string): void {
    let totalMovies = this.movies.length + 1;
    let page = this.movies.length == 0 ? 1
      : (totalMovies) % this.movieQty == 0 ? (totalMovies) / this.movieQty
        : 1 + (totalMovies - totalMovies % this.movieQty) / this.movieQty;
    console.log(this.frmFilm);
    let movie = new Movie('', this.no, name, link, author, true, false);
    console.log(movie);
    this.movieService.ngAddMovie(movie);
    this.movieService.ngLoadOnePage(this.no);
    this.movieService.ngLoadMovie();
    console.log(this.movies);
    this.onReset();
  }
  onReset() {
    this.frmFilm.reset();
  }

  // passStatus(value:boolean){
  //   this.isHideAddBox.emit(!value);
  // }
}
