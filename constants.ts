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
};

export const LOGGED_NAVIGATION = [APP_ROUTES.HOME, APP_ROUTES.DASHBOARD];
export const NOT_LOGGED_NAVIGATION = [
  APP_ROUTES.HOME,
  APP_ROUTES.LOGIN,
  APP_ROUTES.REGISTER,
];
