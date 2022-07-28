import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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


  
  constructor(private http:HttpClient) { }
  itemSubject = new Subject<Array<restaurantItem>>() ;

  arrayOfMenu:Array<restaurantItem> = [];
  arrayOfItems:restaurantItem[] = [];
  serverNameArray=[]
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
    // this.http.delete('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json');

    // for(let i=0; i<=this.arrayOfItems.length; i++){
      // const obj = this.arrayOfItems[i];
      this.http.put('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json',arrServer, { headers: new HttpHeaders({'HeaderSettedDuring':'put'}) })
               .subscribe(response => { console.log(response);});
    // }
    
  }

  
  // This function gets data from server
  getServerData(){
    this.http.get<restaurantItem[]>('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json')
             .pipe( map( (item) => { 
                          // const tempArray =[];
                          // for(const key in item){
                            // if(item.hasOwnProperty(key)){ tempArray.push( { ...item[key] } ); } }
                            // return tempArray;   }))
                            return item.map( it => { return {...it}; });   }),
                            tap( recipes => { this.setItemArray(recipes); }))
             .subscribe(tarr => { 
                                  this.itemSubject.next(tarr.filter(element => {
                                      if (Object.keys(element).length !== 0) {
                                        return true;
                                      }
                                    
                                      return false;
                                    }))
                                  // this.arrayOfItems = tarr; 
                                  // this.displayItem.detailArray = tarr; 
                                } );
  }

  // This function deletes particular data from server
  onDeletePost(index){
    console.log(index);
    this.http.delete(`https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food/${index}.json`).subscribe();

  // this.http.put( 'https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json', this.arrayOfItems).subscribe(response => {console.log(response);});

    // firebase.database().ref().child('/food/'+id+'/').remove();
  }

}
