import 'src/styles/animations.css';

import { Dispatch, FC, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import Check from 'src/assets/svg/check.svg';
import Close from 'src/assets/svg/close.svg';
import { useModal } from 'src/components/Modal/useModal';
import NumberInput from 'src/components/NumberInput';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const {
    times,
    color,
    buttonClasses,
    modalClasses,
    areCorrectTimeValues,
    fontClasses,
    handleColorChange,
    applyChanges,
    closeModal,
    handleTimeChange,
    handleFontChange,
  } = useModal(setIsOpen);

  const element = (
    <div
      className={modalClasses}
      onClick={closeModal}
    >
      <div
        className="relative max-w-[480px] w-full rounded-3xl bg-white"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b-[2px] border-solid border-[#eae8e8]">
          <h2 className="font-bold text-3xl text-textDark">Settings</h2>
          <button
            className="disabled:cursor-not-allowed"
            onClick={closeModal}
            disabled={!areCorrectTimeValues}
          >
            <Close />
          </button>
        </div>
        <div className="p-6 pb-10">
          <div className="pb-6 border-b-[2px] border-solid border-lightgrey">
            <h3 className="mb-3 text-textDark uppercase font-medium tracking-[4px]">
              time (minutes)
            </h3>
            <div className="flex items-center gap-3">
              <NumberInput
                label="pomodoro"
                min={1}
                value={times.pomodoroTime}
                onChange={event => handleTimeChange('pomodoroTime', Number(event.target.value))}
              />
              <NumberInput
                label="short break"
                min={1}
                value={times.shortBreakTime}
                onChange={event => handleTimeChange('shortBreakTime', Number(event.target.value))}
              />
              <NumberInput
                label="long break"
                min={1}
                value={times.longBreakTime}
                onChange={event => handleTimeChange('longBreakTime', Number(event.target.value))}
              />
            </div>
          </div>
          <div className="py-6 border-b-[2px] border-solid border-lightgrey flex items-center justify-between">
            <h3 className="text-textDark uppercase font-medium tracking-[4px]">font</h3>
            <div className="flex items-center gap-3">
              <button
                className={`${fontClasses('montserrat')} font-montserrat`}
                onClick={handleFontChange('montserrat')}
              >
                Aa
              </button>
              <button
                className={`${fontClasses('mono')} font-mono`}
                onClick={handleFontChange('mono')}
              >
                Aa
              </button>
              <button
                className={`${fontClasses('serif')} font-serif`}
                onClick={handleFontChange('serif')}
              >
                Aa
              </button>
            </div>
          </div>
          <div className="pt-6 flex items-center justify-between">
            <h3 className="text-textDark uppercase font-medium tracking-[4px]">color</h3>
            <div className="flex items-center gap-3">
              <button
                className="w-[40px] h-[40px] grid place-items-center rounded-full bg-red"
                onClick={handleColorChange('red')}
              >
                {color === 'red' && <Check />}
              </button>
              <button
                className="w-[40px] h-[40px] grid place-items-center rounded-full bg-lightblue"
                onClick={handleColorChange('lightblue')}
              >
                {color === 'lightblue' && <Check />}
              </button>
              <button
                className="w-[40px] h-[40px] grid place-items-center rounded-full bg-purple"
                onClick={handleColorChange('purple')}
              >
                {color === 'purple' && <Check />}
              </button>
            </div>
          </div>
          <button
            className={buttonClasses}
            disabled={!areCorrectTimeValues}
            onClick={applyChanges}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );

  return isOpen ? createPortal(element, document.getElementById('modal-root')!) : null;
};

export default Modal;
