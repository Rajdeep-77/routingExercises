import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CentralServService, restaurantItem } from '../central-serv.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, OnDestroy {

  constructor(private centralService:CentralServService, private http:HttpClient) { }
  ngOnDestroy() {
    // console.log("-----FormPage-----Destroyed-----");
  }

  ngOnInit() {
    this.fetchFood();
    this.itemArray=this.centralService.getItemArray();
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
    // this.itemArray.push({ id:(this.itemArray.length+1) ,name:this.itemName, url:this.imgUrl, category:this.itemCategory, price:this.itemPrice, speciality:this.isSpecial });
    const tempObj ={ id:(this.itemArray.length+1) ,name:this.itemName, url:this.imgUrl, category:this.itemCategory, price:this.itemPrice, speciality:this.isSpecial };
    this.itemArray.push(tempObj);
    
    this.http.post('https://ng-restaurant-app-a4dac-default-rtdb.firebaseio.com/food.json',tempObj)
    .subscribe((response:restaurantItem) => { console.log(response);});

    this.centralService.setItemArray(this.itemArray);
    this.centralService.itemSubject.next(this.itemArray);

    this.itemName='';
    this.imgUrl='';
    this.itemPrice=null;
    this.isSpecial = false;
    // (<HTMLInputElement>document.querySelector('#isSpecial')).checked = false;
  }

  // This function gets data from server
  fetchFood(){
    this.centralService.getServerData();
  }


}
