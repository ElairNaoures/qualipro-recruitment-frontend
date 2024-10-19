export interface SideNavMenuModel {
  name?: string;
  route?: string;
  icon?: string; 
  children?: SideNavMenuModel[];
}

// Full menu for Admin
const fullMenu: SideNavMenuModel[] = [
  { name: 'Liste Des Modules', route: '/dashboard/modules/list', icon: 'widgets' },
  { name: 'Liste Des Comptes', route: '/dashboard/accounts/list', icon: 'account_circle' },
  { name: 'Liste Des Roles', route: '/dashboard/roles/list', icon: 'admin_panel_settings' },
  { name: 'Liste Des Emplois', route: '/dashboard/jobs/list', icon: 'work' },
  { name: 'Liste Des Utilisateur', route: '/dashboard/users/list', icon: 'people' },
  { name: 'Liste des Type de contrat', route: '/dashboard/contracttypes/list', icon: 'description' },
  { name: 'Liste des Condidats', route: '/dashboard/condidats/list', icon: 'person' },
  { name: 'Liste des Skills', route: '/dashboard/skills/list', icon: 'star' },
  { name: 'Liste des Quizs', route: '/dashboard/quizs/list', icon: 'quiz' },
  { name: 'Liste des profiles emplois', route: '/dashboard/ProfileJobs/list', icon: 'business_center' },
  { name: 'Liste des emplois demander', route: '/dashboard/EmploisDemander/list', icon: 'request_page' },
  { 
    name: 'Statistiques', 
    icon: 'bar_chart', 
    children: [
      { name: 'Nombre de candidatures par emploi', route: '/dashboard/statistics/countByJob' },
      { name: 'Score moyen des entretiens', route: '/dashboard/statistics/condidatmoyen' },
      
    ]
  }
];

// Limited menu for Recruteur
const recruteurMenu: SideNavMenuModel[] = [
  { name: 'Liste Des Emplois', route: '/dashboard/jobs/list', icon: 'work' },
  { name: 'Liste des Condidats', route: '/dashboard/condidats/list', icon: 'person' },

  { name: 'Liste des emplois demander', route: '/dashboard/EmploisDemander/list', icon: 'request_page' },
  { 
    name: 'Statistiques', 
    icon: 'bar_chart', 
    children: [
      { name: 'Nombre de candidatures par emploi', route: '/dashboard/statistics/countByJob' },
      { name: 'Score moyen des entretiens', route: '/dashboard/statistics/condidatmoyen' },
     
    ]
  }
];

// Function to select the correct menu based on the user's role
export const SIDENAV_MENU_ITEMS: SideNavMenuModel[] = (() => {
  const roleName = localStorage.getItem('roleName');
  if (roleName === 'Admin') {
    return fullMenu;
  } else if (roleName === 'Recruteur') {
    return recruteurMenu;
  } else {
    console.error('Role not recognized. Defaulting to Recruteur menu.');
    return recruteurMenu; // Default menu if the role is unrecognized
  }
})();
