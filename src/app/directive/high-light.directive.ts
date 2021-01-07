import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  @Input('appHighLight') highLightColor:string;
  constructor(element:ElementRef) {
    console.log(Element);
    element.nativeElement.style.backgroundColor ='yellow';
   }

}
