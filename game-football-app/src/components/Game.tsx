import { useEffect, useState } from 'react';
import { useQuestionsStore } from '../store/questions';
import { type Question } from '../types';
import { Correct, IconRight, PuntoLeft, SignoQuestions, Error } from './Icons';
import styles from './styles.module.css';

enum ColorButtonsAnswer {
  CORRECT = 'bg-green-500',
  ERROR = 'bg-red-500'
}

const getBackgroundColor = (info: Question, index: number) => {
  const { userSlectedAnswer, correctAnswer } = info;
  if (userSlectedAnswer == null) return 'bg-items-gray';
  if (index !== correctAnswer && index !== userSlectedAnswer)
    return 'bg-items-gray';
  if (index === correctAnswer) return ColorButtonsAnswer.CORRECT;
  if (index === userSlectedAnswer) return ColorButtonsAnswer.ERROR;

  return 'bg-items-gray';
};

const QuestionMap = ({ info }: { info: Question }) => {
  const userQuestionSelected = useQuestionsStore(
    (state) => state.userQuestionSelected
  );

  return (
    <ul className="mt-6 flex flex-col gap-3 [&>li>button]:py-4 [&>li>button]:w-80 [&>li>button]:text-center [&>li>button]:rounded-lg">
      {info.answers.map((question, index) => {
        const newIndex = index + 1;
        return (
          <li key={index}>
            <button
              disabled={info.isCorrectAnswer != null}
              className={`${
                info.userSlectedAnswer === newIndex && 'border-2 border-purple'
              } flex justify-center text-lg ${
                info.isCorrectAnswer != null
                  ? `${getBackgroundColor(info, newIndex)} opacity-80`
                  : `cursor-pointer 
                    ${getBackgroundColor(
                      info,
                      newIndex
                    )} hover:bg-violet hover:text-white`
              } 
                 `}
              onClick={() => {
                userQuestionSelected(info.id, newIndex);
              }}
            >
              <p className="grow">{question}</p>
              {getBackgroundColor(info, newIndex) ===
                ColorButtonsAnswer.CORRECT && (
                <div className="relative right-4">
                  <Correct />
                </div>
              )}
              {getBackgroundColor(info, newIndex) ===
                ColorButtonsAnswer.ERROR && (
                <div className="relative right-4">
                  <Error />
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const Game = () => {
  const [count, setCount] = useState(15);

  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const nextQuestion = useQuestionsStore((state) => state.nextQuestion);
  const previousContext = useQuestionsStore((state) => state.previousQuestion);
  const restartGame = useQuestionsStore((state) => state.restartGame);
  const userQuestionSelected = useQuestionsStore(
    (state) => state.userQuestionSelected
  );

  const info = questions[currentQuestion];

  useEffect(() => {
    const randomAnswer = Math.round(Math.random() * info.answers.length);
    const onTimeout = () => {
      userQuestionSelected(info.id, randomAnswer);
    };
    const timeoutId = setTimeout(onTimeout, 15000);
    if (info.userSlectedAnswer != null) {
      clearTimeout(timeoutId);
      return;
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [info, userQuestionSelected]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0 || info.isCorrectAnswer != null) {
      setCount(15);
      clearInterval(id);
      return;
    }
    return () => {
      clearInterval(id);
    };
  }, [count, info]);
  return (
    <main className="flex flex-col items-center w-full h-screen font-roboto">
      <section className="flex flex-col items-center justify-center max-w-2xl grow">
        <h1 className="text-6xl mt- font-roboto">Futbol Quiz</h1>
        <header className="text-center px-7">
          <h2 className="flex items-center justify-center text-2xl font-bold">
            Pregunta {currentQuestion + 1}/{questions.length}
            <div className="relative left-2">
              <SignoQuestions />
              <div className="relative right-1.5">
                <PuntoLeft width={20} height={15} />
              </div>
            </div>
          </h2>
          <p className="text-xl font-semibold mt- text-purple">
            {info.question}
          </p>
          {info.isCorrectAnswer == null && (
            <div className="flex items-start justify-center w-1/2 h-20 p-3 mx-auto mt-3 bg-violet rounded-t-3xl app">
              <p className="px-12 text-2xl font-bold text-orange-400 bg-white border-4 border-items-gray">
                0:{count}
              </p>
            </div>
          )}
        </header>
        <QuestionMap info={info} />
        <div className="relative z-20 left-36 bottom-10">
          <IconRight />
        </div>
      </section>
      <button
        className="px-4 py-1 mb-4 rounded-md text-purple hover:bg-purple hover:text-white"
        onClick={restartGame}
      >
        RESETEAR JUEGO
      </button>
      <footer className="flex justify-center w-full p-3 gap-7 bg-violet [&>button]:text-lg">
        <button
          disabled={currentQuestion === 0 || info.isCorrectAnswer == null}
          className={`${
            currentQuestion === 0 || info.isCorrectAnswer == null
              ? 'text-white'
              : 'text-white bg-black  border-2 border-black hover:border-white'
          } px-3 py-1 font-bold rounded-md`}
          onClick={previousContext}
        >
          Pregunta anterior
        </button>

        <button
          disabled={
            currentQuestion + 1 === questions.length ||
            info.isCorrectAnswer == null
          }
          className={`${
            currentQuestion + 1 === questions.length ||
            info.isCorrectAnswer == null
              ? ' text-white'
              : 'bg-white text-purple border-2 hover:border-black'
          } px-3 py-1 font-bold  rounded-md `}
          onClick={nextQuestion}
        >
          Siguiente pregunta
        </button>
      </footer>
    </main>
  );
};
