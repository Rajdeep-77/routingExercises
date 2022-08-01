import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from "rxjs/operators";
// import * as firebase from '@angular/fire';

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

  itemSubject = new Subject<Array<restaurantItem>>() ;
  arrayOfMenu:Array<restaurantItem> = [];
  arrayOfItems:restaurantItem[] = [];
  serverNameArray = [];
  
  constructor(private http:HttpClient) { 
    this.http.get<restaurantItem[]>('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/menu.json').subscribe(arr => { this.arrayOfMenu =arr;});
  }
  

  // This function sets an array of items from display that are added for menu
  setDisplay(elementArray: restaurantItem[]){
    this.arrayOfMenu = elementArray;
  }

  
  // This function gets an array of items from display that are added for menu
  getDisplay(){
   return this.arrayOfMenu;
  }

  
  // This function gets an array of items from restaurant component
  setItemArray(itemArray:Array<restaurantItem>){
    this.arrayOfItems=itemArray.filter(element => {
        if (Object.keys(element).length !== 0) {
          return true;
        }
      
        return false;
  })
}

  
  // This function returns an array of items from restaurant component
  getItemArray(){
    return this.arrayOfItems;
  }

  
  // This function sets data in server
  setServerData(arrServer){
      this.http.put('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json',arrServer, { headers: new HttpHeaders({'HeaderSettedDuring':'put'}) })
               .subscribe(response => { console.log(response);});
    
  }

  
  // This function gets data from server
  getServerData(){
    this.http.get<restaurantItem[]>('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json')
             .pipe( map( (item) => { 
                            return item.map( it => { return {...it}; });   }),
                            tap( recipes => { this.setItemArray(recipes); }))
             .subscribe(tarr => { 
                                  this.itemSubject.next(tarr.filter(element => {
                                      if (Object.keys(element).length !== 0) {
                                        return true;
                                      }
                                    
                                      return false;
                                    }))
                                } );
  }

  // This function deletes particular data from server
  onDeletePost(index){
    console.log(index);
    this.http.delete(`https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food/${index}.json`).subscribe();
  }

}
