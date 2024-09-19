import { QuestionOptionModel } from "./question-option-model";

export interface QuestionModel {
   id: number;
  questionName: string;
  quizId?: number; 
  coefficient?: number; 
  correctQuestionOptionId?: number;
  questionOptions: QuestionOptionModel[];
  
  }