import 'src/styles/animations.css';

import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import Check from 'src/assets/svg/check.svg';
import Close from 'src/assets/svg/close.svg';
import NumberInput from 'src/components/NumberInput';
import { useTimer } from 'src/store/useTimer';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { pomodoroTime, shortBreakTime, longBreakTime } = useTimer(state => ({
    pomodoroTime: state.pomodoroTime,
    shortBreakTime: state.shortBreakTime,
    longBreakTime: state.longBreakTime,
  }));

  const element = (
    <div
      className="absolute top-0 left-0 w-full h-full grid place-items-center px-[15px] bg-[#0000008d] fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative max-w-[480px] w-full rounded-3xl bg-white"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b-[2px] border-solid border-[#eae8e8]">
          <h2 className="font-bold text-3xl text-primary">Settings</h2>
          <button onClick={() => setIsOpen(false)}>
            <Close />
          </button>
        </div>
        <div className="p-6 pb-10">
          <div className="pb-6 border-b-[2px] border-solid border-lightgrey">
            <h3 className="mb-3 text-primary uppercase font-medium tracking-[4px]">
              time (minutes)
            </h3>
            <div className="flex items-center gap-3">
              <NumberInput
                label="pomodoro"
                min={1}
                value={pomodoroTime}
              />
              <NumberInput
                label="short break"
                min={1}
                value={shortBreakTime}
              />
              <NumberInput
                label="long break"
                min={1}
                value={longBreakTime}
              />
            </div>
          </div>
          <div className="py-6 border-b-[2px] border-solid border-lightgrey flex items-center justify-between">
            <h3 className="text-primary uppercase font-medium tracking-[4px]">font</h3>
            <div className="flex items-center gap-3">
              <button className="w-[40px] h-[40px] rounded-full bg-lightgrey">Aa</button>
              <button className="w-[40px] h-[40px] rounded-full bg-lightgrey">Aa</button>
              <button className="w-[40px] h-[40px] rounded-full bg-lightgrey">Aa</button>
            </div>
          </div>
          <div className="pt-6 flex items-center justify-between">
            <h3 className="text-primary uppercase font-medium tracking-[4px]">color</h3>
            <div className="flex items-center gap-3">
              <button className="w-[40px] h-[40px] grid place-items-center rounded-full bg-red">
                <Check />
              </button>
              <button className="w-[40px] h-[40px] grid place-items-center rounded-full bg-lightblue"></button>
              <button className="w-[40px] h-[40px] grid place-items-center rounded-full bg-purple"></button>
            </div>
          </div>
          <button className="absolute bottom-0 left-1/2 w-[140px] p-3 rounded-3xl font-semibold text-center text-white bg-red -translate-x-1/2 translate-y-1/2">
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return isOpen ? createPortal(element, document.getElementById('modal-root')!) : null;
};

export default Modal;
