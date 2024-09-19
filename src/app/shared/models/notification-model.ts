export interface NotificationModel {
    id: number;
    message: string;
    userId: number;
    jobId: number;
    createdDate: Date;
    isRead: boolean;
  }
  