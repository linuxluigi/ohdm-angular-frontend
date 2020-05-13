import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AboutComponent } from "./about/about.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DatepickerComponent } from "./header/datepicker/datepicker.component";
import { HeaderComponent } from "./header/header.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { MapService } from "./map-service/map.service";
import { MapComponent } from "./map/map.component";
import { PrivacyComponent } from "./privacy/privacy.component";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    AboutComponent,
    ImprintComponent,
    PrivacyComponent,
    DatepickerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
