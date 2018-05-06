import {AppEnums} from "./app.constants";

const r = AppEnums.routes;
export const MENU = [
  {
    path: r.content,
    children: [
      {
        path: r.home,
        data: {
          menu: {
            title: 'Home',
            icon: null,
            selected: true,
            expanded: false,
            order: 0,
            roles: []
          }
        }
      }
    ]
  }
];
