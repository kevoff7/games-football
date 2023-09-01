import { type Question } from '../types';

export const useQuestionData = (questions: Question[]) => {
  let unanswered = 0;
  let correct = 0;
  let incorrect = 0;
  questions.forEach((item) => {
    if (item.isCorrectAnswer == null) unanswered++;
    if (item.isCorrectAnswer != null) {
      if (item.isCorrectAnswer) return correct++;
      return incorrect++;
    }
  });
  return { unanswered, correct, incorrect };
};
