import { FC, useState } from 'react';
import Settings from 'src/assets/svg/settings.svg';
import Modal from 'src/components/Modal';
import Tabs from 'src/components/Tabs';
import Timer from 'src/components/Timer';
import { TabVariants } from 'src/types';

const App: FC = () => {
  const [activeTab, setActiveTab] = useState<TabVariants>('pomodoro');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="h-screen grid place-items-center bg-[#1e213f]">
      <div className="max-w-[500px] px-[15px] w-full flex flex-col items-center justify-center gap-[50px]">
        <h1 className="text-4xl text-[#d7e0ff] font-bold">Pomodoro</h1>
        <Tabs
          activeTab={activeTab}
          onActiveTabChange={setActiveTab}
        />
        <Timer />
        <button onClick={() => setIsModalOpen(true)}>
          <Settings className="transition-all duration-300 hover:fill-[#d7e0ff]" />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
};

export default App;
