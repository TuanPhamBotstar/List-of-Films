  import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogingService } from './../../services/loging.service';
import { Movie } from './../../models/movie.class';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/moives.state';
import * as Actions from '../../action/movies.actions';
//reactive forms
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
//get id from URL
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css'],
  // providers:[FormBuilder]
})
export class EditFilmComponent implements OnInit, OnDestroy {
  public _id: string;
  public page: number;
  public movie: Movie;
  movies: Movie[];
  temp: number;
  public frmFilm: FormGroup;
  public subscription: Subscription;
  public formBuilder: FormBuilder;
  // @Input('isShowEditBox') isShowEditBox:boolean=false;
  // @Output() isHideEditBox =new EventEmitter<boolean>();
  constructor(
    public moviesService: LogingService,
    private store: Store<AppState>,
    // private formBuilder: FormBuilder, 
    public activateRouter: ActivatedRoute,
    public routeService: Router
  ) {

  }
  ngOnInit(): void {
    this.formBuilder = new FormBuilder();
    this.moviesService.getMovieById('5ffbdbc3d974b525f090dffc')
      .subscribe(data => {
        console.log(data);
      });
    this.subscription = this.activateRouter.params
      .subscribe(data => {
        this._id = data.id;
        this.getMovie(data.id);
      });
    console.log(this._id)
    this.activateRouter.queryParams
      .subscribe(data => {
        this.temp = this.page == 1 ? 1 : 2;
        this.page = data.page;
        // if (this.temp != data.page) {
        //   let type = this.temp == 1 ? 2 : 1;
        //   this.routeService.navigate(['/'], { queryParams: { page: type } });
        // }
        // this.temp = this.page;
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //get Movie By Id
  getMovie(_id: string) {
    this.moviesService.getMovieById(_id)
      .subscribe(data => {
        this.movie = data[0];
        console.log(this.movie);
        this.createForm();
      });
  }

  createForm() {

    this.frmFilm = this.formBuilder.group(                 // formBuilder is a service, 
      {
        name: [this.movie.name, [Validators.required]],
        link: [this.movie.link, [Validators.required]],
        author: [this.movie.author, [Validators.required]],
      }
    );
    //   this.frmFilm = new FormGroup({
    //     "name": new FormControl(this.movie.name, Validators.required),
    //     "link": new FormControl(this.movie.link, Validators.required),
    //     "author": new FormControl(this.movie.author, Validators.required),
    //   });
    //   this.frmFilm.controls.name.setValue('TEST')
    console.log(this.frmFilm.controls);
    this.frmFilm.valueChanges.subscribe(data => { console.log(data) });
  }

  onSubmitForm() {
    console.log(this.frmFilm.value);
    console.log(this.frmFilm.controls);
    let movieInfo = this.frmFilm.value;
    let page = this.movie.page;
    let _id = this.movie._id;
    this.movie = new Movie(_id, page, movieInfo.name, movieInfo.link, movieInfo.author, true, false);
    this.moviesService.ngSaveMovie(this.movie);
  }
  onReset() {
    this.frmFilm.reset();
  }

}
