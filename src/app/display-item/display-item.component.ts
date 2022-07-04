import { Component, Input, OnInit } from '@angular/core';
import { CentralServService, restaurantItem } from '../central-serv.service';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
  // providers:[CentralServService]
})
export class DisplayItemComponent implements OnInit {

  @Input() detailArray:Array<restaurantItem>;
  itemForMenu:Array<restaurantItem>=[];

  constructor(private centralArray:CentralServService) { }

  ngOnInit(): void {
    // this.itemForMenu=this.centralArray.sendArray();
  }

  // This function sends an array that contains items to be pushed into Menu, to the central service
  onAddtoMenu(elem:restaurantItem){
    // document.getElementById('demo').innerHTML="The object we got is " + JSON.stringify(elem);
    this.itemForMenu.push(elem);
    this.centralArray.setDisplay(elem);
    // console.log("Element is: "+JSON.stringify(elem));

  }

}
