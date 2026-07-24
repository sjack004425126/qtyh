import React, { useState, useEffect } from 'react';
import { X, Smartphone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhoneLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (phone: string) => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const PhoneLoginModal: React.FC<PhoneLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  onShowToast,
}) => {
  const [phone, setPhone] = useState('13888888888');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone || phone.length < 11) {
      onShowToast('请输入正确的11位手机号码', 'warning');
      return;
    }

    const mockCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(mockCode);
    setCode(mockCode); // Auto-fill for convenience
    setCountdown(60);

    onShowToast(`验证码已发送至 ${phone.slice(0, 3)}****${phone.slice(7)}：[ ${mockCode} ]`, 'success');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      onShowToast('请填写有效的手机号', 'warning');
      return;
    }
    if (!code) {
      onShowToast('请输入短信验证码', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('登录成功！欢迎回来', 'success');
      onSuccessLogin(phone);
      onClose();
    }, 600);
  };

  const handleQuickDemo = () => {
    setPhone('13888888888');
    setCode('8888');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('一键快捷登录成功！', 'success');
      onSuccessLogin('13888888888');
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
          />

          {/* Sheet / Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 z-10 overflow-hidden border border-neutral-100"
          >
            {/* Drag handle pill on mobile */}
            <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-4 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 tracking-wide font-serif">
                  手机号快捷登录
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  未注册的手机号验证后将自动创建账号
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                  手机号码
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-semibold text-neutral-700 select-none">
                    +86
                  </span>
                  <div className="absolute left-12 w-[1px] h-4 bg-neutral-200" />
                  <input
                    type="tel"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="请输入11位手机号码"
                    className="w-full pl-16 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#243727]/30 focus:border-[#243727] transition-all"
                  />
                </div>
              </div>

              {/* Code Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  验证码
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="请输入验证码"
                    className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#243727]/30 focus:border-[#243727] transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={countdown > 0}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      countdown > 0
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : 'bg-stone-100 text-[#243727] hover:bg-stone-200 active:scale-95'
                    }`}
                  >
                    {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                  </button>
                </div>
              </div>

              {/* Hint code if generated */}
              {generatedCode && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    测试验证码：<strong className="font-mono">{generatedCode}</strong>
                  </span>
                  <span className="text-[10px] text-emerald-600">已自动填入</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-2 bg-[#243727] hover:bg-[#1a281c] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#243727]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>登录 / 注册</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Demo Login Option */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="text-xs text-neutral-400 hover:text-[#243727] underline transition-colors"
                >
                  【演示账号】一键填入并登录
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
