import {Routes, RouterModule} from '@angular/router';
import {AppEnums} from "./app.constants";
import {PagesComponent} from "./components/pages/pages.component";

const r = AppEnums.routes;
export const routes: Routes = [
  {path: '', redirectTo: r.content, pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes, {useHash: true, enableTracing: true});
