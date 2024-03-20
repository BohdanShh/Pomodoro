import classNames from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { useStore } from 'src/store/useStore';
import { TabVariants } from 'src/types';

type Props = {
  activeTab: TabVariants;
  onActiveTabChange: Dispatch<SetStateAction<TabVariants>>;
};

const Tabs: FC<Props> = ({ activeTab, onActiveTabChange }) => {
  const { isPaused, activeColor } = useStore(state => ({
    isPaused: state.isPaused,
    activeColor: state.activeColor,
  }));

  const tabsClasses = classNames(
    'relative z-10 w-full flex items-center before:absolute before:-z-10 before:h-full before:w-[calc(100%_/_3)] before:rounded-[64px] before:transition-all before:duration-500',
    {
      'before:translate-x-0': activeTab === 'pomodoro',
      'before:translate-x-full': activeTab === 'shortBreak',
      'before:translate-x-[200%]': activeTab === 'longBreak',
      'before:bg-red': activeColor === 'red',
      'before:bg-lightblue': activeColor === 'lightblue',
      'before:bg-purple': activeColor === 'purple',
    }
  );

  const buttonClasses = (tabName: string) => {
    return classNames(
      'w-[33.333%] py-3 text-center font-bold text-[#797f9d] hover:text-textLight transition-all duration-500',
      {
        'text-textDark hover:text-textDark': activeTab === tabName,
      }
    );
  };

  const handleActiveTabChange = (tab: TabVariants): void => {
    if (!isPaused) {
      toast('Timer is running. Pause it to change mode', { type: 'info' });

      return;
    }

    onActiveTabChange(tab);
  };

  return (
    <div className="z-10 w-full p-2 rounded-[64px] bg-textDark">
      <div className={tabsClasses}>
        <button
          className={buttonClasses('pomodoro')}
          onClick={() => handleActiveTabChange('pomodoro')}
        >
          pomodoro
        </button>
        <button
          className={buttonClasses('shortBreak')}
          onClick={() => handleActiveTabChange('shortBreak')}
        >
          short break
        </button>
        <button
          className={buttonClasses('longBreak')}
          onClick={() => handleActiveTabChange('longBreak')}
        >
          long break
        </button>
      </div>
    </div>
  );
};

export default Tabs;
