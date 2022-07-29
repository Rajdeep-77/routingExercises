import { Component, OnDestroy, OnInit } from '@angular/core';
import { CentralServService, restaurantItem } from '../central-serv.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, OnDestroy {

  constructor(private centralService:CentralServService, private http:HttpClient, private activatedRoute:ActivatedRoute) { }
  
  ngOnInit() {
    this.fetchFood();

    this.activatedRoute.params.subscribe(par => {
      // this.editObj = this.centralService.arrayOfItems[ par['index'] ];
      this.editObjIndex = par['index'];
      console.log(this.editObjIndex)
      if(this.activatedRoute.snapshot.params['index']){
        this.editMode =true;
        this.editObj = this.centralService.arrayOfItems[ this.editObjIndex ];
        
        this.itemName =this.editObj.name;
        this.itemCategory=this.editObj.category;
        (<HTMLInputElement>document.getElementById('inputFieldStatus')).value=this.editObj.category;
        this.itemPrice = this.editObj.price;
        this.imgUrl =this.editObj.url;
        this.isSpecial=this.editObj.speciality;
      
      }
     

    })

    
  }

  ngOnDestroy() {
  }

  itemName:string;
  imgUrl:string;
  itemCategory:string;
  itemPrice:number;
  itemArray:Array<restaurantItem> = [] ;
  
  isSpecial:boolean=false; 
  editMode:boolean = false;
  editObj:restaurantItem;
  editObjIndex:number;

  // This function changes the selected category according the selected one in the form
  onSelectedCategory(el:string){ this.itemCategory=el;}

  //This function submits form-data and adds it into array of data
  onAddingItem(){
    // this.itemArray.push({ id:(this.itemArray.length+1) ,name:this.itemName, url:this.imgUrl, category:this.itemCategory, price:this.itemPrice, speciality:this.isSpecial });
    const tempObj = { id:(this.centralService.arrayOfItems.length) ,name:this.itemName, url:this.imgUrl, category:this.itemCategory, price:this.itemPrice, speciality:this.isSpecial };
   
    this.itemArray = this.centralService.arrayOfItems;
    if(!this.editMode){ // edit mode OFF
      this.itemArray.push(tempObj);
    }else{            // edit mode ON
      this.itemArray[this.editObjIndex] = tempObj;
      this.editMode =false;
      this.editObjIndex=null;
    }
    // this.itemArray.push(tempObj);
    
    this.centralService.itemSubject.next(this.itemArray);

    this.centralService.setServerData(this.itemArray);

    this.itemName = '';
    this.imgUrl = '';
    this.itemPrice = null;
    this.isSpecial = false;
  }

  // This function gets data from server
  fetchFood(){
    this.centralService.getServerData();
  }


}
