import { FC } from 'react';

const Timer: FC = () => {
  return (
    <button className="w-full h-[480px] rounded-full p-7 bg-gradient-to-br from-[#121530] to-[#272c5a] bg-red shadow-timer">
      <div className="w-full h-full rounded-full p-4 bg-primary">
        <div className="w-full h-full flex flex-col items-center justify-center gap-7 rounded-full border-[10px] border-solid border-red">
          <div className="text-7xl font-bold text-white">12:00:00</div>
          <div className="text-white text-xl uppercase tracking-[10px] font-semibold">start</div>
        </div>
      </div>
    </button>
  );
};

export default Timer;
