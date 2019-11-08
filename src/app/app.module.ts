import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { Routes, RouterModule } from '@angular/router';
import { DatepickerComponent } from './header/datepicker/datepicker.component';
import { FormsModule } from '@angular/forms';
import { MapService } from './map-service/map.service';

const today: Date = new Date();
const appRoutes: Routes = [
   { path: '', redirectTo: 'map/' + today.getFullYear() + '/1/1', pathMatch: 'full' },
   { path: 'map/:year/:month/:day', component: MapComponent },
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
      PrivacyComponent,
      DatepickerComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
   ],
   providers: [MapService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
