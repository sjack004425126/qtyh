import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Award,
  TrendingUp,
  ShoppingBag,
  Code2,
  Copy,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  UserCheck,
  Star,
  Zap,
  BarChart3,
  Calendar,
  X,
  Send,
  PackageCheck
} from 'lucide-react';

interface TalentShowcasePageProps {
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export interface TalentItem {
  id: string;
  userId: number;
  rank: number;
  nickname: string;
  avatar: string;
  joinDuration: string;
  rankLabel: string;
  levelName: string;
  levelIcon: string;
  totalSalesAmount: string;
  totalSalesAmountNum: number;
  totalSalesCount: string;
  totalSalesCountNum: number;
  avgOrderValue: string;
  chartData: { month: number; amount: number; height: number }[];
  featuredProducts: {
    id: string;
    title: string;
    price: string;
    commissionRate: string;
    salesCount: string;
    imageUrl: string;
  }[];
}

const TALENT_LIST: TalentItem[] = [
  {
    id: 't-001',
    userId: 1001,
    rank: 1,
    nickname: '黔山茶妹 · 雅致播主',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinDuration: '入驻 2 年 4 个月',
    rankLabel: 'TOP 1 黔茶金牌带货官',
    levelName: 'VIP6 皇冠带货巨星',
    levelIcon: '👑',
    totalSalesAmount: '128.5万',
    totalSalesAmountNum: 1285000,
    totalSalesCount: '4.8万',
    totalSalesCountNum: 48000,
    avgOrderValue: '268',
    chartData: [
      { month: 1, amount: 6.2, height: 45 },
      { month: 2, amount: 5.8, height: 40 },
      { month: 3, amount: 8.5, height: 60 },
      { month: 4, amount: 9.1, height: 65 },
      { month: 5, amount: 11.2, height: 78 },
      { month: 6, amount: 10.5, height: 72 },
      { month: 7, amount: 12.8, height: 88 },
      { month: 8, amount: 15.4, height: 100 },
      { month: 9, amount: 13.6, height: 90 },
      { month: 10, amount: 11.8, height: 82 },
      { month: 11, amount: 14.2, height: 95 },
      { month: 12, amount: 9.4, height: 68 }
    ],
    featuredProducts: [
      {
        id: 'p-101',
        title: '古树黔藤黑茶压制特级茶饼 357g',
        price: '198.00',
        commissionRate: '30%',
        salesCount: '1.8万包',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'p-102',
        title: '特级金丝皇菊高山礼盒装 50g',
        price: '88.00',
        commissionRate: '25%',
        salesCount: '2.1万盒',
        imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 't-002',
    userId: 1002,
    rank: 2,
    nickname: '阿老表品茶录',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    joinDuration: '入驻 1 年 8 个月',
    rankLabel: 'TOP 2 养生藤茶首席推介官',
    levelName: 'VIP5 钻石带货达人',
    levelIcon: '💎',
    totalSalesAmount: '96.2万',
    totalSalesAmountNum: 962000,
    totalSalesCount: '3.2万',
    totalSalesCountNum: 32000,
    avgOrderValue: '300',
    chartData: [
      { month: 1, amount: 4.2, height: 38 },
      { month: 2, amount: 5.1, height: 46 },
      { month: 3, amount: 6.8, height: 61 },
      { month: 4, amount: 7.5, height: 68 },
      { month: 5, amount: 8.9, height: 80 },
      { month: 6, amount: 9.4, height: 85 },
      { month: 7, amount: 10.2, height: 92 },
      { month: 8, amount: 11.1, height: 100 },
      { month: 9, amount: 9.8, height: 88 },
      { month: 10, amount: 8.5, height: 76 },
      { month: 11, amount: 9.2, height: 82 },
      { month: 12, amount: 5.5, height: 50 }
    ],
    featuredProducts: [
      {
        id: 'p-201',
        title: '苗岭天然野生藤茶袋泡装 30包',
        price: '68.00',
        commissionRate: '28%',
        salesCount: '1.5万盒',
        imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'p-202',
        title: '老茶窖藏醇化黑茶小方砖 250g',
        price: '158.00',
        commissionRate: '32%',
        salesCount: '9,800块',
        imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc531a6891e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 't-003',
    userId: 1003,
    rank: 3,
    nickname: '黔东南印象茶社',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    joinDuration: '入驻 1 年 2 个月',
    rankLabel: 'TOP 3 苗岭老茶藏藏品鉴家',
    levelName: 'VIP4 白金带货精英',
    levelIcon: '🌟',
    totalSalesAmount: '72.8万',
    totalSalesAmountNum: 728000,
    totalSalesCount: '2.5万',
    totalSalesCountNum: 25000,
    avgOrderValue: '291',
    chartData: [
      { month: 1, amount: 3.5, height: 35 },
      { month: 2, amount: 4.1, height: 41 },
      { month: 3, amount: 5.2, height: 52 },
      { month: 4, amount: 5.8, height: 58 },
      { month: 5, amount: 7.1, height: 71 },
      { month: 6, amount: 8.2, height: 82 },
      { month: 7, amount: 9.0, height: 90 },
      { month: 8, amount: 10.0, height: 100 },
      { month: 9, amount: 8.1, height: 81 },
      { month: 10, amount: 7.2, height: 72 },
      { month: 11, amount: 8.0, height: 80 },
      { month: 12, amount: 6.6, height: 66 }
    ],
    featuredProducts: [
      {
        id: 'p-301',
        title: '黔藤贡茶青花瓷盖碗泡茶套装',
        price: '268.00',
        commissionRate: '20%',
        salesCount: '6,400套',
        imageUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 't-004',
    userId: 1004,
    rank: 4,
    nickname: '云雾山茶人小李',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    joinDuration: '入驻 10 个月',
    rankLabel: 'TOP 4 优质短视频创作者',
    levelName: 'VIP3 黄金带货达人',
    levelIcon: '🥇',
    totalSalesAmount: '45.3万',
    totalSalesAmountNum: 453000,
    totalSalesCount: '1.6万',
    totalSalesCountNum: 16000,
    avgOrderValue: '283',
    chartData: [
      { month: 1, amount: 2.1, height: 30 },
      { month: 2, amount: 2.8, height: 40 },
      { month: 3, amount: 3.5, height: 50 },
      { month: 4, amount: 4.2, height: 60 },
      { month: 5, amount: 5.1, height: 72 },
      { month: 6, amount: 6.0, height: 85 },
      { month: 7, amount: 7.0, height: 100 },
      { month: 8, amount: 6.5, height: 92 },
      { month: 9, amount: 5.2, height: 74 },
      { month: 10, amount: 4.8, height: 68 },
      { month: 11, amount: 5.0, height: 71 },
      { month: 12, amount: 3.1, height: 44 }
    ],
    featuredProducts: [
      {
        id: 'p-401',
        title: '高山早春绿茶手采新茶 100g',
        price: '128.00',
        commissionRate: '22%',
        salesCount: '8,200罐',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

// Complete Redesigned WeChat Mini Program Source Code
const MINI_PROGRAM_CODE = {
  wxml: `<top-message id="top-message"></top-message>

<view class="container">
  <!-- 1. 顶部固定区域：排名指示器与页码 -->
  <view class="header-fixed">
    <view class="rank-indicator">
      <view 
        class="rank-dot {{index === currentSwiperIndex ? 'rank-dot-active' : ''}}"
        wx:for="{{talentList}}"
        wx:key="user_id"
        bindtap="onRankDotTap"
        data-index="{{index}}"
      ></view>
    </view>
    <view class="rank-text-box">
      <text class="rank-text">{{currentSwiperIndex + 1}}/{{talentList.length}}</text>
    </view>
  </view>

  <!-- 2. Swiper 达人卡片滑动区域 -->
  <swiper 
    class="talent-swiper"
    current="{{currentSwiperIndex}}"
    bindchange="onSwiperChange"
    duration="300"
    easing-function="easeOutCubic"
  >
    <swiper-item wx:for="{{talentList}}" wx:key="user_id">
      <scroll-view scroll-y class="talent-scroll" enhanced show-scrollbar="{{false}}">
        <view class="header-bg"></view>

        <!-- 主要内容区域 -->
        <view class="main-content">
          <!-- 用户信息卡片 -->
          <view class="user-card">
            <view class="user-card-content">
              <!-- 头像与皇冠角标 -->
              <view class="avatar-wrapper">
                <image class="user-avatar" src="{{item.avatar}}" mode="aspectFill" />
                <view class="avatar-badge">
                  <text class="avatar-badge-icon">👑</text>
                </view>
              </view>
              
              <!-- 昵称与排名 -->
              <text class="user-nickname">{{item.nickname}}</text>
              <view class="user-meta">
                <text class="meta-text">{{item.join_duration}}</text>
                <text class="meta-divider" wx:if="{{item.talent_rank_label}}">|</text>
                <text class="meta-text meta-rank" wx:if="{{item.talent_rank_label}}">{{item.talent_rank_label}}</text>
              </view>
              
              <!-- 会员等级标签 -->
              <view class="level-tag" wx:if="{{item.level}}">
                <text class="level-icon">👑</text>
                <text class="level-text">{{item.level.name}}</text>
              </view>
            </view>
          </view>

          <!-- 数据统计卡片 -->
          <view class="stats-card">
            <view class="stats-row">
              <!-- 年度带货金额 -->
              <view class="stat-item">
                <text class="stat-value">{{item.total_sales_amount_display}}<text class="stat-unit">元</text></text>
                <text class="stat-label">年度带货金额</text>
              </view>
              
              <view class="stat-divider"></view>
              
              <!-- 年度带货销量 -->
              <view class="stat-item">
                <text class="stat-value">{{item.total_sales_count_display}}<text class="stat-unit">单</text></text>
                <text class="stat-label">年度带货销量</text>
              </view>
            </view>
            
            <!-- 12个月销售趋势柱状图 -->
            <view class="chart-section">
              <view class="chart-header">
                <text class="chart-title">12个月带货销售趋势</text>
                <text class="chart-sub">单位: 万元</text>
              </view>
              <view class="chart-container">
                <view class="chart-bars">
                  <view class="chart-bar-item" wx:for="{{item.chartData}}" wx:for-item="chart" wx:key="month">
                    <view class="bar-wrapper">
                      <view class="bar" style="height: {{chart.height}}%;"></view>
                    </view>
                    <text class="bar-label">{{chart.month}}月</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

        </view>
      </scroll-view>
    </swiper-item>
  </swiper>

  <!-- 3. 底部固定 Banner 区域 -->
  <view class="action-section-fixed" bindtap="onStartJourney">
    <view class="action-banner">
      <text class="action-banner-text">开启带货之旅 · 申请免费领样</text>
      <text class="action-banner-arrow">→</text>
    </view>
  </view>

  <floating-service></floating-service>
</view>`,

  wxss: `/* ===================================================
   talent.wxss (Stitch Qián Téng 雅致美学 · 达人带货)
   =================================================== */

page {
  height: 100vh;
  background: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

.container {
  height: 100vh;
  background: #F8F9FA;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 顶部固定指示器 */
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  z-index: 100;
  background: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(16rpx);
}

.rank-indicator {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.rank-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #D9D9D9;
  transition: all 0.3s ease;
}

.rank-dot-active {
  width: 36rpx;
  border-radius: 12rpx;
  background: #243727;
}

.rank-text-box {
  padding: 8rpx 24rpx;
  background: #F0F0F0;
  border-radius: 20rpx;
}

.rank-text {
  font-size: 24rpx;
  color: #243727;
  font-weight: 700;
  font-family: "DIN Alternate", monospace;
}

/* Swiper 区域 */
.talent-swiper {
  flex: 1;
  width: 100%;
  margin-top: 100rpx;
}

.talent-scroll {
  height: 100%;
}

.header-bg {
  height: 20rpx;
}

.main-content {
  padding: 0 32rpx 220rpx;
}

/* 用户信息卡片 */
.user-card {
  position: relative;
  background: #243727;
  border-radius: 32rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(36, 55, 39, 0.2);
}

.user-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48rpx 32rpx 40rpx;
  width: 100%;
  box-sizing: border-box;
}

.avatar-wrapper {
  position: relative;
  width: 150rpx;
  height: 150rpx;
}

.user-avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  border: 4rpx solid #FFFFFF;
}

.avatar-badge {
  position: absolute;
  right: -8rpx;
  bottom: -4rpx;
  width: 44rpx;
  height: 44rpx;
  background: #FFD700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.3);
}

.avatar-badge-icon {
  font-size: 24rpx;
}

.user-nickname {
  font-size: 36rpx;
  font-weight: 800;
  color: #FFFFFF;
  margin-top: 20rpx;
}

.user-meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 10rpx;
}

.meta-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.75);
}

.meta-rank {
  color: #FFD89B;
  font-weight: 700;
}

.meta-divider {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.4);
}

.level-tag {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 20rpx;
  padding: 8rpx 28rpx;
  background: rgba(255, 255, 255, 0.15);
  border: 1rpx solid rgba(255, 255, 255, 0.25);
  border-radius: 30rpx;
}

.level-text {
  font-size: 22rpx;
  font-weight: 700;
  color: #FFFFFF;
}

/* 数据统计卡片 */
.stats-card {
  background: #FFFFFF;
  border-radius: 28rpx;
  padding: 36rpx 28rpx;
  border: 1rpx solid #E5E5E5;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 28rpx;
  border-bottom: 1rpx solid #F0F0F0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-value {
  font-size: 48rpx;
  font-weight: 900;
  color: #243727;
  font-family: "DIN Alternate", monospace;
}

.stat-unit {
  font-size: 24rpx;
  font-weight: 600;
  color: #8C8C8C;
  margin-left: 4rpx;
}

.stat-label {
  font-size: 22rpx;
  color: #8C8C8C;
  margin-top: 6rpx;
}

.stat-divider {
  width: 1rpx;
  height: 60rpx;
  background: #F0F0F0;
}

/* 柱状图区域 */
.chart-section {
  margin-top: 28rpx;
}

.chart-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.chart-title {
  font-size: 26rpx;
  font-weight: 800;
  color: #171717;
}

.chart-sub {
  font-size: 20rpx;
  color: #8C8C8C;
}

.chart-container {
  height: 180rpx;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
}

.chart-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
}

.bar-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 16rpx;
  background: #243727;
  border-radius: 8rpx 8rpx 0 0;
  min-height: 8rpx;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: 18rpx;
  color: #8C8C8C;
  margin-top: 8rpx;
}

/* 底部固定 CTA */
.action-section-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 32rpx calc(20rpx + env(safe-area-inset-bottom));
  z-index: 90;
  background: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(12rpx);
}

.action-banner {
  height: 88rpx;
  background: #243727;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  box-shadow: 0 8rpx 24rpx rgba(36, 55, 39, 0.25);
}

.action-banner-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.action-banner-arrow {
  font-size: 28rpx;
  color: #FFFFFF;
}`,

  js: `const { createPage } = require('../../utils/page-mixin');
const { get } = require('../../utils/request');

createPage({
  data: {
    currentSwiperIndex: 0,
    talentList: [],
    isLoading: false
  },

  onLoad() {
    this.loadAllTalents();
  },

  async loadAllTalents() {
    this.setData({ isLoading: true });
    try {
      const res = await get('/talent/recommend-list?page=1&page_size=6');
      const talents = res.list || [];
      this.setData({
        talentList: talents,
        isLoading: false
      });
    } catch (error) {
      this.setData({ isLoading: false });
    }
  },

  onSwiperChange(e) {
    this.setData({ currentSwiperIndex: e.detail.current });
  },

  onRankDotTap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentSwiperIndex: index });
  },

  onStartJourney() {
    wx.navigateTo({ url: '/pages/course/enroll' });
  }
});`,

  json: `{
  "navigationBarTitleText": "达人带货榜单",
  "navigationBarBackgroundColor": "#F8F9FA",
  "navigationBarTextStyle": "black",
  "usingComponents": {
    "top-message": "/components/top-message/top-message",
    "floating-service": "/components/floating-service/floating-service"
  }
}`
};

export const TalentShowcasePage: React.FC<TalentShowcasePageProps> = ({ onShowToast }) => {
  const [talents] = useState<TalentItem[]>(TALENT_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState<{ month: number; amount: number } | null>(null);

  // Modal State
  const [showCooperationModal, setShowCooperationModal] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [followerCount, setFollowerCount] = useState('1万-5万粉丝');

  // Code Inspection State
  const [showCodeView, setShowCodeView] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'wxml' | 'wxss' | 'js' | 'json'>('wxml');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const currentTalent = talents[currentIndex] || talents[0];

  const handleCopyCode = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    onShowToast(`已复制 ${tab.toUpperCase()} 源码`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : talents.length - 1));
    setSelectedMonth(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < talents.length - 1 ? prev + 1 : 0));
    setSelectedMonth(null);
  };

  const handleApplyCooperation = () => {
    if (!applicantName.trim()) {
      onShowToast('请输入申请人姓名或账号名', 'warning');
      return;
    }
    if (!applicantPhone.trim() || !/^1\d{10}$/.test(applicantPhone)) {
      onShowToast('请输入正确的11位手机号码', 'warning');
      return;
    }

    onShowToast('带货合作申请已提交，专员将在2小时内与您联系！', 'success');
    setShowCooperationModal(false);
    setApplicantName('');
    setApplicantPhone('');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FA] text-neutral-800 font-sans overflow-hidden select-none">
      {/* Top Bar Navigation */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-200/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            达人带货榜单
          </span>
          <span className="text-[10px] font-bold text-white bg-[#243727] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>雅致精美版</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowCodeView(!showCodeView)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
            showCodeView
              ? 'bg-[#243727] text-white border-[#243727]'
              : 'bg-neutral-50 text-neutral-900 border-neutral-300 hover:bg-neutral-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showCodeView ? '返回榜单' : '小程序源码'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showCodeView ? (
          /* Mini Program Code Viewer Mode */
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">
                  达人带货页面源码 (WeChat Mini Program)
                </div>
                <div className="text-[11px] text-neutral-500">
                  包含Swiper滑动卡片、排名指示器、12个月销量柱状图与申请带货入口
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
                        ? 'bg-[#243727] text-white shadow-2xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative bg-neutral-950 rounded-xl p-3 text-neutral-100 font-mono text-[11px] overflow-x-auto max-h-[480px] leading-relaxed border border-neutral-800">
              <button
                type="button"
                onClick={() => handleCopyCode(MINI_PROGRAM_CODE[activeCodeTab], activeCodeTab)}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-sans flex items-center gap-1 transition-colors border border-white/10"
              >
                {copiedTab === activeCodeTab ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>复制代码</span>
                  </>
                )}
              </button>

              <pre className="pt-6">{MINI_PROGRAM_CODE[activeCodeTab]}</pre>
            </div>
          </div>
        ) : (
          /* Interactive Live UI Showcase Mode */
          <>
            {/* 1. Header Rank Navigation & Indicator Dots */}
            <div className="bg-white rounded-2xl p-3 border border-neutral-200/80 shadow-2xs flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {talents.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSelectedMonth(null);
                    }}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-[#243727]'
                        : 'w-2.5 bg-neutral-200 hover:bg-neutral-300'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next & Counter */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="上一个达人"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-black font-mono text-[#243727] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full border border-[#E5D5C0]">
                  {currentIndex + 1} / {talents.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="下一个达人"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Main Talent Profile Hero Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTalent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5"
              >
                {/* Talent Banner Card */}
                <div className="relative bg-[#243727] text-white rounded-3xl p-5 shadow-lg overflow-hidden border border-[#243727]">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    {/* Avatar & Rank Crown Badge */}
                    <div className="relative">
                      <img
                        src={currentTalent.avatar}
                        alt={currentTalent.nickname}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white/90 shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 text-neutral-900 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-white">
                        <Crown className="w-4 h-4 fill-amber-900 text-amber-900" />
                      </div>
                    </div>

                    {/* Nickname & Titles */}
                    <div className="space-y-1">
                      <div className="text-lg font-black tracking-tight font-serif flex items-center justify-center gap-1.5">
                        <span>{currentTalent.nickname}</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-300">
                        <span>{currentTalent.joinDuration}</span>
                        <span>·</span>
                        <span className="text-amber-300 font-bold">
                          {currentTalent.rankLabel}
                        </span>
                      </div>
                    </div>

                    {/* Level Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/15 backdrop-blur-xs rounded-full border border-white/20 text-xs font-bold text-amber-200">
                      <span>{currentTalent.levelIcon}</span>
                      <span>{currentTalent.levelName}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Sales KPI Stats Card */}
                <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 divide-x divide-neutral-100 py-1">
                    {/* Annual Sales Amount */}
                    <div className="flex flex-col items-center text-center pr-2">
                      <div className="text-xs text-neutral-400 font-medium">年度带货金额</div>
                      <div className="text-2xl font-black font-mono text-[#243727] tracking-tight mt-0.5">
                        {currentTalent.totalSalesAmount}
                        <span className="text-xs font-normal text-neutral-500 ml-0.5">元</span>
                      </div>
                    </div>

                    {/* Annual Sales Orders */}
                    <div className="flex flex-col items-center text-center pl-2">
                      <div className="text-xs text-neutral-400 font-medium">年度带货销量</div>
                      <div className="text-2xl font-black font-mono text-[#243727] tracking-tight mt-0.5">
                        {currentTalent.totalSalesCount}
                        <span className="text-xs font-normal text-neutral-500 ml-0.5">单</span>
                      </div>
                    </div>
                  </div>

                  {/* 12-Month Sales Trend Bar Chart */}
                  <div className="pt-2 border-t border-neutral-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                        <BarChart3 className="w-4 h-4 text-[#243727]" />
                        <span>12个月带货销售趋势</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">单位: 万元</span>
                    </div>

                    {/* Bar Chart Graphics */}
                    <div className="h-32 pt-2 flex items-end justify-between gap-1">
                      {currentTalent.chartData.map((item) => {
                        const isSelected = selectedMonth?.month === item.month;

                        return (
                          <div
                            key={item.month}
                            onClick={() =>
                              setSelectedMonth(
                                isSelected ? null : { month: item.month, amount: item.amount }
                              )
                            }
                            className="flex-1 flex flex-col items-center group cursor-pointer h-full justify-end"
                          >
                            <div className="w-full flex-1 flex items-end justify-center relative">
                              {/* Hover / Selected Tooltip */}
                              {isSelected && (
                                <div className="absolute -top-7 z-20 px-1.5 py-0.5 bg-neutral-900 text-white text-[9px] font-mono font-bold rounded shadow-md whitespace-nowrap animate-fade-in">
                                  {item.amount}万
                                </div>
                              )}

                              <div
                                className={`w-3.5 rounded-t-md transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-amber-500 shadow-md scale-y-105'
                                    : 'bg-[#243727] group-hover:bg-emerald-700'
                                }`}
                                style={{ height: `${item.height}%` }}
                              />
                            </div>
                            <span
                              className={`text-[9px] font-mono mt-1 ${
                                isSelected
                                  ? 'text-[#243727] font-bold'
                                  : 'text-neutral-400 group-hover:text-neutral-700'
                              }`}
                            >
                              {item.month}月
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {selectedMonth && (
                      <div className="bg-[#F5EFE6] text-[#243727] p-2 rounded-xl text-center text-xs font-bold border border-[#E5D5C0]">
                        {selectedMonth.month}月带货销售额: {selectedMonth.amount} 万元
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Featured Products Showcase */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-[#243727]" />
                      <span>带货爆款选品 ({currentTalent.featuredProducts.length})</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">高佣金 · 爆款好货</span>
                  </div>

                  <div className="space-y-2">
                    {currentTalent.featuredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white rounded-2xl p-3 border border-neutral-200/80 shadow-2xs hover:border-[#243727]/30 transition-all flex items-center gap-3"
                      >
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-100"
                        />

                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="text-xs font-bold text-neutral-900 truncate">
                            {prod.title}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black font-mono text-[#243727]">
                              ¥{prod.price}
                            </span>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                              佣金率 {prod.commissionRate}
                            </span>
                          </div>

                          <div className="text-[10px] text-neutral-400">
                            销量: {prod.salesCount}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setApplicantName(currentTalent.nickname);
                            setShowCooperationModal(true);
                          }}
                          className="px-3 py-1.5 bg-[#243727] hover:bg-[#1a281c] text-white text-[11px] font-bold rounded-full shadow-2xs transition-all cursor-pointer shrink-0"
                        >
                          申请带货
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 5. Bottom Fixed CTA Banner */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowCooperationModal(true)}
                className="w-full py-3.5 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-full shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>开启带货之旅 · 申请免费领样</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Cooperation Application Modal */}
      <AnimatePresence>
        {showCooperationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowCooperationModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-4 border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto sm:hidden" />

              <div className="flex items-start justify-between pb-2 border-b border-neutral-100">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    TALENT COOPERATION
                  </div>
                  <div className="text-base font-bold text-neutral-900 font-serif">
                    申请带货合作 / 免费领样
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCooperationModal(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-900">
                    达人姓名 / 抖音/快手账号名 *
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="请输入达人姓名或账号名"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-900">联系电话 *</label>
                  <input
                    type="tel"
                    maxLength={11}
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="请输入11位手机号码"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727]"
                  />
                </div>

                {/* Followers range */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-900">粉丝量级 *</label>
                  <select
                    value={followerCount}
                    onChange={(e) => setFollowerCount(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727]"
                  >
                    <option value="1千-1万粉丝">1千 - 1万 粉丝</option>
                    <option value="1万-5万粉丝">1万 - 5万 粉丝</option>
                    <option value="5万-20万粉丝">5万 - 20万 粉丝</option>
                    <option value="20万+粉丝">20万+ 头部达人</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyCooperation}
                className="w-full py-3 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>立即提交合作申请</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
