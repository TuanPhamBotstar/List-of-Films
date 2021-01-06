import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-validate',
  templateUrl: './error-validate.component.html',
  styleUrls: ['./error-validate.component.css']
})
export class ErrorValidateComponent implements OnInit {
  @Input('control') control;

  constructor() { }

  ngOnInit(): void {
  }

  get message(){
    for(let err in this.control.errors){
      if(this.control.dirty){
        console.log(err);
        return this.getErrorMesage(err,this.control[err]);
      }
    }

  }
  getErrorMesage(err,value){
    let message={
      'required':`Username is required`,
      // 'minlength':`Minlength ${value.requiredLength} character`
    };
    return message[err];
  }

}
