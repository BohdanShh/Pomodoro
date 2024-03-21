import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { workerScript } from 'src/scripts/worker';
import { useStore } from 'src/store/useStore';
import { TabVariants } from 'src/types';
import { getNotificationMessage } from 'src/utils/getNotificationMessage';

const timerWorker = new Worker(workerScript);

export const useTimer = (activeTab: TabVariants) => {
  const { pomodoroTime, shortBreakTime, longBreakTime, isPaused, activeColor, setPause } = useStore(
    state => ({
      pomodoroTime: state.pomodoroTime,
      shortBreakTime: state.shortBreakTime,
      longBreakTime: state.longBreakTime,
      isPaused: state.isPaused,
      activeColor: state.activeColor,
      setPause: state.setPause,
    })
  );

  const tabTimes = useMemo(
    () => ({
      pomodoro: pomodoroTime,
      shortBreak: shortBreakTime,
      longBreak: longBreakTime,
    }),
    [pomodoroTime, shortBreakTime, longBreakTime]
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

  const [remainingTime, setRemainingTime] = useState<number>(tabTimes[activeTab] * 60);

  const startTimer = () => {
    setPause(false);
    timerWorker.postMessage({ command: 'start', time: remainingTime });
  };

  const pauseTimer = () => {
    setPause(true);
    timerWorker.postMessage({ command: 'pause', pausedTime: remainingTime });
  };

  useEffect(() => {
    setRemainingTime(tabTimes[activeTab] * 60);
  }, [tabTimes, activeTab]);

  useEffect(() => {
    timerWorker.onmessage = ({ data: { timer } }) => {
      setRemainingTime(timer);
    };

    return () => setPause(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (remainingTime < 0) {
      setPause(true);

      if (Notification.permission === 'granted') {
        const { title, body } = getNotificationMessage(activeTab);

        new Notification(title, { body });
      }

      setRemainingTime(tabTimes[activeTab] * 60);

      return;
    }
  }, [remainingTime, tabTimes, activeTab, setPause, setRemainingTime]);

  return {
    remainingTime,
    isPaused,
    textClasses,
    circleClasses,
    time: tabTimes[activeTab],
    startTimer,
    pauseTimer,
  };
};
