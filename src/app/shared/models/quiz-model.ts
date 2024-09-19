import { QuestionModel } from "./question-model";

export interface QuizModel {
    id?: number;
    quizName: string; 
    profileJobId?: number;
    
    questions: QuestionModel[];  
}
