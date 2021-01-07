import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
})
export class TemplateDrivenFormsComponent implements OnInit {

  public userName:string;
  public password:string;
  public fullName:string;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmitForm(){

  }
}
