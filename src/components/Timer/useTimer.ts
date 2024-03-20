import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useStore } from 'src/store/useStore';
import { TabVariants } from 'src/types';

export const useTimer = (activeTab: TabVariants) => {
  const { pomodoroTime, shortBreakTime, longBreakTime, isPaused, activeColor, toggleIsPaused } =
    useStore(state => ({
      pomodoroTime: state.pomodoroTime,
      shortBreakTime: state.shortBreakTime,
      longBreakTime: state.longBreakTime,
      isPaused: state.isPaused,
      activeColor: state.activeColor,
      toggleIsPaused: state.toggleIsPaused,
    }));

  const tabTimes = useMemo(
    () => ({
      pomodoro: pomodoroTime,
      shortBreak: shortBreakTime,
      longBreak: longBreakTime,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const textClasses = classNames(
    'text-white text-xl uppercase tracking-[10px] font-semibold transition-all duration-500',
    {
      'group-hover:text-red': activeColor === 'red',
      'group-hover:text-lightblue': activeColor === 'lightblue',
      'group-hover:text-purple': activeColor === 'purple',
    }
  );

  const circleClasses = classNames({
    'stroke-red': activeColor === 'red',
    'stroke-lightblue': activeColor === 'lightblue',
    'stroke-purple': activeColor === 'purple',
  });

  const [remainingTime, setRemainingTime] = useState<number>(tabTimes[activeTab]);

  const toggleTimerExecution = (): void => toggleIsPaused();

  useEffect(() => {
    setRemainingTime(tabTimes[activeTab] * 60);
  }, [activeTab, tabTimes]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    }

    if (remainingTime < 0 && intervalId) {
      alert('Done');
      clearInterval(intervalId);

      return;
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, remainingTime]);

  return {
    remainingTime,
    isPaused,
    textClasses,
    circleClasses,
    time: tabTimes[activeTab],
    toggleTimerExecution,
  };
};
