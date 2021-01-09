import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
//service
import {LogingService} from './services/loging.service';
  import { from } from 'rxjs';
import { FilmsComponent } from './component/films/films.component';
import { EditFilmComponent } from './component/edit-film/edit-film.component';
import { AddFilmComponent } from './component/add-film/add-film.component';
import { HighLightDirective } from './directive/high-light.directive';
//server
import {HttpClient, HttpClientModule} from '@angular/common/http';
//Custorm Pipe
import {titleCase} from './titleCase.pipe';
//Reactive Forms
import {ReactiveFormsModule} from '@angular/forms';
import { ReactiveFormComponent } from './component/reactive-form/reactive-form.component';
import { ErrorValidateComponent } from './component/error-validate/error-validate.component';
//NgRx
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer/movies.reducer';
// NgRx store-devtool
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
//ngrx effect
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects} from './Effects/movie.effects';
import { TemplateDrivenFormsComponent } from './component/template-driven-forms/template-driven-forms.component';
const taskRoutes:Routes=[
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'addFilm',
    component:AddFilmComponent
  },
  {
    path:'editFilm/:id',
    component:EditFilmComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    EditFilmComponent,
    AddFilmComponent,
    HighLightDirective,
    titleCase,
    ReactiveFormComponent,
    ErrorValidateComponent,
    TemplateDrivenFormsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HighLightDirective,
    HttpClientModule,
    AppRoutingModule,              
    RouterModule.forRoot(taskRoutes),
    ReactiveFormsModule,
    StoreModule.forRoot({
      movie: reducer,
    },{
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    // LogingService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
