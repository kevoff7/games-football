import { useQuestionData } from '../hooks/useQuestionData';
import { useQuestionsStore } from '../store/questions';
import confetti from 'canvas-confetti';
import { ResultsIcon } from './Icons';

export const Results = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const restartGame = useQuestionsStore((state) => state.restartGame);
  const { correct, incorrect } = useQuestionData(questions);
  if (correct === questions.length) confetti();
  return (
    <div className="flex flex-col h-screen">
      <section className="z-10 text-center mt-52">
        <h1 className="text-7xl">Futbol Quiz</h1>
        <p className="mt-6 text-5xl text-violet">Tus resultados</p>
        <p className="mt-10">{correct} correctas</p>
        <p>{incorrect} incorrectas</p>
        {correct === questions.length && <h2 className="text-2xl">GANASTE!</h2>}
        <button
          className="py-2 mt-8 text-white rounded-lg bg-violet px-7 hover:bg-green-500 "
          onClick={restartGame}
        >
          ¡Empezar de nuevo!
        </button>
      </section>
      <div className="">
        <ResultsIcon />
      </div>
    </div>
  );
};
