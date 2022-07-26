import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentralServService, restaurantItem } from '../central-serv.service';

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

  constructor(private centralServ:CentralServService) { }
  
  private subscription:Subscription;
  async ngOnInit() {
    // this.itemForMenu=this.centralArray.sendArray();
    // this.detailArray= this.centralServ.getItemArray();
    this.subscription = await this.centralServ.itemSubject.subscribe( arr => { this.detailArray = arr; console.log(this.detailArray) }) ;
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

}
