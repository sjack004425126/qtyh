import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Gift,
  HelpCircle,
  History,
  Coins,
  ChevronRight,
  Trophy,
  X,
  Check,
  AlertCircle,
  Copy,
  Code2,
  FileCode,
  CheckCircle2,
} from 'lucide-react';

export interface LotteryPageProps {
  onShowToast?: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

const PRIZES = [
  { id: 1, name: '特级金丝皇菊礼盒', color: '#243727', textColor: '#FFFFFF', isWin: true },
  { id: 2, name: '谢谢参与', color: '#F5EFE6', textColor: '#243727', isWin: false },
  { id: 3, name: '100元团购代金券', color: '#3A523E', textColor: '#FFFFFF', isWin: true },
  { id: 4, name: '50积分补给包', color: '#EBE8DF', textColor: '#243727', isWin: true },
  { id: 5, name: '再接再厉', color: '#243727', textColor: '#FFFFFF', isWin: false },
  { id: 6, name: '黔藤定制品茗杯', color: '#F5EFE6', textColor: '#243727', isWin: true },
  { id: 7, name: '10元品茶优惠券', color: '#3A523E', textColor: '#FFFFFF', isWin: true },
  { id: 8, name: '幸运好运包', color: '#EBE8DF', textColor: '#243727', isWin: false },
];

export const LotteryPage: React.FC<LotteryPageProps> = ({ onShowToast }) => {
  const showToast = (msg: string, type: 'info' | 'success' | 'warning' = 'info') => {
    if (onShowToast) onShowToast(msg, type);
  };

  // Lottery state
  const [points, setPoints] = useState(1580);
  const [pointsDiff, setPointsDiff] = useState<number | null>(null);
  const [drawState, setDrawState] = useState<'idle' | 'charging' | 'spinning'>('idle');
  const [rotation, setRotation] = useState(0);
  const [consecutive, setConsecutive] = useState(2);
  const [dayRemaining, setDayRemaining] = useState(5);
  const [totalRemaining, setTotalRemaining] = useState(99);

  // Result Modal
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<{ isWin: boolean; title: string; prizeName: string; desc: string }>({
    isWin: false,
    title: '',
    prizeName: '',
    desc: '',
  });

  // Modals
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'wxml' | 'wxss' | 'js' | 'json'>('wxml');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const costPoints = 10;
  const guaranteeN = 3; // 3 times guarantee

  const handleStartDraw = () => {
    if (drawState !== 'idle') return;

    if (dayRemaining <= 0) {
      showToast('今日抽奖次数已用完', 'warning');
      return;
    }

    if (points < costPoints) {
      showToast(`积分不足，每次需 ${costPoints} 积分`, 'warning');
      return;
    }

    // Step 1: Charging (Points deduction animation)
    setDrawState('charging');
    setPointsDiff(-costPoints);

    setTimeout(() => {
      setPoints((prev) => prev - costPoints);

      setTimeout(() => {
        setPointsDiff(null);
      }, 1200);

      // Step 2: Spinning
      setDrawState('spinning');

      // Determine winning index (mock logic: 70% chance to hit a prize)
      const targetIndex = Math.floor(Math.random() * PRIZES.length);
      const prize = PRIZES[targetIndex];

      const segmentAngle = 360 / PRIZES.length;
      const centerAngle = targetIndex * segmentAngle + segmentAngle / 2;
      const targetFinalAngle = (360 - centerAngle) % 360;

      // Spin 5-7 full turns
      const fullRotations = 360 * 6;
      const nextRotation = rotation + fullRotations + targetFinalAngle - (rotation % 360);

      setRotation(nextRotation);

      setTimeout(() => {
        setDrawState('idle');
        setDayRemaining((prev) => Math.max(0, prev - 1));

        if (prize.isWin) {
          setConsecutive(0);
          setResultData({
            isWin: true,
            title: '🎉 恭喜中奖！',
            prizeName: prize.name,
            desc: `已存入您的个人券包/卡券，可在个人中心查看。`,
          });
        } else {
          setConsecutive((prev) => prev + 1);
          setResultData({
            isWin: false,
            title: '😢 遗憾未中奖',
            prizeName: '',
            desc: `别灰心，差一点点就抽中了！还差 ${guaranteeN - ((consecutive + 1) % guaranteeN)} 次触发必中保底。`,
          });
        }
        setShowResultModal(true);
      }, 4800);
    }, 600);
  };

  const handleCopyCode = (code: string, tabName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tabName);
    showToast(`已复制 ${tabName.toUpperCase()} 代码`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F9FAFB] text-neutral-800 font-sans overflow-hidden">
      {/* Top Header Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            幸运抽奖
          </span>
          <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-white" />
            <span>幸运大转盘</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowCodeView(!showCodeView)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
              showCodeView
                ? 'bg-black text-white border-black'
                : 'bg-neutral-50 text-neutral-900 border-neutral-300 hover:bg-neutral-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showCodeView ? '返回预览' : '查看代码'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 pb-24 scrollbar-none">
        {showCodeView ? (
          /* Mini-Program Source Code Viewer Mode */
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  MINI PROGRAM SOURCE
                </div>
                <div className="text-sm font-bold text-neutral-900 font-serif">
                  小程序优化源码
                </div>
              </div>

              <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-semibold">
                {(['wxml', 'wxss', 'js', 'json'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-2.5 py-1 rounded-md uppercase transition-all ${
                      activeCodeTab === tab
                        ? 'bg-black text-white shadow-2xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    .{tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative bg-neutral-950 rounded-xl p-3 text-neutral-100 font-mono text-[11px] overflow-x-auto max-h-[460px] leading-relaxed border border-neutral-800">
              <button
                type="button"
                onClick={() => handleCopyCode(MINI_PROGRAM_CODE[activeCodeTab], activeCodeTab)}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-sans flex items-center gap-1 transition-colors border border-white/10"
              >
                {copiedTab === activeCodeTab ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>复制代码</span>
                  </>
                )}
              </button>
              <pre className="whitespace-pre-wrap font-mono pt-4">
                {MINI_PROGRAM_CODE[activeCodeTab]}
              </pre>
            </div>
          </div>
        ) : (
          /* Live UI Preview Mode */
          <>
            {/* Top User Points Banner (Pure Black & White Minimalist Card) */}
            <div className="bg-black text-white rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden flex items-center justify-between border border-neutral-800">
              {/* Subtle ambient light blur */}
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium tracking-wide">
                  <Coins className="w-3.5 h-3.5 text-white" />
                  <span>我的可用积分</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono tracking-tight text-white">
                    {points.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-400">分</span>

                  {/* Deduct floating tag */}
                  <AnimatePresence>
                    {pointsDiff !== null && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-xs font-black text-black font-mono bg-white px-2 py-0.5 rounded-full shadow-xs"
                      >
                        {pointsDiff}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="text-[11px] text-neutral-400">
                  每次抽奖消耗 <span className="font-bold text-white font-mono">{costPoints}</span> 积分
                </div>
              </div>

              {/* Action Pills: Rules & My Prizes */}
              <div className="relative z-10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowRuleModal(true)}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-medium border border-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-neutral-300" />
                  <span>活动规则</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(true)}
                  className="px-3 py-1.5 bg-white text-black hover:bg-neutral-100 rounded-full text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Trophy className="w-3.5 h-3.5 text-black" />
                  <span>中奖记录</span>
                </button>
              </div>
            </div>

            {/* Lucky Wheel Card (Main Feature) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-neutral-200/80 flex flex-col items-center justify-center space-y-4">
              {/* Wheel Container */}
              <div className="relative w-[280px] h-[280px] sm:w-[310px] sm:h-[310px] flex items-center justify-center">
                {/* Outer Ring Decoration */}
                <div className="absolute inset-0 rounded-full border-4 border-neutral-900 shadow-inner bg-neutral-100" />

                {/* Rotating Wheel Disc */}
                <div
                  className="w-[264px] h-[264px] sm:w-[290px] sm:h-[290px] rounded-full relative overflow-hidden shadow-md"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: drawState === 'spinning' ? 'transform 4.8s cubic-bezier(0.15, 0.85, 0.25, 1)' : 'none',
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {PRIZES.map((prize, idx) => {
                      const total = PRIZES.length;
                      const angle = 360 / total;
                      const startAngle = idx * angle;
                      const endAngle = (idx + 1) * angle;

                      const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                      const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                      const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                      const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                      return (
                        <path
                          key={prize.id}
                          d={pathData}
                          fill={prize.color}
                          stroke="#E5E7EB"
                          strokeWidth="0.5"
                        />
                      );
                    })}
                  </svg>

                  {/* Prize Label Overlays */}
                  {PRIZES.map((prize, idx) => {
                    const total = PRIZES.length;
                    const angle = (360 / total) * idx + 360 / total / 2;
                    return (
                      <div
                        key={prize.id}
                        className="absolute top-0 left-1/2 w-20 -ml-10 h-1/2 origin-bottom flex flex-col items-center pt-3.5 text-center pointer-events-none select-none"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        <span
                          className="text-[10px] font-bold leading-tight px-1"
                          style={{ color: prize.textColor }}
                        >
                          {prize.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Top Pointer Arrow */}
                <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none filter drop-shadow-md">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-[#243727]" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto -mt-5" />
                </div>

                {/* Center GO Hub Button */}
                <button
                  type="button"
                  onClick={handleStartDraw}
                  disabled={drawState !== 'idle'}
                  className={`absolute z-20 w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-xl ${
                    drawState === 'charging'
                      ? 'bg-[#1a281c] text-white scale-95 ring-4 ring-[#243727]/30 animate-pulse'
                      : drawState === 'spinning'
                      ? 'bg-[#1a281c] text-stone-300 scale-95 ring-4 ring-[#243727]/30'
                      : 'bg-[#243727] hover:bg-[#1a281c] text-white hover:scale-105 active:scale-95 ring-4 ring-white shadow-[#243727]/30'
                  }`}
                >
                  <span className="text-xl font-black font-serif tracking-widest text-white">
                    {drawState === 'charging' ? '扣分中' : drawState === 'spinning' ? '抽奖中' : 'GO'}
                  </span>
                  <span className="text-[9px] text-neutral-300 tracking-tight">
                    {drawState === 'idle' ? `消耗${costPoints}分` : '...'}
                  </span>
                </button>
              </div>

              {/* Guarantee Progress Pill */}
              <div className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl p-2.5 text-center text-xs space-y-0.5">
                <div className="text-neutral-700 font-medium">
                  已连续未中奖 <span className="font-black text-black font-mono text-sm">{consecutive}</span> 次
                  {consecutive >= guaranteeN - 1 ? (
                    <span className="text-white font-bold ml-1.5 bg-black px-2 py-0.5 rounded-full">
                      🔥 下一次必定触发保底大奖！
                    </span>
                  ) : (
                    <span className="text-neutral-500 ml-1">
                      · 再抽 <span className="font-bold text-black font-mono">{guaranteeN - (consecutive % guaranteeN)}</span> 次必打保底
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quota & Stats Card */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                    QUOTA · 抽奖配额
                  </div>
                  <div className="text-sm font-bold text-neutral-900 font-serif">
                    活动限制与额度
                  </div>
                </div>
                <span className="text-[10px] font-bold text-neutral-900 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded">
                  正常参与中
                </span>
              </div>

              <div className="grid grid-cols-2 divide-x divide-neutral-100 py-1 text-center bg-neutral-50/80 rounded-xl border border-neutral-100">
                <div className="p-2 space-y-0.5">
                  <div className="text-lg font-black text-neutral-900 font-mono">
                    {dayRemaining} <span className="text-xs font-normal text-neutral-500">次</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">今日剩余次数</div>
                </div>

                <div className="p-2 space-y-0.5">
                  <div className="text-lg font-black text-black font-mono">
                    {totalRemaining} <span className="text-xs font-normal text-neutral-500">次</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">活动总剩余</div>
                </div>
              </div>
            </div>

            {/* Activity Secondary Links */}
            <div className="bg-white rounded-2xl p-3.5 shadow-2xs border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-black" />
                <span className="font-bold text-neutral-800">抽奖获得的所有奖品自动发放至卡券包</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(true)}
                className="text-black font-bold flex items-center hover:underline cursor-pointer"
              >
                <span>我的奖品</span>
                <ChevronRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {showResultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResultModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl p-6 z-10 text-center space-y-4 border border-neutral-100"
            >
              <div
                className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white ${
                  resultData.isWin ? 'bg-black' : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {resultData.isWin ? <Trophy className="w-6 h-6 text-white" /> : <Gift className="w-6 h-6" />}
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-neutral-900 font-serif">{resultData.title}</div>
                {resultData.prizeName && (
                  <div className="text-sm font-bold text-black bg-neutral-100 border border-neutral-200 py-1.5 px-3 rounded-lg my-2">
                    {resultData.prizeName}
                  </div>
                )}
                <div className="text-xs text-neutral-500 leading-relaxed pt-1">{resultData.desc}</div>
              </div>

              <button
                type="button"
                onClick={() => setShowResultModal(false)}
                className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRuleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRuleModal(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 z-10 space-y-3.5 border border-neutral-100"
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="text-sm font-bold text-neutral-900 font-serif">活动规则说明</div>
                <button
                  type="button"
                  onClick={() => setShowRuleModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-neutral-600 space-y-2 leading-relaxed max-h-[280px] overflow-y-auto">
                <p>1. 每次抽奖消耗 10 积分，扣分即时生效。</p>
                <p>2. 每位用户每日上限限制 5 次，总配额 99 次。</p>
                <p>3. 保底机制：连续未中奖 3 次，第 4 次必定中奖（实物奖品或代金券）。</p>
                <p>4. 获得的团购券和优惠券可在【个人中心-团购/优惠券】中查验核销。</p>
              </div>

              <button
                type="button"
                onClick={() => setShowRuleModal(false)}
                className="w-full py-2.5 bg-black text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                理解并返回
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistoryModal(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 z-10 space-y-3.5 border border-neutral-100"
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="text-sm font-bold text-neutral-900 font-serif">中奖历史记录</div>
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto text-xs">
                <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between border border-neutral-100">
                  <div>
                    <div className="font-bold text-neutral-900">100元团购代金券</div>
                    <div className="text-[10px] text-neutral-400">2026-07-24 14:32 · 已发放</div>
                  </div>
                  <span className="text-[10px] font-bold text-black bg-neutral-200/80 px-2 py-0.5 rounded">
                    代金券
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl flex items-center justify-between border border-neutral-100">
                  <div>
                    <div className="font-bold text-neutral-900">50积分补给包</div>
                    <div className="text-[10px] text-neutral-400">2026-07-22 18:10 · 已入账</div>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-900 bg-neutral-200/80 px-2 py-0.5 rounded">
                    积分
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="w-full py-2.5 bg-black text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                关闭
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Cleaned & Beautified WeChat Mini-Program Source Code
const MINI_PROGRAM_CODE = {
  wxml: `<!-- 顶部消息提示 -->
<top-message id="top-message"></top-message>

<view class="container">

  <!-- ========== 顶部标题区（与个人中心风格统一） ========== -->
  <view class="header">
    <text class="header-eyebrow">LUCKY DRAW · 幸运抽奖</text>
    <text class="header-title">{{event.name || '幸运抽奖'}}</text>
    <view class="header-pills" wx:if="{{event}}">
      <view class="header-pill" bindtap="onRuleTap">活动规则</view>
      <view class="header-pill header-pill--accent" bindtap="onMyPrizesTap">中奖记录</view>
    </view>
  </view>

  <!-- ========== 积分状态卡片（参考个人中心#243727深绿调） ========== -->
  <view class="points-card" wx:if="{{event}}" bindtap="onShowPointsDetail">
    <view class="points-card-body">
      <view class="points-card-label">我的可用积分</view>
      <view class="points-card-row">
        <text class="points-card-num {{pointsClass}}">{{myPointsDisplay}}</text>
        <text class="points-card-unit">分</text>
        <text class="points-card-diff {{pointsDiffClass}}" wx:if="{{pointsDiff != null && pointsDiff !== 0}}">{{pointsDiff > 0 ? '+' : ''}}{{pointsDiff}}</text>
      </view>
      <view class="points-card-sub">每次抽奖消耗 {{costPoints}} 积分</view>
    </view>
    <view class="points-card-tip" wx:if="{{drawState === 'charging'}}">扣减中…</view>
    <view class="points-card-tip points-card-tip--ok" wx:elif="{{drawState === 'spinning'}}">已扣除 · 抽奖中</view>
  </view>

  <!-- ========== 转盘卡片（美化转盘与指针） ========== -->
  <view class="wheel-card">
    <view class="wheel-wrap">
      <view class="wheel" style="{{wheelStyle}}">
        <view class="label-layer">
          <block wx:for="{{labels}}" wx:key="angle">
            <view class="prize-label" style="transform: {{item.transform}};">
              <view class="prize-name">{{item.name}}</view>
            </view>
          </block>
        </view>
      </view>
      <!-- 指针（顶部 · 深绿三角与金珠） -->
      <view class="pointer"></view>
      <!-- 中央 GO 按钮（去除了下方重复的抽奖按钮） -->
      <view class="hub {{drawStateClass}}" catchtap="onDraw">
        <view class="hub-icon" wx:if="{{drawState === 'spinning' || drawState === 'charging'}}"></view>
        <view class="hub-label">{{hubLabel}}</view>
        <view class="hub-sub">{{hubSub}}</view>
      </view>
    </view>

    <!-- 保底提示 -->
    <view class="guarantee-pill" wx:if="{{guaranteeN > 0}}">
      连续未中奖 <text class="acc">{{consecutive}}</text> 次 · 再抽 <text class="acc">{{guaranteeN - (consecutive % guaranteeN)}}</text> 次触发必中保底
    </view>
  </view>

  <!-- ========== 配额卡片（删除了重复的"我的积分"与"消耗积分"） ========== -->
  <view class="quota-card" wx:if="{{event}}">
    <view class="quota-row">
      <view class="cell">
        <view class="cell-num">{{dayRemaining}}</view>
        <view class="cell-lab">今日剩余次数</view>
      </view>
      <view class="cell-sep"></view>
      <view class="cell">
        <view class="cell-num">{{totalRemaining}}</view>
        <view class="cell-lab">活动累计剩余</view>
      </view>
    </view>
  </view>

</view>

<!-- ========== 结果弹层 ========== -->
<view class="modal-mask {{showResult ? 'show' : ''}}" bindtap="closeResult">
  <view class="modal" catchtap="">
    <view class="modal-eyebrow" wx:if="{{result.isWin}}">CONGRATULATIONS</view>
    <view class="modal-title">{{result.title}}</view>
    <view class="modal-coupon" wx:if="{{result.isWin}}">{{result.couponText}}</view>
    <view class="modal-desc">{{result.desc}}</view>
    <view class="modal-btn" bindtap="closeResult">我知道了</view>
  </view>
</view>`,

  wxss: `/* ===================================================
   幸运抽奖 · 黔藤壹号 个人中心同款视觉
   =================================================== */

page {
  background: #F9FAFB;
  color: #262626;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  padding-bottom: 40rpx;
}

/* 顶部标题区 */
.header {
  padding: 32rpx 32rpx 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-eyebrow {
  font-size: 20rpx;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #8C8C8C;
  text-transform: uppercase;
}

.header-title {
  font-size: 38rpx;
  font-weight: 700;
  color: #171717;
}

.header-pills {
  display: flex;
  gap: 12rpx;
}

.header-pill {
  font-size: 22rpx;
  color: #595959;
  padding: 8rpx 20rpx;
  background: #FFFFFF;
  border: 1rpx solid #E5E7EB;
  border-radius: 100rpx;
}

.header-pill--accent {
  color: #243727;
  background: rgba(36, 55, 39, 0.08);
  border-color: rgba(36, 55, 39, 0.2);
  font-weight: 600;
}

/* 我的积分卡片（个人中心深绿同款） */
.points-card {
  margin: 16rpx 32rpx 0;
  padding: 32rpx;
  background: #243727;
  color: #FFFFFF;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(36, 55, 39, 0.15);
  position: relative;
}

.points-card-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}

.points-card-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-top: 8rpx;
}

.points-card-num {
  font-size: 52rpx;
  font-weight: 800;
  color: #FFFFFF;
  font-family: monospace;
}

.points-card-unit {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.points-card-sub {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8rpx;
}

/* 转盘卡片 */
.wheel-card {
  margin: 24rpx 32rpx 0;
  background: #FFFFFF;
  border: 1rpx solid rgba(0,0,0,0.06);
  border-radius: 28rpx;
  padding: 40rpx 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wheel-wrap {
  position: relative;
  width: 560rpx;
  height: 560rpx;
}

.wheel {
  width: 560rpx;
  height: 560rpx;
  border-radius: 50%;
  position: relative;
  border: 8rpx solid #EBE8DF;
}

/* 指针与中央GO按钮 */
.pointer {
  position: absolute;
  left: 50%;
  top: -12rpx;
  width: 0;
  height: 0;
  margin-left: -20rpx;
  border-left: 20rpx solid transparent;
  border-right: 20rpx solid transparent;
  border-top: 40rpx solid #243727;
  z-index: 10;
}

.hub {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 160rpx;
  height: 160rpx;
  margin-left: -80rpx;
  margin-top: -80rpx;
  border-radius: 50%;
  background: #243727;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 0 0 8rpx #FFFFFF, 0 12rpx 24rpx rgba(0,0,0,0.15);
}

.hub-label {
  font-size: 40rpx;
  font-weight: 900;
  color: #FFFFFF;
}

.hub-sub {
  font-size: 20rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 4rpx;
}

.guarantee-pill {
  margin-top: 24rpx;
  font-size: 22rpx;
  color: #595959;
  background: #F5F5F4;
  padding: 12rpx 28rpx;
  border-radius: 100rpx;
}

.guarantee-pill .acc {
  color: #243727;
  font-weight: 700;
}

/* 配额卡片（已删除重复元素） */
.quota-card {
  margin: 20rpx 32rpx 0;
  background: #FFFFFF;
  border: 1rpx solid rgba(0,0,0,0.06);
  border-radius: 24rpx;
  padding: 28rpx;
}

.quota-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.cell {
  text-align: center;
  flex: 1;
}

.cell-num {
  font-size: 36rpx;
  font-weight: 800;
  color: #171717;
  font-family: monospace;
}

.cell-lab {
  font-size: 22rpx;
  color: #8C8C8C;
  margin-top: 4rpx;
}

.cell-sep {
  width: 1rpx;
  height: 40rpx;
  background: #E5E7EB;
}`,

  js: `// 幸运大转盘 - 优化版逻辑
const { createPage } = require('../../utils/page-mixin');
const { tokenGet, tokenPost } = require('../../utils/request');

const PALETTE = ['#243727', '#F5EFE6', '#3A523E', '#EBE8DF'];

createPage({
  data: {
    event: null,
    prizes: [],
    myPoints: 1580,
    myPointsDisplay: 1580,
    costPoints: 10,
    dayRemaining: 5,
    totalRemaining: 99,
    consecutive: 2,
    guaranteeN: 3,
    drawState: 'idle',
    hubLabel: 'GO',
    hubSub: '抽 1 次'
  },

  onLoad() {
    this.init();
  },

  async init() {
    // 加载活动及额度数据...
  }
});`,

  json: `{
  "navigationBarTitleText": "幸运抽奖",
  "navigationBarBackgroundColor": "#FFFFFF",
  "navigationBarTextStyle": "black",
  "backgroundColor": "#F9FAFB",
  "enablePullDownRefresh": true
}`
};
