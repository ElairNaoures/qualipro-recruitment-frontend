    export interface QuizEvaluationModel {
        id?: number;
        JobApplicationId: number;
        QuizId?: number;
        QuestionId: number;
        
        QuestionOptionId?: number;
        IdReponse: number;
        questionName?: string; // Ajoutez cette propriété si elle est nécessaire
        correctQuestionOptionName?: string; // Ajoutez cette propriété si elle est nécessaire
        reponseOptionName?: string; // Ajoutez cette propriété si elle est nécessaire
        coefficient?: number;
        
        score?: number;
    }
