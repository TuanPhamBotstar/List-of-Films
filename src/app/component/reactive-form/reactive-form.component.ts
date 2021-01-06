import { Component, OnInit } from '@angular/core';
//reactive form
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  public frmUser:FormGroup;
  constructor(
    private _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFrom();  
  }
  createFrom(){
    this.frmUser=this._formBuilder.group(
      {
        username:['',[
          Validators.required,
          // Validators.minLength(3)
        ]],
        password:['',Validators.required],
        fullname:[''],
        email:['',Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
        phone:['',Validators.required]
      }
    );
    // this.frmUser.valueChanges.subscribe(data=>{
    //   console.log(data);
    // });
  }

  onSubmitForm(){
    console.log(this.frmUser);
  }
  onResetForm(){
    this.frmUser.reset()
  }
}
