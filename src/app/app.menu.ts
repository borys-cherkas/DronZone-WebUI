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
          }
        ]
      },
      {
        path: r.areaRequests,
        data: {
          menu: {
            title: 'Area Requests',
            icon: null,
            selected: true,
            expanded: false,
            order: 0,
            roles: [AppEnums.roles.user, AppEnums.roles.admin]
          }
        },
        children: [
          {
            path: r.list,
            data: {
              menu: {
                title: 'Your Requests',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.user]
              }
            }
          },
          {
            path: r.list,
            data: {
              menu: {
                title: 'Untaken Requests',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.admin]
              }
            }
          },
          {
            path: r.add,
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
        path: r.drones,
        data: {
          menu: {
            title: 'Drones',
            icon: null,
            selected: true,
            expanded: false,
            order: 0,
            roles: [AppEnums.roles.user, AppEnums.roles.admin]
          }
        },
        children: [
          {
            path: r.generateDrones,
            data: {
              menu: {
                title: 'Generate Drones',
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
                title: 'Your Drones',
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
                title: 'Attach Drone',
                icon: null,
                expanded: false,
                order: 0,
                roles: [AppEnums.roles.user]
              }
            }
          }
        ]
      }
    ]
  }
];
