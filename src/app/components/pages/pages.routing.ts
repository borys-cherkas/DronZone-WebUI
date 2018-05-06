import {Routes, RouterModule} from '@angular/router';
import {AppEnums} from "../../app.constants";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/register/registration.component";
import {PagesComponent} from "./pages.component";
import {ManageDroneFiltersComponent} from "./components/droneCharacteristics/manage-drone-filters.component";

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

      {path: r.manage + '/' + r.droneFilters, component: ManageDroneFiltersComponent},

      // {path: r.kindsOfSport, redirectTo: r.kindsOfSport + '/' + r.list, pathMatch: 'full'},
      // {path: r.kindsOfSport + '/' + r.list, component: KindsOfSportListComponent},
      //
      // {path: r.sportField + '/' + r.list + '/:kindOfSportId', component: AthleticFieldListComponent},
      // {path: r.sportField + '/' + r.details + '/:athleticFieldId', component: AthleticFieldDetailsComponent},
      //
      // {path: r.reservation + '/' + r.list + '/' + r.currentUser, component: UserReservationsListComponent},
      // {path: r.reservation + '/' + r.details + '/:reservationId', component: ReservationDetailsComponent}
    ]
  }
];

export const pagesRouting = RouterModule.forChild(routes);
