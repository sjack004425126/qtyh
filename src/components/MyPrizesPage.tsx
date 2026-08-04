import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Clock,
  CheckCircle2,
  Copy,
  Ticket,
  Award,
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  QrCode,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';

interface PrizeItem {
  drawId: string;
  prizeName: string;
  prizeDescription: string;
  prizeImage?: string;
  isGuaranteed?: boolean;
  drawTimeText: string;
  claimStatus: 0 | 1 | 2 | 3; // 0: 待领取, 1: 已领取, 2: 已过期, 3: 已作废
  claimStatusText: string;
  deadlineText?: string;
  hasGroupBuy?: boolean;
  groupBuyTitle?: string;
  groupBuyPrice?: string;
  groupBuyCouponCode?: string;
  groupBuyExpireText?: string;
  hasCoupon?: boolean;
  couponName?: string;
  couponValue?: string;
  couponMinAmount?: string;
  couponExpireText?: string;
  iconText: string;
}

const INITIAL_PRIZES: PrizeItem[] = [
  {
    drawId: 'draw-001',
    prizeName: '【特级好礼】黔藤古树白茶 500g 精装礼盒',
    prizeDescription: '采自云贵高原300年古树茶园，手工杀青发酵，含正品保真证书，顺丰包邮到家。',
    prizeImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    isGuaranteed: true,
    drawTimeText: '2026-08-04 11:20',
    claimStatus: 0,
    claimStatusText: '待领取',
    deadlineText: '23小时 45分钟后过期',
    hasGroupBuy: true,
    groupBuyTitle: '【0元特惠】古树白茶包邮提货券',
    groupBuyPrice: '0.00',
    iconText: '🏆'
  },
  {
    drawId: 'draw-002',
    prizeName: '【茶道体验】线下名师盖碗冲泡私享课 1课时',
    prizeDescription: '可前往全国合作茶空间兑换，由高级茶艺师一对一指导盖碗冲泡与水温掌控。',
    prizeImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    isGuaranteed: false,
    drawTimeText: '2026-08-04 09:15',
    claimStatus: 0,
    claimStatusText: '待领取',
    deadlineText: '11小时 20分钟后过期',
    hasCoupon: true,
    couponName: '线下大师课全额体验券',
    couponValue: '299.00',
    couponMinAmount: '0.00',
    couponExpireText: '2026-09-01 23:59',
    iconText: '🎫'
  },
  {
    drawId: 'draw-003',
    prizeName: '【器物美学】宜兴紫砂西施壶（180ml）',
    prizeDescription: '精选原矿朱泥纯手工打制，壶韵优雅，出水顺畅，适合冲泡乌龙茶与熟普洱。',
    prizeImage: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    isGuaranteed: false,
    drawTimeText: '2026-08-02 16:30',
    claimStatus: 1,
    claimStatusText: '已领取',
    hasGroupBuy: true,
    groupBuyTitle: '紫砂壶免单兑换礼券',
    groupBuyPrice: '0.00',
    groupBuyCouponCode: 'QT-2026-889241',
    groupBuyExpireText: '2026-12-31 23:59',
    iconText: '🎟️'
  },
  {
    drawId: 'draw-004',
    prizeName: '【无门槛礼券】精品茶具商城 ¥50 优惠券',
    prizeDescription: '适用于全场手工公道杯、盖碗及茶盘商品，无消费门槛，可与套餐叠加使用。',
    prizeImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    isGuaranteed: true,
    drawTimeText: '2026-08-01 14:00',
    claimStatus: 1,
    claimStatusText: '已领取',
    hasCoupon: true,
    couponName: '茶具商城 ¥50 无门槛券',
    couponValue: '50.00',
    couponMinAmount: '0.00',
    groupBuyCouponCode: 'CPN-8802-9912',
    couponExpireText: '2026-08-31 23:59',
    iconText: '🎫'
  },
  {
    drawId: 'draw-005',
    prizeName: '【试饮包】名山古树普洱（生茶+熟茶）体验装',
    prizeDescription: '内含易武生茶7g+勐海熟茶7g，独立氮气小罐保鲜，品味沉香与甜润。',
    prizeImage: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=600&q=80',
    isGuaranteed: true,
    drawTimeText: '2026-07-28 10:10',
    claimStatus: 1,
    claimStatusText: '已领取',
    hasGroupBuy: true,
    groupBuyTitle: '古树普洱试饮包提货券',
    groupBuyPrice: '0.00',
    groupBuyCouponCode: 'QT-2026-102938',
    groupBuyExpireText: '2026-10-15 23:59',
    iconText: '🎟️'
  }
];

