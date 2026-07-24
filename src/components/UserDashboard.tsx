import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import {
  User,
  ShieldCheck,
  LogOut,
  Sparkles,
  CheckCircle2,
  Copy,
  ChevronRight,
  Store,
  QrCode,
  Wallet,
  Users,
  Heart,
  MapPin,
  Edit3,
  Share2,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  ShoppingBag,
  Film,
  Award,
  X,
  Check,
  Gift,
  ArrowUpRight,
  AlertCircle,
  ScanLine,
  TrendingUp,
} from 'lucide-react';

export interface UserDashboardProps {
  phone: string;
  onLogout: () => void;
  onOpenUpload?: () => void;
  onShowToast?: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  phone,
  onLogout,
  onOpenUpload,
  onShowToast,
}) => {
  const showToast = (msg: string, type: 'info' | 'success' | 'warning' = 'info') => {
    if (onShowToast) {
      onShowToast(msg, type);
    }
  };

  const maskedPhone = phone.length >= 11 ? `${phone.slice(0, 3)}****${phone.slice(7)}` : phone || '138****8888';
  const userId = '8829401';

  // Modals state
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Editable Profile Form State
  const [nickname, setNickname] = useState('黔藤茶友');
  const [gender, setGender] = useState('男');
  const [birthday, setBirthday] = useState('1992-08-18');
  const [email, setEmail] = useState('qianteng@example.com');

  const handleCopyUid = () => {
    navigator.clipboard.writeText(userId);
    showToast(`UID ${userId} 已复制到剪贴板`, 'success');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F9FAFB] text-neutral-800 font-sans overflow-hidden">
      {/* Top Fixed Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            个人中心
          </span>
          <span className="text-[10px] font-bold text-[#243727] bg-[#243727]/8 px-2 py-0.5 rounded-full">
            VIP·一级学员
          </span>
        </div>

        {/* Top Logout Text Button */}
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="px-2.5 py-1 text-xs font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 border border-neutral-200 hover:border-red-200 rounded-full transition-all cursor-pointer"
        >
          退出登录
        </button>
      </div>

      {/* Main Scrollable Dashboard Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-28 scrollbar-none">

        {/* Hero User Header Card */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div
                onClick={() => setShowProfilePopup(true)}
                className="relative w-12 h-12 rounded-full bg-[#243727] text-white flex items-center justify-center font-bold text-lg shadow-sm cursor-pointer group shrink-0"
              >
                <User className="w-6 h-6" />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#243727] border-2 border-white rounded-full flex items-center justify-center text-white text-[9px]">
                  +
                </div>
              </div>

              {/* User Info Line */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-900 font-serif">
                    {nickname}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                    一级学员
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <span>{maskedPhone}</span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={handleCopyUid}
                    className="inline-flex items-center gap-0.5 text-neutral-400 hover:text-[#243727] font-mono cursor-pointer"
                  >
                    <span>UID: {userId}</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowProfilePopup(true)}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Profile Hero Bar Actions */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-100 text-center">
            <button
              type="button"
              onClick={() => setShowProfilePopup(true)}
              className="py-2 px-1 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-neutral-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#243727]" />
              <span>个人资料</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="py-2 px-1 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-neutral-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-[#243727]" />
              <span>推广码</span>
            </button>

            {onOpenUpload && (
              <button
                type="button"
                onClick={onOpenUpload}
                className="py-2 px-1 rounded-xl bg-[#243727]/10 hover:bg-[#243727]/15 text-xs font-bold text-[#243727] transition-colors flex items-center justify-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5" />
                <span>创作投稿</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: 商家与经营功能 (Top Priority / Front Section) */}
        {/* ========================================================= */}

        {/* 1. 商户中心 (Merchant Center) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                BIZ · 商户中心
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                商户经营管理
              </div>
            </div>
            <span className="text-[10px] font-bold text-neutral-400 bg-stone-100 px-2 py-0.5 rounded tracking-wider">
              QIANTENG BIZ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => showToast('已进入商家订单管理大厅', 'info')}
              className="p-3 bg-stone-50 hover:bg-stone-100 border border-neutral-200/80 rounded-xl flex flex-col items-start gap-1.5 transition-all text-left active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#243727] text-white flex items-center justify-center shadow-2xs">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">订单管理</div>
                <div className="text-[10px] text-neutral-400">MERCHANT · ORDERS</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => showToast('已启动扫码核销摄像头', 'info')}
              className="p-3 bg-stone-50 hover:bg-stone-100 border border-neutral-200/80 rounded-xl flex flex-col items-start gap-1.5 transition-all text-left active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#243727] text-white flex items-center justify-center shadow-2xs">
                <ScanLine className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">团购核销</div>
                <div className="text-[10px] text-neutral-400">GROUP · VERIFY</div>
              </div>
            </button>
          </div>
        </div>

        {/* 2. 资金与收益 (Wallet & Assets) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                WALLET · 我的资产
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                收益与积分资产
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('正同步最新资金流水', 'info')}
              className="text-[11px] text-[#243727] font-medium flex items-center gap-0.5 hover:underline"
            >
              <span>流水明细</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 divide-x divide-neutral-100 py-1 text-center bg-stone-50/80 rounded-xl border border-neutral-100">
            <div className="p-2 space-y-0.5">
              <div className="text-lg font-black text-neutral-900 font-mono">
                1,580
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">可用积分</div>
            </div>

            <div className="p-2 space-y-0.5">
              <div className="text-lg font-black text-[#243727] font-mono">
                ¥1,280.50
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">佣金余额</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-0.5 text-center">
            <button
              type="button"
              onClick={() => showToast('已进入积分任务中心', 'info')}
              className="py-2 px-1 bg-stone-50 hover:bg-stone-100 rounded-lg text-xs font-semibold text-neutral-700 transition-colors"
            >
              任务中心
            </button>
            <button
              type="button"
              onClick={() => showToast('佣金提现申请通道开放中', 'info')}
              className="py-2 px-1 bg-stone-50 hover:bg-stone-100 rounded-lg text-xs font-semibold text-neutral-700 transition-colors"
            >
              佣金明细
            </button>
            <button
              type="button"
              onClick={() => {
                if (onOpenUpload) onOpenUpload();
              }}
              className="py-2 px-1 bg-stone-50 hover:bg-stone-100 rounded-lg text-xs font-semibold text-neutral-700 transition-colors"
            >
              作品管理
            </button>
          </div>
        </div>

        {/* 3. 学员与推广 (Referral Program) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                REFERRAL · 学员推广
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                我的推广与团队
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              已激活
            </span>
          </div>

          <div className="p-3 bg-[#243727]/5 border border-[#243727]/15 rounded-xl space-y-1.5">
            <div className="text-xs font-bold text-[#243727] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#243727]" />
              一级学员推广权益
            </div>
            <div className="text-[11px] text-neutral-600 leading-relaxed">
              您已是一级学员，分享专属二维码发展客户，下线消费后您可获得相应佣金奖励。
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="py-2.5 bg-[#243727] hover:bg-[#1a281c] text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>专属推广码</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('当前已绑定下线团队：12 人', 'info')}
              className="py-2.5 bg-stone-100 hover:bg-stone-200 text-neutral-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#243727]" />
              <span>我的团队下线</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: 用户个人功能 (User Personal Features - Below) */}
        {/* ========================================================= */}

        {/* 4. 我的订单 (My Orders) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                ORDERS · 我的订单
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                商城消费订单
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('进入全部订单列表', 'info')}
              className="text-[11px] text-neutral-500 hover:text-[#243727] font-medium flex items-center gap-0.5"
            >
              <span>查看全部</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center">
            <button
              type="button"
              onClick={() => showToast('待付款订单：2', 'info')}
              className="py-2 flex flex-col items-center gap-1.5 group hover:bg-stone-50 rounded-xl transition-colors"
            >
              <div className="relative w-9 h-9 rounded-full bg-stone-100 text-neutral-800 flex items-center justify-center group-hover:bg-[#243727] group-hover:text-white transition-colors">
                <CreditCard className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="text-xs text-neutral-700 font-medium">待付款</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('待发货订单：1', 'info')}
              className="py-2 flex flex-col items-center gap-1.5 group hover:bg-stone-50 rounded-xl transition-colors"
            >
              <div className="relative w-9 h-9 rounded-full bg-stone-100 text-neutral-800 flex items-center justify-center group-hover:bg-[#243727] group-hover:text-white transition-colors">
                <Package className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  1
                </span>
              </div>
              <span className="text-xs text-neutral-700 font-medium">待发货</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('暂无待收货订单', 'info')}
              className="py-2 flex flex-col items-center gap-1.5 group hover:bg-stone-50 rounded-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-stone-100 text-neutral-800 flex items-center justify-center group-hover:bg-[#243727] group-hover:text-white transition-colors">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs text-neutral-700 font-medium">待收货</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('进入售后单记录', 'info')}
              className="py-2 flex flex-col items-center gap-1.5 group hover:bg-stone-50 rounded-xl transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-stone-100 text-neutral-800 flex items-center justify-center group-hover:bg-[#243727] group-hover:text-white transition-colors">
                <RotateCcw className="w-4 h-4" />
              </div>
              <span className="text-xs text-neutral-700 font-medium">售后/退款</span>
            </button>
          </div>
        </div>

        {/* 5. 我的团购订单 (Group Buy Orders) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                GROUPBUY · 我的团购
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                团购代金券与套餐
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('进入团购券包明细', 'info')}
              className="text-[11px] text-neutral-500 hover:text-[#243727] font-medium flex items-center gap-0.5"
            >
              <span>查看全部</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => showToast('团购待付款：0', 'info')}
              className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-neutral-100 text-left space-y-0.5"
            >
              <div className="text-xs font-bold text-neutral-800">待付款</div>
              <div className="text-[10px] text-neutral-400">去付款 ›</div>
            </button>

            <button
              type="button"
              onClick={() => showToast('待使用团购券：1张', 'info')}
              className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-neutral-100 text-left space-y-0.5"
            >
              <div className="text-xs font-bold text-[#243727] flex items-center justify-between">
                <span>待使用</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[10px] text-neutral-400">查看券码 ›</div>
            </button>

            <button
              type="button"
              onClick={() => showToast('已核销记录：3笔', 'info')}
              className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-neutral-100 text-left space-y-0.5"
            >
              <div className="text-xs font-bold text-neutral-800">已核销</div>
              <div className="text-[10px] text-neutral-400">核销历史 ›</div>
            </button>
          </div>
        </div>

        {/* 6. 我的收藏 (Favorites) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                FAVORITES · 我的收藏
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                收藏的商品与文章
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('进入收藏夹', 'info')}
              className="text-[11px] text-neutral-500 hover:text-[#243727] font-medium flex items-center gap-0.5"
            >
              <span>管理收藏</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-stone-50 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#243727] text-white flex items-center justify-center font-bold text-[11px]">
                  茶
                </div>
                <div>
                  <div className="font-bold text-neutral-900">黔藤壹号 · 特级金丝皇菊礼盒</div>
                  <div className="text-[10px] text-neutral-400">收藏商品</div>
                </div>
              </div>
              <span className="font-mono font-bold text-[#243727]">¥168.00</span>
            </div>

            <div className="p-2.5 bg-stone-50 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-[11px]">
                  文
                </div>
                <div>
                  <div className="font-bold text-neutral-900">黔藤茶道冲泡解析与养生技巧</div>
                  <div className="text-[10px] text-neutral-400">收藏文章</div>
                </div>
              </div>
              <span className="text-[10px] text-neutral-400">文化鉴赏</span>
            </div>
          </div>
        </div>

        {/* 7. 收货地址 (Shipping Address) */}
        <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                ADDRESS · 收货地址
              </div>
              <div className="text-sm font-bold text-neutral-900 font-serif">
                常用收货地址
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('进入地址管理', 'info')}
              className="text-[11px] text-neutral-500 hover:text-[#243727] font-medium flex items-center gap-0.5"
            >
              <span>管理地址</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-900">张先生</span>
                <span className="text-neutral-500 font-mono">138****8888</span>
              </div>
              <span className="text-[9px] font-bold bg-[#243727] text-white px-1.5 py-0.5 rounded">
                DEFAULT
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
              <span>贵州省贵阳市观山湖区黔藤大厦 1802 室</span>
            </div>
          </div>
        </div>

      </div>

      {/* Profile Detail & Edit Modal */}
      <AnimatePresence>
        {showProfilePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfilePopup(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 z-10 space-y-4 border border-neutral-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                    PROFILE · 个人信息
                  </div>
                  <div className="text-sm font-bold text-neutral-900 font-serif">
                    个人资料修改
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProfilePopup(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-neutral-500 font-medium">昵称</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-neutral-200 rounded-lg font-medium text-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-neutral-500 font-medium">性别</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-neutral-200 rounded-lg font-medium text-neutral-900"
                    >
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-500 font-medium">生日</label>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="w-full px-2.5 py-2 bg-stone-50 border border-neutral-200 rounded-lg font-medium text-neutral-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-500 font-medium">常用邮箱</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-neutral-200 rounded-lg font-medium text-neutral-900"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowProfilePopup(false);
                  showToast('个人资料已成功保存', 'success');
                }}
                className="w-full py-2.5 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                保存修改
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Referral QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white rounded-3xl shadow-2xl p-6 z-10 text-center space-y-4 border border-neutral-100"
            >
              <div className="space-y-1">
                <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  REFERRAL · 专属二维码
                </div>
                <div className="text-sm font-bold text-neutral-900 font-serif">
                  黔藤壹号 一级学员推广码
                </div>
              </div>

              {/* Styled QR code mock graphic */}
              <div className="w-48 h-48 mx-auto bg-stone-50 rounded-2xl border-2 border-neutral-900 p-3 flex flex-col items-center justify-center relative shadow-inner">
                <QrCode className="w-32 h-32 text-neutral-900" />
                <div className="mt-1 text-[10px] font-mono font-bold text-[#243727]">
                  INVITE: QTYH-8829401
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                扫码即可绑定专属邀请关系，客户下单后您将自动获得丰厚佣金返现。
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowQrModal(false);
                  showToast('二维码图片已保存至相册', 'success');
                }}
                className="w-full py-2.5 bg-[#243727] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#1a281c]"
              >
                保存图片到相册
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl p-5 z-10 text-center space-y-4 border border-neutral-100"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-neutral-900 font-serif">
                  确认退出登录？
                </div>
                <div className="text-xs text-neutral-500">
                  退出后您仍可浏览基本内容，再次操作需要重新验证手机号。
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutConfirm(false);
                    onLogout();
                  }}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  确认退出
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
