import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { useStore } from 'src/store/useStore';
import { Colors } from 'src/types';

export const useModal = (setIsOpen: Dispatch<SetStateAction<boolean>>) => {
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    activeColor,
    isPaused,
    activeFont,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    setActiveColor,
    setActiveFont,
  } = useStore(state => ({
    pomodoroTime: state.pomodoroTime,
    shortBreakTime: state.shortBreakTime,
    longBreakTime: state.longBreakTime,
    activeColor: state.activeColor,
    isPaused: state.isPaused,
    activeFont: state.activeFont,
    setPomodoroTime: state.setPomodoroTime,
    setShortBreakTime: state.setShortBreakTime,
    setLongBreakTime: state.setLongBreakTime,
    setActiveColor: state.setActiveColor,
    setActiveFont: state.setActiveFont,
  }));
  const [times, setTimes] = useState({ pomodoroTime, shortBreakTime, longBreakTime });
  const [color, setColor] = useState(activeColor);
  const [font, setFont] = useState(activeFont);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleColorChange = (color: Colors) => () => {
    setHasUnsavedChanges(true);
    setColor(color);
  };

  const handleFontChange = (font: string) => () => {
    setHasUnsavedChanges(true);
    setFont(font);
  };

  const applyChanges = () => {
    setPomodoroTime(times.pomodoroTime);
    setShortBreakTime(times.shortBreakTime);
    setLongBreakTime(times.longBreakTime);
    setActiveColor(color);
    setActiveFont(font);
    setIsOpen(false);
    setHasUnsavedChanges(false);
  };

  const closeModal = () => {
    if (hasUnsavedChanges) {
      if (Object.values(times).some(time => time <= 0)) return;

      if (confirm('You have unsaved changes. Do you want to save them?')) {
        applyChanges();
      }

      return;
    }

    setColor(activeColor);
    setTimes({ pomodoroTime, shortBreakTime, longBreakTime });
    setIsOpen(false);
    setHasUnsavedChanges(false);
  };

  const handleTimeChange = (timerName: string, value: number) => {
    if (!isPaused) {
      toast('Timer is running. Pause it to change time', { type: 'info' });

      return;
    }

    setTimes(prev => ({ ...prev, [timerName]: value }));
    setHasUnsavedChanges(true);
  };

  const buttonClasses = classNames(
    'absolute bottom-0 left-1/2 w-[140px] p-3 rounded-3xl font-semibold text-center text-white -translate-x-1/2 translate-y-1/2 disabled:cursor-not-allowed',
    {
      'bg-red': activeColor === 'red',
      'bg-lightblue': activeColor === 'lightblue',
      'bg-purple': activeColor === 'purple',
    }
  );

  const modalClasses = classNames(
    'absolute z-40 top-0 left-0 w-full h-full grid place-items-center px-[15px] bg-[#0000008d] fade-in',
    {
      'font-mono': activeFont === 'mono',
      'font-montserrat': activeFont === 'montserrat',
      'font-serif': activeFont === 'serif',
    }
  );

  const fontClasses = (fontClass: string) => {
    return classNames('w-[40px] h-[40px] rounded-full bg-lightgrey', {
      'text-white bg-textDark': fontClass === font,
    });
  };

  return {
    times,
    color,
    buttonClasses,
    modalClasses,
    fontClasses,
    handleColorChange,
    applyChanges,
    closeModal,
    handleTimeChange,
    handleFontChange,
  };
};
