import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Copy,
  Search,
  Sparkles,
  X,
  CreditCard,
  GraduationCap,
  PlayCircle,
  Award,
  Users,
  Check,
  Eye,
  ThumbsUp,
  Play,
  MoreVertical,
  Bell,
  SlidersHorizontal,
  Radio,
  Flame,
  Tv2
} from 'lucide-react';

interface CoursePageProps {
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

interface ChapterItem {
  id: string;
  indexLabel: string;
  chapterName: string;
  chapterDescription: string;
  categoryName: string;
  coverUrl: string;
  duration: string;
  views: string;
  likes: string;
  authorName: string;
  authorAvatar: string;
  isLive?: boolean;
  students: number;
  chapterType: 1 | 2; // 1: 基础课程, 2: 进阶课程
  isPaid: boolean;
  price: string;
  pointsPrice: number;
  isPointsExchange: boolean;
  isPurchased: boolean;
  tags: string[];
}

const INITIAL_CHAPTERS: ChapterItem[] = [
  {
    id: 'chap-101',
    indexLabel: '01',
    chapterName: '黔藤茶道概论',
    chapterDescription: '黔藤黑茶杀青与传统工艺深度解析：从鲜叶采摘至渥堆发酵核心要素',
    categoryName: '基础茶道',
    coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    duration: '12:45',
    views: '2.8万',
    likes: '3420',
    authorName: '黔茶小仙',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    students: 1280,
    chapterType: 1,
    isPaid: false,
    price: '0.00',
    pointsPrice: 0,
    isPointsExchange: false,
    isPurchased: true,
    tags: ['杀青工艺', '黑茶制作', '入门必备']
  },
  {
    id: 'chap-102',
    indexLabel: '02',
    chapterName: '冲泡手法进阶',
    chapterDescription: '盖碗抱壶与注水姿态标准规范：水温、注水线与浸泡时间的精准协同',
    categoryName: '基础茶道',
    coverUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    duration: '08:30',
    views: '4.5万',
    likes: '5120',
    authorName: '茶艺师林依',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    students: 850,
    chapterType: 1,
    isPaid: true,
    price: '29.00',
    pointsPrice: 290,
    isPointsExchange: true,
    isPurchased: true,
    tags: ['盖碗冲泡', '姿态标准', '高分实操']
  },
  {
    id: 'chap-103',
    indexLabel: '03',
    chapterName: '金丝皇菊评鉴',
    chapterDescription: '古树金丝皇菊品饮与生津感官训练：汤色评估、菊香分层与口感回甘',
    categoryName: '花草品鉴',
    coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    duration: '15:10',
    views: '1.9万',
    likes: '1890',
    authorName: '阿老表品茶',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    students: 620,
    chapterType: 1,
    isPaid: true,
    price: '49.00',
    pointsPrice: 490,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['感官评茶', '皇菊品鉴', '回甘分层']
  },
  {
    id: 'chap-104',
    indexLabel: '04',
    chapterName: '茶席美学设计',
    chapterDescription: '茶席置景美学与空间气韵营造：茶具搭配、花艺配饰与光影质感',
    categoryName: '茶艺美学',
    coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=600&q=80',
    duration: '21:05',
    views: '3.1万',
    likes: '2980',
    authorName: '云雾山茶人',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    students: 410,
    chapterType: 1,
    isPaid: true,
    price: '68.00',
    pointsPrice: 680,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['茶席置景', '空间气韵', '插花配图']
  },
  {
    id: 'chap-201',
    indexLabel: '05',
    chapterName: '风味轮辨识',
    chapterDescription: '高级评茶师风味轮与瑕疵辨识：酸败、仓味、焦糊味的成因与判定',
    categoryName: '进阶品鉴',
    coverUrl: 'https://images.unsplash.com/photo-1571934811356-5cc531a6891e?auto=format&fit=crop&w=600&q=80',
    duration: '18:22',
    views: '1.2万',
    likes: '1450',
    authorName: '黔山老茶人',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    students: 320,
    chapterType: 2,
    isPaid: true,
    price: '128.00',
    pointsPrice: 1280,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['风味轮', '瑕疵辨识', '盲品实测']
  },
  {
    id: 'chap-202',
    indexLabel: '06',
    chapterName: '老茶窖藏醇化',
    chapterDescription: '老茶窖藏醇化与环境温湿度调控：微生物菌群代谢对后期品质影响',
    categoryName: '进阶仓储',
    coverUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    duration: '25:40',
    views: '8,900',
    likes: '960',
    authorName: '茶仓工坊',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    students: 210,
    chapterType: 2,
    isPaid: true,
    price: '168.00',
    pointsPrice: 1680,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['老茶仓储', '陈化调控', '菌群分析']
  }
];

// Complete Redesigned WeChat Mini Program Source Code (2-Column Bilibili/Douyin Grid Layout)
const MINI_PROGRAM_CODE = {
  wxml: `<top-message id="top-message"></top-message>

<view class="page">
  <view class="container">

    <!-- 1. 顶部搜索栏与个人头像 -->
    <view class="header-search-bar">
      <image class="user-avatar" src="{{userInfo.avatar || '/static/icons/default_avatar.png'}}" mode="aspectFill" />
      <view class="search-input-box" bindtap="onSearchTap">
        <text class="search-icon">🔍</text>
        <text class="search-placeholder">搜索茶道课程、杀青工艺、茶席置景...</text>
      </view>
      <view class="bell-box">
        <text class="bell-icon">🔔</text>
        <view class="bell-dot"></view>
      </view>
    </view>

    <!-- 2. 横向频道 Tab 栏 -->
    <scroll-view class="channel-tabs" scroll-x enable-flex show-scrollbar="{{false}}">
      <view 
        class="tab-item {{currentTab === index ? 'tab-item--active' : ''}}"
        wx:for="{{navTabs}}" 
        wx:key="name"
        bindtap="onTabChange"
        data-index="{{index}}"
      >
        <text class="tab-text">{{item.name}}</text>
        <view class="tab-line" wx:if="{{currentTab === index}}"></view>
      </view>
    </scroll-view>

    <!-- 3. 主视频流瀑布流（双列卡片布局） -->
    <scroll-view scroll-y class="main-video-feed" enhanced show-scrollbar="{{false}}">
      
      <!-- 顶部 Banner 特献大卡片 -->
      <view class="hero-card" bindtap="onBannerTap">
        <image class="hero-cover" src="/static/images/hero_tea_course.jpg" mode="aspectFill" />
        <view class="hero-overlay">
          <view class="hero-badge">
            <text class="hero-badge-text">特献大咖课</text>
          </view>
          <text class="hero-title">【大师亲授】跨越山海 遇见茶香 | 黔藤古树茶杀青发酵实操通关</text>
        </view>
      </view>

      <!-- 双列视频网格 Grid -->
      <view class="video-grid">
        <view 
          class="video-card" 
          wx:for="{{displayChapters}}" 
          wx:key="id"
          bindtap="onChapterTap"
          data-chapter="{{item}}"
        >
          <!-- 视频封面图与浮层数据 -->
          <view class="cover-wrap">
            <image class="cover-img" src="{{item.coverUrl}}" mode="aspectFill" />
            <view class="cover-gradient"></view>
            
            <!-- 播放量 / 赞 / 时长 浮层 -->
            <view class="cover-stats">
              <view class="stats-left">
                <text class="stat-icon">👁</text>
                <text class="stat-text">{{item.views}}</text>
                <text class="stat-icon stat-icon--like">👍</text>
                <text class="stat-text">{{item.likes}}</text>
              </view>
              <text class="duration-text">{{item.duration}}</text>
            </view>
          </view>

          <!-- 视频标题与UP主信息 -->
          <view class="card-info">
            <text class="video-title">{{item.chapterDescription}}</text>

            <view class="author-row">
              <view class="author-left">
                <image class="author-avatar" src="{{item.authorAvatar}}" mode="aspectFill" />
                <text class="author-name">UP {{item.authorName}}</text>
              </view>

              <!-- 价格或免标 -->
              <view class="price-tag" wx:if="{{!item.is_paid}}">
                <text class="free-text">免费</text>
              </view>
              <view class="price-tag price-tag--owned" wx:elif="{{item.is_purchased}}">
                <text class="owned-text">已购</text>
              </view>
              <view class="price-tag" wx:else>
                <text class="price-text">¥{{item.price}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="safe-bottom"></view>
    </scroll-view>

  </view>
</view>`,

  wxss: `/* ===================================================
   course.wxss (双列视频流 · 雅致黔藤绿主题)
   =================================================== */

page {
  background-color: #171717;
  color: #FFFFFF;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

.page {
  min-height: 100vh;
  background-color: #171717;
}

/* 顶部搜索 */
.header-search-bar {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 24rpx;
  background: #1C1C1E;
}

.user-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}

.search-input-box {
  flex: 1;
  height: 64rpx;
  background: #2C2C2E;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  gap: 12rpx;
}

.search-placeholder {
  font-size: 24rpx;
  color: #8E8E93;
}

.bell-box {
  position: relative;
}

.bell-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 12rpx;
  height: 12rpx;
  background: #243727;
  border-radius: 50%;
}

/* 横向频道 Tabs */
.channel-tabs {
  display: flex;
  white-space: nowrap;
  background: #1C1C1E;
  border-bottom: 1rpx solid #2C2C2E;
  height: 80rpx;
}

.tab-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 28rpx;
  height: 100%;
  position: relative;
}

.tab-text {
  font-size: 26rpx;
  color: #8E8E93;
  font-weight: 500;
}

.tab-item--active .tab-text {
  color: #FFFFFF;
  font-weight: 700;
}

.tab-line {
  position: absolute;
  bottom: 6rpx;
  width: 32rpx;
  height: 6rpx;
  background: #243727;
  border-radius: 3rpx;
}

/* 主视频流双列瀑布流 */
.main-video-feed {
  flex: 1;
  padding: 20rpx;
  box-sizing: border-box;
}

/* 特献 Hero 卡片 */
.hero-card {
  position: relative;
  height: 320rpx;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.hero-cover {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24rpx;
}

.hero-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #FFFFFF;
  margin-top: 10rpx;
}

/* 双列网格 Grid */
.video-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
}

.video-card {
  background: #2C2C2E;
  border-radius: 20rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cover-wrap {
  position: relative;
  width: 100%;
  height: 200rpx;
}

.cover-img {
  width: 100%;
  height: 100%;
}

.cover-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80rpx;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%);
}

.cover-stats {
  position: absolute;
  bottom: 10rpx;
  left: 12rpx;
  right: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18rpx;
  color: rgba(255, 255, 255, 0.9);
}

.stats-left {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.card-info {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  flex: 1;
  justify-content: space-between;
}

.video-title {
  font-size: 24rpx;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.author-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.author-avatar {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
}

.author-name {
  font-size: 18rpx;
  color: #8E8E93;
}

.free-text {
  font-size: 20rpx;
  color: #34C759;
  font-weight: 700;
}

.price-text {
  font-size: 22rpx;
  color: #FF9500;
  font-weight: 800;
}`,

  js: `const { createPage } = require('../../utils/page-mixin');
const { get } = require('../../utils/request');

createPage({
  data: {
    navTabs: [
      { name: '推荐' },
      { name: '基础课程' },
      { name: '进阶课程' },
      { name: '实战直播' },
      { name: '品鉴技巧' }
    ],
    currentTab: 0,
    displayChapters: []
  },

  onLoad() {
    this.loadCourseData();
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
  },

  onChapterTap(e) {
    const chapter = e.currentTarget.dataset.chapter;
    wx.navigateTo({
      url: \`/pages/course/course-detail?chap_id=\${chapter.id}\`
    });
  }
});`,

  json: `{
  "navigationBarTitleText": "精选视频课程",
  "navigationBarBackgroundColor": "#171717",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": false
}`
};

export const CoursePage: React.FC<CoursePageProps> = ({ onShowToast }) => {
  const [currentTab, setCurrentTab] = useState<number>(0); // 0: 推荐, 1: 基础课程, 2: 进阶课程, 3: 实战直播
  const [searchQuery, setSearchQuery] = useState('');
  const [chapters, setChapters] = useState<ChapterItem[]>(INITIAL_CHAPTERS);
  const [userPoints, setUserPoints] = useState(520);

  // Modal State
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem | null>(null);
  const [paymentType, setPaymentType] = useState<'cash' | 'points'>('cash');

  // Code inspection state
  const [showCodeView, setShowCodeView] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'wxml' | 'wxss' | 'js' | 'json'>('wxml');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // Channels Tabs
  const NAV_TABS = [
    { name: '推荐', icon: Flame },
    { name: '基础课程', icon: GraduationCap },
    { name: '进阶课程', icon: Award },
    { name: '实战直播', icon: Radio },
    { name: '品鉴美学', icon: Tv2 }
  ];

  // Filtered chapters for live view
  const displayChapters = chapters.filter((item) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.chapterName.toLowerCase().includes(q);
      const matchDesc = item.chapterDescription.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) return false;
    }

