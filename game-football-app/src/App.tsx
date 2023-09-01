import { Results } from './components/Results';
import { Game } from './components/Game';
import { Start } from './components/Start';
import { useQuestionsStore } from './store/questions';
import { useQuestionData } from './hooks/useQuestionData';
export const App = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const { unanswered } = useQuestionData(questions);
  return (
    <div className="h-screen">
      {questions.length === 0 && <Start />}
      {questions.length > 0 && unanswered > 0 && <Game />}
      {questions.length > 0 && unanswered === 0 && <Results />}
    </div>
  );
};
