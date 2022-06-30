import { Injectable } from '@angular/core';



export interface restaurantItem{
  id: number;
  name: string;
  url:string;
  category:string;
  price:number;
  speciality:boolean
}

@Injectable({
  providedIn: 'root'
})

export class CentralServService {

  constructor() { }

  arrayOfMenu:Array<restaurantItem>=[];
  arrayOfItems:restaurantItem[]=[];
  // a:Array<object>

  getArray(element: restaurantItem){
    // this.arrayOfMenu.push(element);
    this.arrayOfMenu.push(element);
    // console.log("The element we got is: "+ JSON.stringify(element));
  }

  setArray(){
   return this.arrayOfMenu;
  }

  gettingItemArray(itemArray:Array<restaurantItem>){
    this.arrayOfItems=itemArray;
  }

  sendingItemArray(){
    return this.arrayOfItems;
  }
}
