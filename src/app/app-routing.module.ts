import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DisplayItemComponent } from "./display-item/display-item.component";
import { MenuPageComponent } from "./menu-page/menu-page.component";
import { RestaurantComponent } from "./restaurant/restaurant.component";


const theRoutes:Routes=[
    { path:'', redirectTo:'/form' , pathMatch:'full'},
    {path:'form', component:RestaurantComponent 
    // ,children:[ { path:':index', component:RestaurantComponent }]
    },
    {path:':index', component:RestaurantComponent },    
    {path:'form/menu', component:MenuPageComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(theRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule {  }