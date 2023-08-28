import {
  IconMinion,
  IconRight,
  Mancha,
  ManchaTop,
  Manchita,
  Punto,
  Signo
} from './Icons';

export const FloatingLogos = () => {
  return (
    <>
      <div className="relative bottom-0 left-0 md:left-48 md:bottom-10">
        <div className="flex">
          <div className="relative top-0.5 rotate-[-20deg]">
            <IconMinion />
          </div>
          <div className="relative flex flex-col w-0 bottom-20 right-6">
            <Signo />
            <Punto />
          </div>
          <IconRight />
        </div>
        <hr className="relative border border-black right- bottom-10" />
      </div>
      <div className="hidden lg:absolute lg:bottom-40 lg:left-48 lg:block">
        <Mancha />
      </div>
      <div className="hidden lg:absolute lg:top-32 lg:right-48 lg:block">
        <ManchaTop />
      </div>
      <div className="hidden lg:absolute lg:top-24 lg:block">
        <Manchita />
      </div>
    </>
  );
};
