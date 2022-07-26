import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";


export interface restaurantItem{
  id: number;
  name: string;
  url:string;
  category:string;
  price:number;
  speciality:boolean
}

@Injectable({ providedIn: 'root' })

export class CentralServService {

  constructor(private http:HttpClient) { }
  itemSubject = new Subject<Array<restaurantItem>>() ;

  arrayOfMenu:Array<restaurantItem> = [];
  arrayOfItems:restaurantItem[] = [];
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

  // This function sets data in server
  setServerData(objToPush){

    this.http.post('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json',objToPush)
    .subscribe((response:restaurantItem) => { this.arrayOfItems.push(response);});
  }

   // This function gets data from server
  getServerData(){
    this.http.get('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json')
    .pipe( map( (item:restaurantItem) => { 
                          const tempArray =[];
                          for(const key in item){
                            if(item.hasOwnProperty(key)){ tempArray.push( { ...item[key] } ); } }
                            return tempArray;   
      })
       ).subscribe(tarr => { 
        this.itemSubject.next(tarr);
         this.arrayOfItems = tarr; 
        } );
  }


}
