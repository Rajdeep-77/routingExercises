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
    this.gettingArray();
    // this.http.get<restaurantItem[]>('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/menu.json').subscribe( arr => {this.menuArray=arr;})

    // console.log(this.menuArray);
  }
  menuArray:Array<restaurantItem>=[];


  //This function gets an array from central service
  gettingArray(){
    this.menuArray=this.demoService.getDisplay();
    // this.demoService.getPush(this.menuArray);
    // this.demoService.sendArray(demoArray);
    // this.menuArray.push(this.demoService.sendArray());
    // console.log("The array is: "+this.demoService.sendArray());
  }


  //This function removes item from the array
  onRemoveFromMenu(objToRemove){
    this.menuArray.splice(this.menuArray.findIndex(a => a.id === objToRemove.id) , 1);
    this.http.put(`https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/menu.json`,this.menuArray).subscribe(it => { console.log(it); });

  }
}

