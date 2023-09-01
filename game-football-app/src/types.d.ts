export interface Question {
  id: number;
  question: string;
  image_url: string;
  answers: string[];
  correctAnswer: number;
  isCorrectAnswer?: boolean;
  userSlectedAnswer?: number;
}
