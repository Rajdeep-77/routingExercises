import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DisplayItemComponent } from './display-item/display-item.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SpeicalItemDirective } from './speical-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RestaurantComponent,
    DisplayItemComponent,
    MenuPageComponent,
    SpeicalItemDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  // providers: [RestaurantComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
