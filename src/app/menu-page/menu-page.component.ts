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

  constructor(private demoService:CentralServService ) { }
  ngOnDestroy() {
    // console.log("-------MenuPage-----Destroyed--------");
  }

  ngOnInit() {
    this.gettingArray();
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
  }
}

