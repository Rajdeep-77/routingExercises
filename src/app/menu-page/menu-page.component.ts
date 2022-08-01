import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CentralServService, restaurantItem } from '../central-serv.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
  // providers: [CentralServService]
})
export class MenuPageComponent implements OnInit ,OnDestroy{

  constructor(private demoService:CentralServService,private http:HttpClient ) { }
  ngOnDestroy() {
    // console.log("-------MenuPage-----Destroyed--------");
  }

  ngOnInit() {
    // this.gettingArray();
    this.http.get<restaurantItem[]>('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/menu.json').subscribe( arr => {this.menuArray=arr;})

    // console.log(this.menuArray);
  }
  menuArray:Array<restaurantItem> = [];


  //This function gets an array from central service
  // gettingArray(){
  //   this.menuArray=this.demoService.getDisplay();
  // }


  //This function removes item from the array
  onRemoveFromMenu(index){
    this.menuArray.splice(index , 1);
    this.demoService.setDisplay(this.menuArray);
    this.http.put(`https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/menu.json`,this.menuArray).subscribe(it => { console.log(it); });
  }
}

