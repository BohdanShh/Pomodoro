import { create } from 'zustand';

type TimerStore = {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  activeFont: string;
  activeColor: string;
};

export const useTimer = create<TimerStore>()(() => ({
  pomodoroTime: 30,
  shortBreakTime: 5,
  longBreakTime: 15,
  activeColor: 'red',
  activeFont: '',
}));
