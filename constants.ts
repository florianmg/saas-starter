export const APP_ROUTES = {
  HOME: {
    NAME: 'Accueil',
    URL: '/',
  },
  LOGIN: {
    NAME: 'Connexion',
    URL: '/connexion',
  },
  REGISTER: {
    NAME: 'Inscription',
    URL: '/inscription',
  },
  DASHBOARD: {
    NAME: 'Tableau de bord',
    URL: '/tableau-de-bord',
  },
  LOGOUT: {
    NAME: 'Déconnexion',
    URL: '/logout',
  },
};

export const LOGGED_NAVIGATION = [
  APP_ROUTES.HOME,
  APP_ROUTES.DASHBOARD,
  APP_ROUTES.LOGOUT,
];
export const NOT_LOGGED_NAVIGATION = [
  APP_ROUTES.HOME,
  APP_ROUTES.LOGIN,
  APP_ROUTES.REGISTER,
];
