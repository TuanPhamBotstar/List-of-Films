import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  constructor(Element:ElementRef) {
    console.log(Element);
    Element.nativeElement.style.backgroundColor ='yellow';
   }

}
