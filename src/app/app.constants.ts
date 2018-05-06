export let AppEnums = {

  routes: {
    content: 'content',
    login: 'login',
    register: 'register',
    home: 'home',
    manage: 'manage',
    droneFilters: 'drone-filters',
    currentUser: 'current-user',
    details: 'details',
    list: 'list'
  },

  storageTypes: {
    sessionStorage: 'sessionStorage',
    localStorage: 'localStorage'
  },

  roles: {
    admin: 'Administrator',
    user: 'User'
  },

  personType: {
    ordinaryIdentity: 0,
    legalIdentity: 1
  },

  personTypeReverse: {
    0: 'ordinaryIdentity',
    1: 'legalIdentity'
  },

  alertType: {
    error: 'alert-error',
    success: 'alert-success',
    info: 'alert-info',
    fault: 'alert-fault',
    warning: 'alert-warning'
  },

  showMode: {
    edit: 'detail',
    create: 'create'
  }
};
