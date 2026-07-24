import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './components/BrandLogo';
import { DisclaimerModal } from './components/DisclaimerModal';
import { PhoneLoginModal } from './components/PhoneLoginModal';
import { UserDashboard } from './components/UserDashboard';
import { Toast, ToastMessage } from './components/Toast';
import bgImage from './assets/images/login_bg_1784889627874.jpg';

export default function App() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAgreedShaking, setIsAgreedShaking] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');

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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    showToast('已安全退出登录', 'info');
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-900 flex items-center justify-center p-0 sm:p-4 select-none font-sans overflow-hidden">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} />

      {/* Main Mobile Screen Wrapper */}
      <div className="relative w-full max-w-[430px] h-[100vh] sm:h-[880px] sm:max-h-[92vh] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col justify-between border-0 sm:border-[8px] sm:border-neutral-800">

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={bgImage}
            alt="Atmospheric background mist"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top scale-105"
          />
          {/* Subtle gradient overlay to ensure smooth white blending at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
        </div>

        {/* Top Area: Poetic Typography */}
        <div className="relative z-10 pt-28 sm:pt-32 px-8 flex flex-col items-center justify-center text-center space-y-8">
          {/* Faint Upper Poem Lines */}
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

          {/* Mirrored Semi-Transparent Lower Poem Lines matching photo */}
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
                {/* Primary Pill Button: 手机号快捷登陆 */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoginClick}
                  className="w-full py-4 px-6 bg-[#213323] hover:bg-[#1a291c] text-white text-base font-medium rounded-full shadow-xl shadow-[#213323]/25 flex items-center justify-center transition-all cursor-pointer tracking-wider"
                >
                  手机号快捷登陆
                </motion.button>

                {/* Agreement Checkbox Line */}
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

                {/* Bottom Brand Identity */}
                <div className="pt-10 pb-2">
                  <BrandLogo size={40} />
                </div>
              </motion.div>
            ) : (
              <UserDashboard
                key="dashboard"
                phone={userPhone}
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>
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
