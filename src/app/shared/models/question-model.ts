import { QuestionOptionModel } from "./question-option-model";

export interface QuestionModel {
   id: number;
  questionName: string;
  quizId?: number; 
  coefficient?: number; 
  correctQuestionOptionId?: number;
  correctQuestionOptionName?: string;
  questionOptions: QuestionOptionModel[];
  
  }