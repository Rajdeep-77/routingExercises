import { Component, Input, OnInit } from '@angular/core';
import { CentralServService } from '../central-serv.service';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
  // providers:[CentralServService]
})
export class DisplayItemComponent implements OnInit {

  @Input() detailArray:Array<object>;

  constructor(private centralAray:CentralServService) { }

  ngOnInit(): void {
  }

  itemForMenu:Array<object>=[];

  onAddtoMenu(elem:object){
    // document.getElementById('demo').innerHTML="The object we got is " + JSON.stringify(elem);
    this.itemForMenu.push(elem);
    this.centralAray.getPush(elem);
    console.log("Element is: "+JSON.stringify(elem));

  }

}
