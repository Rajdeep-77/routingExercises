import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralServService, restaurantItem } from '../central-serv.service';
import { MenuPageComponent } from '../menu-page/menu-page.component';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
  // providers:[CentralServService]
})
export class DisplayItemComponent implements OnInit , OnDestroy{

  
  detailArray:Array<restaurantItem> = [];
  itemForMenu:Array<restaurantItem> = [];
  private subscription:Subscription;
  

  constructor(private centralServ:CentralServService,private http:HttpClient) { }

  async ngOnInit() {
    this.subscription = this.centralServ.itemSubject.subscribe( arr => { this.detailArray = arr; console.log(this.detailArray) }) ;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // This function sends an array that contains items to be pushed into Menu, to the central service
  onAddtoMenu(elem:restaurantItem){
    this.itemForMenu.push(elem);
    this.centralServ.arrayOfMenu.push(elem);
    this.http.put('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/menu.json',this.centralServ.arrayOfMenu)
    .subscribe(response => { console.log(response);});
  }


  // This function removes item from array
  removeItem(itemIndex){
    this.detailArray.splice(itemIndex,1);
    this.centralServ.arrayOfItems = this.detailArray;
    
    this.http.put( 'https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json', this.detailArray).subscribe(response => {console.log(response);});
    // this.http.delete( `https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food/${itemIndex}.json`).subscribe(response => {console.log(response);});

  }

  // This function removes all data from server
  removeAll(){
    this.http.delete(`https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json`).subscribe( () => {
      this.detailArray= [];
      this.centralServ.arrayOfItems = this.detailArray;
    });
  }

}
