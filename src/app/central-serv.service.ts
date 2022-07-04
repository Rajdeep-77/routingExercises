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

  // This function sets an array of items from display that are added for menu
  setDisplay(element: restaurantItem){
    // this.arrayOfMenu.push(element);
    this.arrayOfMenu.push(element);
    // console.log("The element we got is: "+ JSON.stringify(element));
  }

  // This function gets an array of items from display that are added for menu
  getDisplay(){
   return this.arrayOfMenu;
  }

  // This function gets an array of items from restaurant component
  setItemArray(itemArray:Array<restaurantItem>){
    this.arrayOfItems=itemArray;
  }

  // This function returns an array of items from restaurant component
  getItemArray(){
    return this.arrayOfItems;
  }
}
