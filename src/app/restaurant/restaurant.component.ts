import { Component, OnDestroy, OnInit } from '@angular/core';
import { CentralServService, restaurantItem } from '../central-serv.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, OnDestroy {

  constructor(private centralService:CentralServService) { }
  ngOnDestroy() {
    // console.log("-----FormPage-----Destroyed-----");
  }

  ngOnInit() {
    this.itemArray=this.centralService.sendingItemArray();
  }
  itemName:string;
  imgUrl:string;
  itemCategory:string="South Indian";
  itemPrice:number;
  itemArray:Array<restaurantItem>=[];
  isSpecial:boolean=false; 
  // isSpecial= (<HTMLInputElement>document.getElementById('isSpecial')).checked ? true : false;
  // itemForMenu:Array<object>=[];
  // isSpecial=(<HTMLInputElement>document.querySelector('#isSpecial')).checked;
  

  // This function changes the selected category according the selected one in the form
  onSelectedCategory(el:string){ this.itemCategory=el;}

  //This function submits form-data and adds it into array of data
  onAddingItem(){
    this.itemArray.push({ id:(this.itemArray.length+1) ,name:this.itemName, url:this.imgUrl, category:this.itemCategory, price:this.itemPrice, speciality:this.isSpecial });
    this.centralService.gettingItemArray(this.itemArray);
    this.itemName='';
    this.imgUrl='';
    this.itemPrice=null;
    this.isSpecial = false;
    // (<HTMLInputElement>document.querySelector('#isSpecial')).checked = false;
  }


}