    // Category tab filter
    if (currentTab === 1) return item.chapterType === 1;
    if (currentTab === 2) return item.chapterType === 2;
    return true; // 0: 推荐, 3/4: All
  });

  const handleCopyCode = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    onShowToast(`已复制 ${tab.toUpperCase()} 代码到剪贴板`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleChapterClick = (chapter: ChapterItem) => {
    if (!chapter.isPaid || chapter.isPurchased) {
      onShowToast(`开启视频播放: ${chapter.chapterName}`, 'info');
    } else {
      setSelectedChapter(chapter);
      setShowPurchaseModal(true);
      setPaymentType('cash');
    }
  };

  const handleConfirmPurchase = () => {
    if (!selectedChapter) return;

    if (paymentType === 'points') {
      if (userPoints < selectedChapter.pointsPrice) {
        onShowToast('积分不足，无法完成兑换', 'warning');
        return;
      }
      setUserPoints((prev) => prev - selectedChapter.pointsPrice);
      onShowToast(`成功兑换章节: ${selectedChapter.chapterName}`, 'success');
    } else {
      onShowToast(`即刻成功开通: ${selectedChapter.chapterName}`, 'success');
    }

    // Mark as purchased
    setChapters((prev) =>
      prev.map((c) => (c.id === selectedChapter.id ? { ...c, isPurchased: true } : c))
    );
    setShowPurchaseModal(false);
    setSelectedChapter(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FA] text-neutral-800 font-sans overflow-hidden">
      {/* 1. Header Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 border-b border-neutral-200/80 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Avatar"
            className="w-7 h-7 rounded-full object-cover border border-neutral-200 shrink-0"
          />

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索茶道课程、杀青工艺、茶席置景..."
              className="w-full pl-8 pr-3 py-1 bg-neutral-100 hover:bg-neutral-200/70 text-xs text-neutral-900 rounded-full focus:outline-none focus:ring-1 focus:ring-[#243727] placeholder:text-neutral-400 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onShowToast('无新未读通知', 'info')}
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors relative cursor-pointer"
            title="通知"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-700 rounded-full" />
          </button>

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
            <span>{showCodeView ? '返回视频流' : '小程序源码'}</span>
          </button>
        </div>
      </div>

      {/* 2. Channel Tabs Bar */}
      <div className="bg-white border-b border-neutral-200/80 px-2 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
        {NAV_TABS.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = currentTab === idx;

          return (
            <button
              key={tab.name}
              type="button"
              onClick={() => setCurrentTab(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#243727] text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {showCodeView ? (
          /* Mini Program Code Drawer Mode */
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">
                  双列视频流页面源码 (WeChat Mini Program)
                </div>
                <div className="text-[11px] text-neutral-500">
                  Stitch Qián Téng 雅致美学 · B站/抖音风格双列网格与购买弹窗
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
          /* Live UI Video Feed Grid Mode */
          <>
            {/* Top Featured Hero Video Card */}
            <div
              onClick={() => onShowToast('点击查看名师特献视频直播', 'info')}
              className="relative h-44 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-neutral-200"
            >
              <img
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80"
                alt="Featured Hero"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              <div className="absolute inset-0 p-3.5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-emerald-700/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-tight text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-200" />
                    <span>大咖特献 · 黔藤茶道</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowToast('更多特献操作', 'info');
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-black tracking-tight leading-snug line-clamp-2 font-serif text-amber-100">
                    【大师讲堂】跨越山海 遇见茶香 | 黔藤古树茶杀青与传统发酵全景通关
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-300 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-3 h-3 text-emerald-300" />
                        <span>12.5万人在看</span>
                      </span>
                      <span>·</span>
                      <span>茶道名师 林依 讲授</span>
                    </div>

                    <span className="px-2 py-0.5 bg-white/20 rounded-md font-mono">
                      高清 4K
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between pt-1 pb-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-black text-neutral-900 tracking-tight">
                  精选茶道视频课程
                </span>
                <span className="text-[10px] font-bold text-neutral-400 font-mono">
                  VIDEOS · {displayChapters.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onShowToast('筛选视频视角', 'info')}
                className="text-[11px] font-bold text-[#243727] hover:underline flex items-center gap-1"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>综合排序</span>
              </button>
            </div>

            {/* 2-Column Bilibili/Douyin Style Video Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {displayChapters.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleChapterClick(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-[#243727]/30 transition-all flex flex-col cursor-pointer group"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.coverUrl}
                      alt={item.chapterName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient overlay for bottom stats */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top status tag if purchased */}
                    {item.isPurchased && (
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#243727]/90 text-white text-[9px] font-bold rounded-md backdrop-blur-xs flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-300" />
                        <span>已解锁</span>
                      </div>
                    )}

                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom stats overlay (Views, Likes, Duration) */}
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-white/90 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-2.5 h-2.5 text-neutral-300" />
                          <span>{item.views}</span>
                        </span>
                        <span className="flex items-center gap-0.5">
                          <ThumbsUp className="w-2.5 h-2.5 text-neutral-300" />
                          <span>{item.likes}</span>
                        </span>
                      </div>
                      <span className="bg-black/40 px-1 py-0.2 rounded text-[9px]">
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                    {/* Title */}
                    <div className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2 group-hover:text-[#243727] transition-colors">
                      {item.chapterDescription}
                    </div>

                    {/* Presenter / UP Row & Price Tag */}
                    <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                      <div className="flex items-center gap-1 min-w-0 flex-1 pr-1">
                        <img
                          src={item.authorAvatar}
                          alt={item.authorName}
                          className="w-4 h-4 rounded-full object-cover shrink-0"
                        />
                        <span className="text-[10px] text-neutral-500 font-medium truncate">
                          {item.authorName}
                        </span>
                      </div>

                      <div className="shrink-0">
                        {!item.isPaid ? (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            免费
                          </span>
                        ) : item.isPurchased ? (
                          <span className="text-[10px] font-bold text-[#243727] bg-[#F5EFE6] px-1.5 py-0.5 rounded">
                            已购
                          </span>
                        ) : (
                          <div className="flex items-baseline gap-0.5 text-amber-800">
                            <span className="text-[9px] font-bold">¥</span>
                            <span className="text-xs font-black font-mono">{item.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Purchase Modal Bottom Sheet */}
      <AnimatePresence>
        {showPurchaseModal && selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowPurchaseModal(false)}
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
                    CHAPTER · 章节视频解锁
                  </div>
                  <div className="text-base font-bold text-neutral-900 font-serif">
                    {selectedChapter.chapterName}
                  </div>
                  <div className="text-xs text-neutral-500 line-clamp-1">
                    {selectedChapter.chapterDescription}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPurchaseModal(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Purchase Options */}
              <div className="space-y-2">
                {/* Cash Option */}
                <div
                  onClick={() => setPaymentType('cash')}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    paymentType === 'cash'
                      ? 'border-[#243727] bg-[#F5EFE6]'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentType === 'cash'
                          ? 'border-[#243727] bg-[#243727]'
                          : 'border-neutral-300'
                      }`}
                    >
                      {paymentType === 'cash' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">现金支付</div>
                      <div className="text-[10px] text-neutral-500">即时开通 · 永久无限回看</div>
                    </div>
                  </div>

                  <div className="text-sm font-black font-mono text-[#243727]">
                    ¥{selectedChapter.price}
                  </div>
                </div>

                {/* Points Option */}
                {selectedChapter.isPointsExchange && selectedChapter.pointsPrice > 0 && (
                  <div
                    onClick={() => setPaymentType('points')}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      paymentType === 'points'
                        ? 'border-[#243727] bg-[#F5EFE6]'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentType === 'points'
                            ? 'border-[#243727] bg-[#243727]'
                            : 'border-neutral-300'
                        }`}
                      >
                        {paymentType === 'points' && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">积分兑换</div>
                        <div className="text-[10px] text-neutral-500">
                          当前持有积分: {userPoints}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-black font-mono text-[#243727]">
                      {selectedChapter.pointsPrice} 积分
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleConfirmPurchase}
                className="w-full py-3 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{paymentType === 'cash' ? '确认支付开通' : '确认积分兑换'}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
