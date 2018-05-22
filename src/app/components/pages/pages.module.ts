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
import {AreaFilterResource} from "../../common/resources/area-filter.resource";
import {AreaFiltersListPageComponent} from "./components/areas/area-filters/area-filters-list-page.component";
import {AddDroneFilterModalComponent} from "./components/areas/area-filters/add-filter-modal/add-drone-filter-modal.component";
import {UserAreasListComponent} from "./components/areas/user-areas-list/user-areas-list.component";
import {AreaResource} from "../../common/resources/areas.resource";
import {AddAreaPageComponent} from "./components/areas/add-area/add-area-page.component";
import {AreaDetailsPageComponent} from "./components/areas/area-details/area-details-page.component";
import {AttachDronePageComponent} from "./components/drones/add-drone/attach-drone-page.component";
import {DroneResource} from "../../common/resources/drones.resource";
import {UserDroneListPageComponent} from "./components/drones/user-drone-list/user-drone-list-page.component";
import {DroneDetailsPageComponent} from "./components/drones/drone-details/drone-details-page.component";
import {AdminDroneListPageComponent} from "./components/drones/admin-drone-list/admin-drone-list-page.component";

@NgModule({
  declarations: [
    PagesComponent,

    HomeComponent,
    LoginComponent,
    RegistrationComponent,

    UserAreasListComponent,
    AddAreaPageComponent,
    AreaDetailsPageComponent,

    AdminDroneListPageComponent,
    AttachDronePageComponent,
    UserDroneListPageComponent,
    DroneDetailsPageComponent,

    AreaFiltersListPageComponent,

    AddDroneFilterModalComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,

    NgbModule,

    pagesRouting
  ],
  providers: [
    AreaFilterResource,
    AreaResource,
    DroneResource
  ]
})
export class PagesModule {
}
