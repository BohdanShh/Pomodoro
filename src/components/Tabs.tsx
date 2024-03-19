import classNames from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';
import { TabVariants } from 'src/types';

type Props = {
  activeTab: TabVariants;
  onActiveTabChange: Dispatch<SetStateAction<TabVariants>>;
};

const Tabs: FC<Props> = ({ activeTab, onActiveTabChange }) => {
  const tabsClasses = classNames(
    'relative z-20 w-full flex items-center before:absolute before:-z-10 before:h-full before:w-[calc(100%_/_3)] before:rounded-[64px] before:bg-red before:transition-all before:duration-500 ',
    {
      'before:translate-x-0': activeTab === 'pomodoro',
      'before:translate-x-full': activeTab === 'shortBreak',
      'before:translate-x-[200%]': activeTab === 'longBreak',
    }
  );

  const buttonClasses = (tabName: string) => {
    return classNames(
      'w-[33.333%] py-3 text-center font-bold text-[#797f9d] hover:text-[#d7e0ff] transition-all duration-500',
      {
        ' text-primary hover:text-primary': activeTab === tabName,
      }
    );
  };

  return (
    <div className="w-full p-2 rounded-[64px] bg-primary">
      <div className={tabsClasses}>
        <button
          className={buttonClasses('pomodoro')}
          onClick={() => onActiveTabChange('pomodoro')}
        >
          pomodoro
        </button>
        <button
          className={buttonClasses('shortBreak')}
          onClick={() => onActiveTabChange('shortBreak')}
        >
          short break
        </button>
        <button
          className={buttonClasses('longBreak')}
          onClick={() => onActiveTabChange('longBreak')}
        >
          long break
        </button>
      </div>
    </div>
  );
};

export default Tabs;
