import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './components/BrandLogo';
import { DisclaimerModal } from './components/DisclaimerModal';
import { PhoneLoginModal } from './components/PhoneLoginModal';
import { UserDashboard } from './components/UserDashboard';
import { VideoUploadPage } from './components/VideoUploadPage';
import { LotteryPage } from './components/LotteryPage';
import { CommissionPage } from './components/CommissionPage';
import { Toast, ToastMessage } from './components/Toast';
import { LogIn, Upload, User, Gift, Wallet } from 'lucide-react';
import bgImage from './assets/images/login_bg_1784889627874.jpg';

type ViewMode = 'login' | 'upload' | 'profile' | 'lottery' | 'commission';

export default function App() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAgreedShaking, setIsAgreedShaking] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default logged-in state to showcase profile page
  const [userPhone, setUserPhone] = useState('13888888888');
  const [activeTab, setActiveTab] = useState<ViewMode>('commission'); // Default to commission view to highlight requested beautification

  // Toast Helper
  const showToast = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleLoginClick = () => {
    if (!agreedTerms) {
      setIsAgreedShaking(true);
      setTimeout(() => setIsAgreedShaking(false), 600);
      showToast('请先阅读并勾选《免责条款》', 'warning');
      return;
    }
    setIsPhoneModalOpen(true);
  };

  const handleSuccessLogin = (phone: string) => {
    setUserPhone(phone);
    setIsLoggedIn(true);
    setActiveTab('profile');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    setActiveTab('login');
    showToast('已安全退出登录', 'info');
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center p-0 sm:p-4 select-none font-sans overflow-hidden">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} />

      {/* Main Mobile Screen Frame */}
      <div className="relative w-full max-w-[430px] h-[100vh] sm:h-[880px] sm:max-h-[92vh] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col justify-between border-0 sm:border-[8px] sm:border-neutral-800">

        {/* Dynamic View Switcher */}
        <div className="relative w-full h-full flex flex-col overflow-hidden">
          {activeTab === 'commission' ? (
            <CommissionPage onShowToast={showToast} />
          ) : activeTab === 'lottery' ? (
            <LotteryPage onShowToast={showToast} />
          ) : activeTab === 'upload' ? (
            <VideoUploadPage
              onBack={() => setActiveTab('profile')}
              onShowToast={showToast}
            />
          ) : activeTab === 'profile' ? (
            <UserDashboard
              phone={userPhone}
              onLogout={handleLogout}
              onOpenUpload={() => setActiveTab('upload')}
              onShowToast={showToast}
            />
          ) : (
            <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src={bgImage}
                  alt="Atmospheric background mist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
              </div>

              {/* Top Area: Poetic Typography */}
              <div className="relative z-10 pt-24 sm:pt-28 px-8 flex flex-col items-center justify-center text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.75, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="space-y-1 text-white font-light text-sm tracking-[0.45em] pl-[0.45em] drop-shadow-sm"
                >
                  <div>编 织</div>
                  <div>向 上 蔓 延 的</div>
                  <div>未 来</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                  className="space-y-2 text-white/80 font-extralight text-base tracking-[0.55em] pl-[0.55em]"
                >
                  <div>编 织</div>
                  <div>向 上 蔓 延 的</div>
                  <div>未 来</div>
                </motion.div>
              </div>

              {/* Center / Lower Content Section */}
              <div className="relative z-10 px-8 pb-10 flex flex-col items-center w-full">
                <AnimatePresence mode="wait">
                  {!isLoggedIn ? (
                    <motion.div
                      key="login-controls"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="w-full flex flex-col items-center space-y-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLoginClick}
                        className="w-full py-4 px-6 bg-[#213323] hover:bg-[#1a291c] text-white text-base font-medium rounded-full shadow-xl shadow-[#213323]/25 flex items-center justify-center transition-all cursor-pointer tracking-wider"
                      >
                        手机号快捷登陆
                      </motion.button>

                      <motion.div
                        animate={
                          isAgreedShaking
                            ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                            : { x: 0 }
                        }
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center gap-2 text-xs text-neutral-600/90"
                      >
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={agreedTerms}
                            onChange={(e) => setAgreedTerms(e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              agreedTerms
                                ? 'bg-[#213323] border-[#213323] text-white'
                                : isAgreedShaking
                                ? 'border-red-500 ring-2 ring-red-200 bg-white'
                                : 'border-neutral-300 bg-white group-hover:border-neutral-400'
                            }`}
                          >
                            {agreedTerms && (
                              <svg
                                className="w-2.5 h-2.5 stroke-current stroke-[3]"
                                viewBox="0 0 12 10"
                                fill="none"
                              >
                                <path d="M1.5 5L4.5 8L10.5 1.5" />
                              </svg>
                            )}
                          </div>
                          <span className="text-neutral-500 font-light">
                            登陆即同意
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsDisclaimerOpen(true)}
                          className="text-neutral-700 font-normal hover:text-[#213323] underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          《免责条款》
                        </button>
                      </motion.div>

                      <div className="pt-6 pb-2">
                        <BrandLogo size={40} />
                      </div>
                    </motion.div>
                  ) : (
                    <UserDashboard
                      key="dashboard"
                      phone={userPhone}
                      onLogout={handleLogout}
                      onOpenUpload={() => setActiveTab('upload')}
                      onShowToast={showToast}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Bar (WeChat Mini Program style navigation) */}
        <div className="relative z-30 bg-white border-t border-neutral-200/80 px-1 py-2 flex items-center justify-around shadow-lg shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('commission')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 transition-all relative ${
              activeTab === 'commission'
                ? 'text-neutral-900 font-bold'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px]">我的佣金</span>
            <span className="absolute -top-0.5 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-800 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lottery')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 transition-all relative ${
              activeTab === 'lottery'
                ? 'text-[#243727] font-bold'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <Gift className="w-5 h-5 text-[#243727]" />
            <span className="text-[10px]">幸运抽奖</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all ${
              activeTab === 'profile'
                ? 'text-[#243727] font-bold'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">个人中心</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all ${
              activeTab === 'upload'
                ? 'text-[#243727] font-bold'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className="text-[10px]">视频投稿</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 transition-all ${
              activeTab === 'login'
                ? 'text-[#243727] font-bold'
                : 'text-neutral-400 hover:text-neutral-600 font-medium'
            }`}
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px]">快捷登录</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onAgreeAndClose={() => setAgreedTerms(true)}
      />

      <PhoneLoginModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
        onShowToast={showToast}
      />
    </div>
  );
}
