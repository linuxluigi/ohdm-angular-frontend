import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { MapComponent } from "./map/map.component";
import { PrivacyComponent } from "./privacy/privacy.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "map/2017/1/1",
    pathMatch: "full",
  },
  { path: "map/:year/:month/:day", component: MapComponent },
  { path: "about", component: AboutComponent },
  { path: "imprint", component: ImprintComponent },
  { path: "privacy", component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
