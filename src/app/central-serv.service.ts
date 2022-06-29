import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentralServService {

  constructor() { }

  arrayOfMenu:Array<object>;
  weGot:object;

  getPush(element: object){
    // this.arrayOfMenu.push(element);
    this.weGot=element;
    console.log("The element we got is: "+ JSON.stringify(element));
  }

  sendArray(){
   return this.weGot;
  }

}