interface MyPrizesPageProps {
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  onNavigateToCourse?: () => void;
}

export function MyPrizesPage({ onShowToast, onNavigateToCourse }: MyPrizesPageProps) {
  const [prizes, setPrizes] = useState<PrizeItem[]>(INITIAL_PRIZES);
  const [activeTab, setActiveTab] = useState<'pending' | 'claimed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [claimModalPrize, setClaimModalPrize] = useState<PrizeItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter prizes by tab and search query
  const filteredPrizes = prizes.filter((item) => {
    const matchesTab =
      activeTab === 'pending' ? item.claimStatus === 0 : item.claimStatus !== 0;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.prizeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prizeDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = prizes.filter((p) => p.claimStatus === 0).length;
  const claimedCount = prizes.filter((p) => p.claimStatus !== 0).length;

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    onShowToast(`核销码 ${code} 已成功复制到剪贴板`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleConfirmClaim = () => {
    if (!claimModalPrize) return;

    const generatedCode = `QT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    setPrizes((prev) =>
      prev.map((item) => {
        if (item.drawId === claimModalPrize.drawId) {
          return {
            ...item,
            claimStatus: 1,
            claimStatusText: '已领取',
            deadlineText: undefined,
            groupBuyCouponCode: generatedCode,
            groupBuyExpireText: '2026-12-31 23:59'
          };
        }
        return item;
      })
    );

    onShowToast(`成功领取「${claimModalPrize.prizeName}」！核销码已生成`, 'success');
    setClaimModalPrize(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FA] text-neutral-800 font-sans overflow-hidden select-none">
      
      {/* Top Header Section (Matching CoursePage #243727 styling) */}
      <div className="bg-[#243727] text-white px-4 pt-4 pb-3 shrink-0 shadow-md border-b border-white/10 z-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-emerald-300 font-bold uppercase">
                WINNING HISTORY
              </div>
              <h1 className="text-base font-black font-serif tracking-tight text-white">
                我的中奖纪录
              </h1>
            </div>
          </div>

          <span className="px-2.5 py-1 bg-white/10 rounded-full text-[11px] font-bold text-amber-200 border border-amber-200/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            共获奖 {prizes.length} 次
          </span>
        </div>

        {/* Tab Switcher: 待领取 vs 已领取 */}
        <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer font-extrabold text-xs flex items-center justify-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-emerald-400 text-neutral-900 shadow-md font-black'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>待领取奖品</span>
            {pendingCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                activeTab === 'pending' ? 'bg-[#243727] text-white' : 'bg-emerald-500 text-white'
              }`}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('claimed')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer font-extrabold text-xs flex items-center justify-center gap-1.5 ${
              activeTab === 'claimed'
                ? 'bg-emerald-400 text-neutral-900 shadow-md font-black'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>已领取奖品</span>
            {claimedCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                activeTab === 'claimed' ? 'bg-[#243727] text-white' : 'bg-white/20 text-white'
              }`}>
                {claimedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-bar: Search Filter & Stats */}
      <div className="px-3.5 py-2 bg-white border-b border-neutral-200/80 shrink-0 flex items-center justify-between gap-2 z-10">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索奖品名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-neutral-100/80 rounded-full text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#243727]"
          />
        </div>

        {onNavigateToCourse && (
          <button
            type="button"
            onClick={onNavigateToCourse}
            className="px-2.5 py-1.5 bg-[#243727]/10 hover:bg-[#243727]/20 text-[#243727] font-bold text-[11px] rounded-full transition-all flex items-center gap-1 shrink-0"
          >
            <BookOpen className="w-3 h-3" />
            <span>精选课程</span>
          </button>
        )}
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {filteredPrizes.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl mb-3">
              🎁
            </div>
            <h3 className="text-sm font-bold text-neutral-800 font-serif mb-1">
              {activeTab === 'pending' ? '暂无待领取的奖品' : '暂无已领取的历史奖品'}
            </h3>
            <p className="text-xs text-neutral-400 max-w-[220px] mb-4">
              {activeTab === 'pending'
                ? '参与茶道抽奖或购买高级精选课程即可获得丰富好礼。'
                : '成功领取的奖品核销码及优惠券将显示在这里。'}
            </p>
            {onNavigateToCourse && (
              <button
                type="button"
                onClick={onNavigateToCourse}
                className="px-4 py-2 bg-[#243727] hover:bg-[#1a281c] text-white text-xs font-bold rounded-full shadow-md transition-all flex items-center gap-1.5"
              >
                <span>浏览茶道精彩课程</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            )}
          </div>
        ) : (
          filteredPrizes.map((item) => (
            <motion.div
              key={item.drawId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs overflow-hidden flex flex-col transition-all hover:border-[#243727]/40"
            >
              {/* Card Header & Main Info */}
              <div className="p-3.5 flex gap-3 items-start relative">
                {/* Image / Icon Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200/60 shadow-2xs">
                  {item.prizeImage ? (
                    <img
                      src={item.prizeImage}
                      alt={item.prizeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#243727] to-[#121c14] flex items-center justify-center text-2xl">
                      {item.iconText}
                    </div>
                  )}

                  {item.isGuaranteed && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-emerald-600 text-white text-[8px] font-black rounded backdrop-blur-xs">
                      保底
                    </span>
                  )}
                </div>

                {/* Right Text Info */}
                <div className="flex-1 min-w-0 pr-16">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {item.drawTimeText}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2 font-serif mb-1">
                    {item.prizeName}
                  </h3>

                  <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                    {item.prizeDescription}
                  </p>
                </div>

                {/* Top Right Status Badge */}
                <div className="absolute top-3.5 right-3.5">
                  {item.claimStatus === 0 ? (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      待领取
                    </span>
                  ) : item.claimStatus === 1 ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded-full flex items-center gap-1 shadow-2xs">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      已领取
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-500 border border-neutral-200 text-[10px] font-bold rounded-full">
                      已失效
                    </span>
                  )}
                </div>
              </div>

              {/* Sub-Card Details (Coupon / GroupBuy / Redemption Code) */}
              <div className="px-3.5 pb-3.5 pt-0">
                {/* 待领取 Banner + Action */}
                {item.claimStatus === 0 && (
                  <div className="mt-1 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-900 font-medium min-w-0">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate font-mono text-[11px] text-emerald-800 font-bold">
                        {item.deadlineText || '请在有效期内尽快领取'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setClaimModalPrize(item)}
                      className="px-3.5 py-1.5 bg-[#243727] hover:bg-[#1a281c] text-white text-xs font-bold rounded-full shadow-md transition-all shrink-0 flex items-center gap-1 cursor-pointer active:scale-95 border border-emerald-400/30"
                    >
                      <Gift className="w-3 h-3 text-emerald-300" />
                      <span>立即领取</span>
                    </button>
                  </div>
                )}

                {/* 已领取 Redemption Code Banner */}
                {item.claimStatus === 1 && item.groupBuyCouponCode && (
                  <div className="mt-1 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                        <QrCode className="w-3.5 h-3.5 text-[#243727]" />
                        <span>提货/出示核销码</span>
                      </div>
                      {item.groupBuyExpireText && (
                        <span className="text-[10px] text-neutral-400 font-mono">
                          有效期至 {item.groupBuyExpireText}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-2xs">
                      <span className="font-mono text-sm font-black text-[#243727] tracking-wider">
                        {item.groupBuyCouponCode}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopyCode(item.groupBuyCouponCode!)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                          copiedCode === item.groupBuyCouponCode
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {copiedCode === item.groupBuyCouponCode ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>已复制</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-500" />
                            <span>复制</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Coupon Info Box if present */}
                {item.hasCoupon && (
                  <div className="mt-2 p-2 bg-amber-50/50 rounded-lg border border-amber-100 flex items-center justify-between text-[11px] text-amber-900">
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-bold">{item.couponName}</span>
                    </div>
                    {item.couponValue && (
                      <span className="font-mono font-black text-amber-800">
                        ¥{item.couponValue} 优惠
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Claim Confirmation Modal */}
      <AnimatePresence>
        {claimModalPrize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl border border-neutral-200 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#243727] flex items-center justify-center text-2xl shadow-inner">
                🎁
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-neutral-900 font-serif">
                  确认领取该奖品？
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  【{claimModalPrize.prizeName}】
                </p>
                <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-xl mt-2 font-medium">
                  确认后将自动为您生成专属0元订单与即时核销提货码。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full pt-2">
                <button
                  type="button"
                  onClick={() => setClaimModalPrize(null)}
                  className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-full transition-all cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClaim}
                  className="py-2.5 px-4 bg-[#243727] hover:bg-[#1a281c] text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
                >
                  确认领取
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
