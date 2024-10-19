import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  SideNavMenuModel,
  SIDENAV_MENU_ITEMS,
} from '../../shared/constants/sidenav-items';
import { NotificationModel } from '../../shared/models/notification-model';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { NotificationDialogComponent } from '../../dashboard/dialogs/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  sidenavMenuItems: SideNavMenuModel[] = SIDENAV_MENU_ITEMS;
  mobileQuery: MediaQueryList;
  showStatisticsMenu = false;
  unreadNotificationsCount = 0;
  notifications: NotificationModel[] = [];
  userId: number | null = null;
  userName: string = '';
    statisticsOptions = [
    { name: 'Nombre de candidatures par emploi', route: '/dashboard/statistics/countByJob' },
    { name: 'meuilleur condidat ', route: '/dashboard/statistics/condidatmoyen' },
   // { name: 'Candidatures au fil du temps', route: '/dashboard/statistics/applicationsOverTime' }
  ];



 
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;
  

  constructor(changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private authService: AuthService,
    private notificationService: NotificationService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  )
     {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  loadUserId(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
    }
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.loadUserId();  // Charger l'ID de l'utilisateur d'abord
    this.loadUserInfo(); // Puis charger les informations utilisateur
    this.loadNotifications(); // Charger les notifications
  }
  
  // Method to check if there are statistics options
  hasStatisticsChildren(): boolean {
    return this.sidenavMenuItems.some(item => item.name === 'Statistiques');
  }

  toggleStatisticsMenu(): void {
    this.showStatisticsMenu = !this.showStatisticsMenu;
  }
  openNotifications(): void {
    // Logic to open a dialog or show notifications
    console.log('Notifications:', this.notifications);
  }

  loadUserInfo(): void {
    if (this.userId) {
      console.log('Fetching user info for ID:', this.userId); // Log pour vérifier l'ID
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          console.log('User fetched:', user); // Log pour vérifier les données utilisateur
          this.userName = `${user.firstName} ${user.lastName}`;
        },
        (error) => {
          console.error('Error fetching user:', error); // Log en cas d'erreur
        }
      );
    }
  }
  
  
 
  loadNotifications(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.notificationService.getNotificationsByUserId(Number(userId))
        .subscribe(notifications => {
          this.notifications = notifications;
          this.unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
        });
    }
  }
  onNotificationIconClick(): void {
    this.markAllAsRead(); // Marquer toutes les notifications comme lues
    this.unreadNotificationsCount = 0; // Réinitialiser le compteur de notifications non lues
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      if (!notification.isRead) {
        this.notificationService.markNotificationAsRead(notification.id).subscribe(() => {
          notification.isRead = true;
        });
      }
    });
  }
 
  onNotificationClick(notification: NotificationModel): void {
    if (!notification.isRead) {
      this.markNotificationAsRead(notification.id);
    }
      // Navigate to the route after clicking the notification
      this.router.navigate(['dashboard/EmploisDemander/list']);
    // Open dialog to display the notification message
    this.dialog.open(NotificationDialogComponent, {
      data: { message: notification.message },
    });
  }
  markNotificationAsRead(notificationId: number): void {
    this.notificationService.markNotificationAsRead(notificationId).subscribe(() => {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.isRead = true;
        this.unreadNotificationsCount--;
      }
    });
  }
 
  logout(): void {
    this.authService.logoutUser(); 
  }
}
