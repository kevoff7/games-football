import { create } from 'zustand';
import { type Question } from '../types';

interface State {
  questions: Question[];
  getQuestions: () => Promise<void>;
  currentQuestion: number;
  nextQuestion: () => void;
  previousQuestion: () => void;
  userQuestionSelected: (questionId: number, questionIndex: number) => void;
  restartGame: () => void;
}

const API_URL = 'http://localhost:5173/';

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    getQuestions: async () => {
      const resp = await fetch(`${API_URL}data.json`);
      const json = (await resp.json()) as Question[];
      const questions = json.sort(() => Math.random() - 0.5).slice(0, 5);

      set({ questions });
    },
    nextQuestion: () => {
      const { currentQuestion } = get();
      const newCurrentQuestion = currentQuestion + 1;
      set({ currentQuestion: newCurrentQuestion });
    },
    previousQuestion: () => {
      const { currentQuestion } = get();
      const newCurrentQuestion = currentQuestion - 1;
      set({ currentQuestion: newCurrentQuestion });
    },
    userQuestionSelected: (questionId: number, asnwerIndex: number) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex(
        (item) => item.id === questionId
      );
      const questionInfo = newQuestions[questionIndex];
      const isCorrect = questionInfo.correctAnswer === asnwerIndex;
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectAnswer: isCorrect,
        userSlectedAnswer: asnwerIndex
      };
      set({ questions: newQuestions });
    },
    restartGame: () => {
      set({ questions: [], currentQuestion: 0 });
    }
  };
});
