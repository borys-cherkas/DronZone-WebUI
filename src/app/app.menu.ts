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
      },
      {
        path: r.areas,
        data: {
          menu: {
            title: 'Areas',
            icon: null,
            selected: true,
            expanded: false,
            order: 0,
            roles: [AppEnums.roles.user, AppEnums.roles.admin]
          }
        },
        children: [
          {
            path: r.areaRequests,
            data: {
              menu: {
                title: 'Area Requests',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.admin]
              }
            }
          },
          {
            path: r.list,
            data: {
              menu: {
                title: 'Your Areas',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.user]
              }
            }
          },
          {
            path: r.edit,
            data: {
              menu: {
                title: 'Add Area',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.user]
              }
            }
          }
        ]
      },
      {
        path: r.manage,
        data: {
          menu: {
            title: 'Manage',
            icon: null,
            selected: true,
            expanded: false,
            order: 0,
            roles: [AppEnums.roles.admin]
          }
        },
        children: [
          {
            path: r.list,
            data: {
              menu: {
                title: 'Drone Filters',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.admin]
              }
            }
          }
        ]
      }
    ]
  }
];
