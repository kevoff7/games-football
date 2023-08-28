import { FloatingLogos } from './components/FloatingLogos';
import { IconMinion, PuntoLeft, SignoLeft } from './components/Icons';
export const App = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <main className="flex-grow w-full text-center">
        <div className="w-full mx-auto mt-44 sm:max-w-xl">
          <div className="absolute top-10 left-1/3 sm:top-32 sm:left-auto">
            <IconMinion />
          </div>
          <div className="absolute left-5 md:left-auto top-96 rotate-[-20deg] md:top-96">
            <SignoLeft />
            <div className="relative left-10">
              <PuntoLeft />
            </div>
          </div>

          <header className="text-black font-roboto">
            <h1 className="text-7xl">Futbol Quiz</h1>
            <p>Prueba tu conicimiento sobre futbol</p>
          </header>
          {/* <section className="flex flex-col w-1/2 gap-3 mx-auto mt-10 text-center"> */}
          <button className="px-5 py-2 mt-6 text-white rounded-lg hover:bg-green-400 bg-purple">
            !EMPEZAR EL JUEGO
          </button>
          {/* </section> */}
        </div>
      </main>
      <FloatingLogos />

      <footer className="w-full p-7 bg-violet"></footer>
    </div>
  );
};
