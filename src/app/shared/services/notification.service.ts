import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from '../models/notification-model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = `${environment.baseUrl}/api/Notification`;

  constructor(private http: HttpClient) {}

  
  getNotificationsByUserId(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.url}/user/${userId}`);
  }

  
  markNotificationAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${notificationId}/MarkAsRead`, {});
  }
  
  
}
