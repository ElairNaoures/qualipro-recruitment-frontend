import { CondidatModel } from "./Condidat.model";
import { JobModel } from "./job.model";

export interface JobApplicationModel {

    id?: number;
    condidatId?: number; 
    condidat?: CondidatModel;
    
    // condidat?: {
    //     firstName?: string;
    //     lastName?: string;
    //     deleted?: boolean;  
    //     country?: string;
    // phoneNumber?: string;
    // birthdate?: Date;
    // summary?: string;
    // };
    
    job?: JobModel;
    jobId?: number; 
    jobProfileId?: number;
   

    meetingDate?: Date | null;
    headToHeadInterviewNote?: number | null;
    score?: number | null;
    deleted?: boolean;
    isSelected?: boolean;
    
}
// models/job-with-application-count.model.ts
export interface JobWithApplicationCount {
    jobId: number;
    title: string;
    applicationCount: number;
  }
  
