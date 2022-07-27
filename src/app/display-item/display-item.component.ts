import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralServService, restaurantItem } from '../central-serv.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
  // providers:[CentralServService]
})
export class DisplayItemComponent implements OnInit , OnDestroy{

  

  detailArray:Array<restaurantItem> = [];
  // @Input() detailArray:Array<restaurantItem>;
  itemForMenu:Array<restaurantItem> = [];

  constructor(private centralServ:CentralServService,private http:HttpClient) { }
  
  private subscription:Subscription;
  async ngOnInit() {
    // this.itemForMenu=this.centralArray.sendArray();
    // this.detailArray= this.centralServ.getItemArray();
    this.subscription = this.centralServ.itemSubject.subscribe( arr => { this.detailArray = arr; console.log(this.detailArray) }) ;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // This function sends an array that contains items to be pushed into Menu, to the central service
  onAddtoMenu(elem:restaurantItem){
    // document.getElementById('demo').innerHTML="The object we got is " + JSON.stringify(elem);
    this.itemForMenu.push(elem);
    this.centralServ.setDisplay(elem);
    // console.log("Element is: "+JSON.stringify(elem));
  }

  // This function removes item from array
  removeItem(itemIndex){
    this.detailArray.splice(itemIndex,1);
    // this.centralServ.arrayOfItems = this.detailArray;
    
    // this.centralServ.onDeletePost(itemIndex);
    // console.log(this.detailArray.indexOf(this.detailArray[itemIndex]));

    // this.centralServ.onDeletePost(this.detailArray.indexOf(this.detailArray[itemIndex]));
    this.http.put( 'https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json', this.detailArray).subscribe(response => {console.log(response);});


    // .subscribe( () => {
      // this.detailArray = [];
      // this.centralServ.arrayOfItems = this.detailArray;

    // } );
  }

  // This function removes all data from server
  removeAll(){
    this.http.delete(`https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json`).subscribe( () => {
      this.detailArray= [];
      this.centralServ.arrayOfItems = this.detailArray;
    });
  }

}
