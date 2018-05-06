import {NgModule} from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {PagesComponent} from "./pages.component";
import {CommonModule} from "@angular/common";
import {pagesRouting} from "./pages.routing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {CoreModule} from "../../common/core.module";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/register/registration.component";
import {ManageDroneFiltersComponent} from "./components/droneCharacteristics/manage-drone-filters.component";
import {DroneFilterResource} from "../../common/resources/drone-filter.resource";
import {AddDroneFilterModalComponent} from "./components/droneCharacteristics/add-characteristic-modal/add-drone-filter-modal.component";

@NgModule({
  declarations: [
    PagesComponent,

    HomeComponent,
    LoginComponent,
    RegistrationComponent,

    ManageDroneFiltersComponent,

    // AthleticFieldListComponent,
    // AthleticFieldDetailsComponent,

    AddDroneFilterModalComponent
    // PayBillModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,

    NgbModule,

    pagesRouting
  ],
  providers: [
    DroneFilterResource
  ]
})
export class PagesModule {
}
