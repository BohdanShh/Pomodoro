import 'src/components/Timer/styles.css';

import { FC } from 'react';
import { useTimer } from 'src/components/Timer/useTimer';
import { TabVariants } from 'src/types';
import { toHHMMSS } from 'src/utils/toHHMMSS';
import { toPercentage } from 'src/utils/toPercentage';

type Props = {
  activeTab: TabVariants;
};

const Timer: FC<Props> = ({ activeTab }) => {
  const { remainingTime, isPaused, textClasses, circleClasses, time, startTimer, pauseTimer } =
    useTimer(activeTab);

  return (
    <button
      className="relative group w-full h-[300px] rounded-full p-3 bg-gradient-to-br from-[#121530] to-[#272c5a] shadow-timer sm:h-[470px] sm:p-7"
      onClick={isPaused ? startTimer : pauseTimer}
    >
      <div className="relative w-full h-full rounded-full p-4 bg-textDark a">
        <svg className="w-full h-full">
          <circle
            className={circleClasses}
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            style={{
              strokeDashoffset: `calc(var(--dash-array) - (var(--dash-array) * ${toPercentage(time, remainingTime)}) / -100)`,
            }}
          ></circle>
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 flex flex-col gap-5 -translate-x-1/2 -translate-y-1/2">
        <div className="text-3xl font-bold text-white sm:text-7xl">{toHHMMSS(remainingTime)}</div>
        <div className={textClasses}>{isPaused ? 'start' : 'pause'}</div>
      </div>
    </button>
  );
};

export default Timer;
