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
      className="relative group w-full h-[470px] rounded-full p-7 bg-gradient-to-br from-[#121530] to-[#272c5a] shadow-timer"
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
              strokeDashoffset: `calc(var(--dash-array) - (var(--dash-array) * ${toPercentage(time, remainingTime + 1)}) / -100)`,
            }}
          ></circle>
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 flex flex-col gap-5 -translate-x-1/2 -translate-y-1/2">
        <div className="text-7xl font-bold text-white">{toHHMMSS(remainingTime)}</div>
        <div className={textClasses}>{isPaused ? 'start' : 'pause'}</div>
      </div>
    </button>
  );
};

export default Timer;
