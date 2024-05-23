export interface SideNavMenuModel {
  name?: string;
  route?: string;
  icon?: string;
}

export const SIDENAV_MENU_ITEMS: SideNavMenuModel[] = [
  {
    name: 'Liste des modules',
    route: '/dashboard/modules/list',
  },
  {
    name: 'Liste des comptes',
    route: '/dashboard/accounts/list',
  },
  {
    name: 'Liste des roles',
    route: '/dashboard/roles/list',
  },
];
