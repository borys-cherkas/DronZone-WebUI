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
    '0': 'Ordinary Identity',
    '1': 'Legal Identity'
  },

  droneType: {
    individual: 0,
    military: 1,
    police: 2,
    delivery: 3,
  },

  droneTypeReverse: {
    '0': 'Individual',
    '1': 'Military',
    '2': 'Police',
    '3': 'Delivery'
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
