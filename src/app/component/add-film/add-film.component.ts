import { Component, OnInit, Input, Output, EventEmitter, resolveForwardRef } from '@angular/core';
import { LogingService } from './../../services/loging.service';
import { Movie } from './../../models/movie.class';
import { Subscription } from 'rxjs/Subscription';
//NgRx
import { resultMemoize, Store } from '@ngrx/store';
import { AppState } from '../../state/moives.state';
import * as Actions from '../../action/movies.actions';
import { Observable} from 'rxjs/observable';
//reactive forms
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit{
  public movies:Movie[];
  public subscription:Subscription;
  public frmFilm:FormGroup
  //movies:Movie[];
  // @Input('isShowAddBox') isShowAddBox:boolean=false;
  // @Output() isHideAddBox = new EventEmitter<string>();
  constructor(
    public add:LogingService,
    private store:Store<AppState>,
    private formBuilder:FormBuilder
    ) {
    store.select('movie').subscribe(res=>{
      //this.movies=res;
    });
   }

  ngOnInit(): void {
    this.createForm();
    this.store.select('movie').subscribe(data=>this.movies=data['list']);
  }
  
  addFilm(id:number,name:string,link:string,author:string):void{
    let movie =new Movie('',id,name,link,author,true,false);
      console.log(movie);
      this.store.dispatch(new Actions.AddMovie(movie));
      this.store.dispatch(new Actions.LoadMovie());
      console.log(this.movies);
      this.onReset();
  }   

  createForm(){
    this.frmFilm=this.formBuilder.group(
      {
        name:['',[Validators.required]],
        link:['',[Validators.required]],
        author:['',[Validators.required]],
      }
    );
  }
  onSubmitForm(id:number,name:string,link:string,author:string):void{
    console.log(this.frmFilm);
    let movie =new Movie('',id,name,link,author,true,false);
      console.log(movie);
      this.store.dispatch(new Actions.AddMovie(movie));
      this.store.dispatch(new Actions.LoadMovie());
      console.log(this.movies);
      this.onReset();

  }
  onReset(){
    this.frmFilm.reset();
  }

  // passStatus(value:boolean){
  //   this.isHideAddBox.emit(!value);
  // }
}
