import React, { useState } from 'react';
import { CoursePage } from './components/CoursePage';
import { MyPrizesPage } from './components/MyPrizesPage';
import { Toast, ToastMessage } from './components/Toast';
import { BookOpen, Gift } from 'lucide-react';

type ViewMode = 'course' | 'prizes';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<ViewMode>('course');

  // Toast Helper
  const showToast = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center p-0 sm:p-4 select-none font-sans overflow-hidden">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} />

      {/* Main Mobile Screen Frame */}
      <div className="relative w-full max-w-[430px] h-[100vh] sm:h-[880px] sm:max-h-[92vh] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col justify-between border-0 sm:border-[8px] sm:border-neutral-800">

        {/* Dynamic View Switcher */}
        <div className="relative w-full h-full flex flex-col overflow-hidden">
          {activeTab === 'course' ? (
            <CoursePage onShowToast={showToast} />
          ) : (
            <MyPrizesPage
              onShowToast={showToast}
              onNavigateToCourse={() => setActiveTab('course')}
            />
          )}
        </div>

        {/* Bottom Tab Bar (WeChat Mini Program style navigation) */}
        <div className="relative z-30 bg-white border-t border-neutral-200/80 px-4 py-2.5 flex items-center justify-around shadow-lg shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('course')}
            className={`flex flex-col items-center gap-1 py-1 px-6 rounded-2xl transition-all relative cursor-pointer ${
              activeTab === 'course'
                ? 'text-[#243727] font-extrabold bg-[#243727]/10'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'course' ? 'text-[#243727]' : 'text-neutral-400'}`} />
            <span className="text-[11px] tracking-tight">精选课程</span>
            {activeTab === 'course' && (
              <span className="absolute -top-1 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#243727] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#243727]"></span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prizes')}
            className={`flex flex-col items-center gap-1 py-1 px-6 rounded-2xl transition-all relative cursor-pointer ${
              activeTab === 'prizes'
                ? 'text-[#243727] font-extrabold bg-[#243727]/10'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <Gift className={`w-5 h-5 ${activeTab === 'prizes' ? 'text-[#243727]' : 'text-neutral-400'}`} />
            <span className="text-[11px] tracking-tight">我的奖品</span>
            {activeTab === 'prizes' && (
              <span className="absolute -top-1 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#243727] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#243727]"></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
