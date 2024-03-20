import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames';
import { FC, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Settings from 'src/assets/svg/settings.svg';
import Modal from 'src/components/Modal';
import Tabs from 'src/components/Tabs';
import Timer from 'src/components/Timer';
import { useStore } from 'src/store/useStore';
import { TabVariants } from 'src/types';

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<TabVariants>('pomodoro');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeFont = useStore(state => state.activeFont);

  const appClasses = classNames('h-screen grid place-items-center bg-[#1e213f]', {
    'font-mono': activeFont === 'mono',
    'font-montserrat': activeFont === 'montserrat',
    'font-serif': activeFont === 'serif',
  });

  return (
    <>
      <div className={appClasses}>
        <div className="max-w-[500px] px-[15px] w-full flex flex-col items-center justify-center gap-[50px]">
          <h1 className="text-4xl text-textLight font-bold">Pomodoro</h1>
          <Tabs
            activeTab={activeTab}
            onActiveTabChange={setActiveTab}
          />
          <Timer activeTab={activeTab} />
          <button onClick={() => setIsModalOpen(true)}>
            <Settings className="transition-all duration-300 hover:fill-textLight" />
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
