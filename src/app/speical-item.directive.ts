import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSpeicalItem]'
})
export class SpeicalItemDirective {

  constructor(
    private elRef:ElementRef,) {
      this.elRef.nativeElement.style.backgroundColor = 'green';
    // elRef.nativeElement.parentElement.parentElement.style.backgroundColor='green';
  }
}
