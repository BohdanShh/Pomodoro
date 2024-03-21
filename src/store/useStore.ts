import { Colors } from 'src/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  activeFont: string;
  activeColor: Colors;
  isPaused: boolean;
  setPomodoroTime: (value: number) => void;
  setShortBreakTime: (value: number) => void;
  setLongBreakTime: (value: number) => void;
  setActiveColor: (color: Colors) => void;
  setActiveFont: (font: string) => void;
  setPause: (value?: boolean) => void;
};

export const useStore = create<Store>()(
  persist(
    set => ({
      pomodoroTime: 30,
      shortBreakTime: 5,
      longBreakTime: 15,
      activeColor: 'red',
      activeFont: 'montserrat',
      isPaused: true,
      setPomodoroTime: value => set({ pomodoroTime: value }),
      setShortBreakTime: value => set({ shortBreakTime: value }),
      setLongBreakTime: value => set({ longBreakTime: value }),
      setActiveColor: color => set({ activeColor: color }),
      setActiveFont: font => set({ activeFont: font }),
      setPause: value => set({ isPaused: value }),
    }),
    {
      name: 'pomodoro-storage',
      partialize: state => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !['isPaused'].includes(key))
        );
      },
    }
  )
);
