import { Component, Inject } from '@angular/core';
import { NotificationModel } from '../../../shared/models/notification-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrl: './notification-dialog.component.scss'
})
export class NotificationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}