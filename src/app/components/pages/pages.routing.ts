import {Routes, RouterModule} from '@angular/router';
import {AppEnums} from "../../app.constants";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/register/registration.component";
import {PagesComponent} from "./pages.component";
import {AreaFiltersListPageComponent} from "./components/areas/area-filters/area-filters-list-page.component";
import {UserAreasListComponent} from "./components/areas/user-areas-list/user-areas-list.component";
import {AddAreaPageComponent} from "./components/areas/add-area/add-area-page.component";
import {AreaDetailsPageComponent} from "./components/areas/area-details/area-details-page.component";
import {AttachDronePageComponent} from "./components/drones/add-drone/attach-drone-page.component";
import {UserDroneListPageComponent} from "./components/drones/user-drone-list/user-drone-list-page.component";
import {DroneDetailsPageComponent} from "./components/drones/drone-details/drone-details-page.component";
import {AdminDroneListPageComponent} from "./components/drones/admin-drone-list/admin-drone-list-page.component";
import {EditAreaPageComponent} from "./components/areas/edit-area/edit-area-page.component";

const r = AppEnums.routes;
const routes: Routes = [
  {
    path: r.content,
    component: PagesComponent,
    children: [
      {path: '', redirectTo: r.home, pathMatch: 'full'},

      {path: r.home, component: HomeComponent},
      {path: r.login, component: LoginComponent},
      {path: r.register, component: RegistrationComponent},

      {
        path: r.areas,
        children: [
          {path: r.list, component: UserAreasListComponent},
          {path: r.add, component: AddAreaPageComponent},
          {path: r.edit + '/:areaId', component: EditAreaPageComponent},
          {path: r.details + '/:areaId', component: AreaDetailsPageComponent},
          {path: r.areaFilters + '/:areaId', component: AreaFiltersListPageComponent},
        ]
      },
      {
        path: r.drones,
        children: [
          {path: r.generateDrones, component: AdminDroneListPageComponent},
          {path: r.list, component: UserDroneListPageComponent},
          {path: r.edit, component: AttachDronePageComponent},
          {path: r.details + '/:droneId', component: DroneDetailsPageComponent}
        ]
      }
    ]
  }
];

export const pagesRouting = RouterModule.forChild(routes);
