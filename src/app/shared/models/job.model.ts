export interface JobModel {
    id?: number;
    title: string; 
    description?: string;
    yearsOfExperience?: string;
    languages?: string;
    educationLevel?: string;
    expirationDate?: Date;
    createdAt?: Date;

    //contracttype
    contractTypeId?: number;
    designation?: string;
    
    //user
    userId?: number;
    firstName?: string;

    jobProfileId?: number | null;
    profileName?: string; 
    
}
