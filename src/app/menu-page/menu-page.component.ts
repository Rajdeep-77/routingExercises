import { Component, OnInit } from '@angular/core';
import { CentralServService } from '../central-serv.service';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
  // providers: [CentralServService]
})
export class MenuPageComponent implements OnInit {

  constructor(private demoService:CentralServService ) { }

  ngOnInit() {
    this.gettingArray();
    console.log(this.menuArray);
  }
  menuArray:Array<object>=[];

  gettingArray(){
    // this.demoService.sendArray(demoArray);
    // this.menuArray=demoArray;
    this.menuArray.push(this.demoService.sendArray());
    console.log("The array is: "+this.demoService.sendArray());
  }
}

