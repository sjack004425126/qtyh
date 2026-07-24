import React from 'react';
import { BrandLogo } from './BrandLogo';
import { LogOut, User, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface UserDashboardProps {
  phone: string;
  onLogout: () => void;
  onOpenUpload?: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ phone, onLogout, onOpenUpload }) => {
  const maskedPhone = phone.length >= 11 ? `${phone.slice(0, 3)}****${phone.slice(7)}` : phone;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/60 text-center relative overflow-hidden"
    >
      {/* Decorative Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-800 via-[#243727] to-teal-800" />

      {/* Logo */}
      <div className="pt-2 mb-6">
        <BrandLogo size={48} />
      </div>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full text-xs font-medium mb-4">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        已成功快捷登录
      </div>

      {/* User Info Card */}
      <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/60 mb-5 space-y-3 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#243727] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-900">{maskedPhone}</div>
            <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              黔藤壹号 尊享会员
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-200/50 flex justify-between text-xs text-neutral-500">
          <span>登录时间</span>
          <span className="font-mono text-neutral-700">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Primary Action to Upload Page */}
      {onOpenUpload && (
        <button
          onClick={onOpenUpload}
          className="w-full py-3.5 mb-4 bg-[#243727] hover:bg-[#1a281c] text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          进入视频创作投稿
        </button>
      )}

      {/* Feature Perks */}
      <div className="grid grid-cols-2 gap-2 mb-5 text-xs text-neutral-700">
        <div className="p-3 bg-stone-50/50 rounded-xl border border-stone-100 flex flex-col items-center gap-1">
          <Sparkles className="w-4 h-4 text-[#243727]" />
          <span className="font-medium text-[11px]">特权权益同步</span>
        </div>
        <div className="p-3 bg-stone-50/50 rounded-xl border border-stone-100 flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#243727]" />
          <span className="font-medium text-[11px]">全流程加密</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <LogOut className="w-3.5 h-3.5" />
        退出登录
      </button>
    </motion.div>
  );
};
