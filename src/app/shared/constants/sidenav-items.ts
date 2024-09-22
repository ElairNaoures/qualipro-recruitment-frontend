export interface SideNavMenuModel {
  name?: string;
  route?: string;
  icon?: string; 
  children?: SideNavMenuModel[];
}

export const SIDENAV_MENU_ITEMS: SideNavMenuModel[] = [
  { name: 'Liste Des Modules', route: '/dashboard/modules/list', icon: 'widgets' }, // 'widgets' icon
  { name: 'Liste Des Comptes', route: '/dashboard/accounts/list', icon: 'account_circle' },
  { name: 'Liste Des Roles', route: '/dashboard/roles/list', icon: 'admin_panel_settings' }, // Updated icon
  { name: 'Liste Des Emplois', route: '/dashboard/jobs/list', icon: 'work' },
  { name: 'Liste Des Utilisateur', route: '/dashboard/users/list', icon: 'people' },
  { name: 'Liste des Type de contrat', route: '/dashboard/contracttypes/list', icon: 'description' }, // 'description' icon
  { name: 'Liste des Condidats', route: '/dashboard/condidats/list', icon: 'person' }, // 'person' icon
  { name: 'Liste des Skills ', route: '/dashboard/skills/list', icon: 'star' },
  { name: 'Liste des Quizs', route: '/dashboard/quizs/list', icon: 'quiz' },
  { name: 'Liste des profiles emplois', route: '/dashboard/ProfileJobs/list', icon: 'business_center' }, // 'business_center' icon
  { name: 'Liste des emplois demander', route: '/dashboard/EmploisDemander/list', icon: 'request_page' }, // 'request_page' icon
  //{ name: 'Statistiques des Candidatures', route: '/dashboard/statistics', icon: 'bar_chart' } // Nouvel élément de menu
  { 
    name: 'Statistiques', 
    icon: 'bar_chart', // Icône pour les statistiques
    children: [
      { name: 'Nombre de candidatures par emploi', route: '/dashboard/statistics/countByJob' },
      { name: 'Score moyen des entretiens', route: '/dashboard/statistics/condidatmoyen' },
      { name: 'Candidatures au fil du temps', route: '/dashboard/statistics/applicationsOverTime' }
    ]
  }

];
