export interface SideNavMenuModel {
  name?: string;
  route?: string;
  icon?: string;
}

export const SIDENAV_MENU_ITEMS: SideNavMenuModel[] = [
  {
    name: 'Liste Des Modules',
    route: '/dashboard/modules/list',
  },
  {
    name: 'Liste Des Comptes',
    route: '/dashboard/accounts/list',
  },
  {
    name: 'Liste Des Roles',
    route: '/dashboard/roles/list',
  },
  {
    name: 'Liste Des Emplois',
    route: '/dashboard/jobs/list',
  },

  {
    name: 'Liste Des Utilisateur',
    route: '/dashboard/users/list',
  },

  {
    name: 'Liste des Type de contrat',
    route: '/dashboard/contracttypes/list',
  },
  {
    name: 'Liste des Condidats',
    route: '/dashboard/condidats/list',
  },


];
