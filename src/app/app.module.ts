import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
   { path: '', component: MapComponent },
   { path: 'about', component: AboutComponent },
   { path: 'imprint', component: ImprintComponent },
   { path: 'privacy', component: PrivacyComponent },
 ];

@NgModule({
   declarations: [
      AppComponent,
      MapComponent,
      HeaderComponent,
      AboutComponent,
      ImprintComponent,
      PrivacyComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      RouterModule.forRoot(appRoutes),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
