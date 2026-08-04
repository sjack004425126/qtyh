import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  CheckCircle2,
  Copy,
  Search,
  Sparkles,
  X,
  CreditCard,
  GraduationCap,
  Award,
  Check,
  Eye,
  ThumbsUp,
  Play,
  MoreVertical,
  Bell,
  SlidersHorizontal,
  Radio,
  Flame,
  Tv2,
  ChevronLeft,
  Share2,
  Lock,
  Pause,
  Clock,
  Gift,
  Coins,
  BookOpen,
  ArrowRight,
  ChevronDown
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
  originalPrice?: string;
  pointsPrice: number;
  isPointsExchange: boolean;
  isPurchased: boolean;
  tags: string[];
  lessons: LessonItem[];
}

interface LessonItem {
  id: string;
  title: string;
  duration: string;
  date: string;
  isFree?: boolean;
  coverUrl?: string;
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
    tags: ['杀青工艺', '黑茶制作', '入门必备'],
    lessons: [
      { id: 'les-101', title: '01. 鲜叶采摘标准与杀青温控', duration: '04:15', date: '2026-08-01', isFree: true, coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-102', title: '02. 传统渥堆发酵核心要素', duration: '03:50', date: '2026-08-02', isFree: true, coverUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-103', title: '03. 盖碗抱壶与水温注水线', duration: '02:40', date: '2026-08-03', isFree: true, coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-104', title: '04. 茶汤色泽与叶底感官评鉴', duration: '02:00', date: '2026-08-04', isFree: true, coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=500&q=80' }
    ]
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
    originalPrice: '49.00',
    pointsPrice: 290,
    isPointsExchange: true,
    isPurchased: true,
    tags: ['盖碗冲泡', '姿态标准', '高分实操'],
    lessons: [
      { id: 'les-201', title: '01. 盖碗握法与三指开盖动作', duration: '02:30', date: '2026-08-01', coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-202', title: '02. 高冲低斟与水流控制力', duration: '02:15', date: '2026-08-02', coverUrl: 'https://images.unsplash.com/photo-1571934811356-5cc531a6891e?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-203', title: '03. 浸泡秒数与出汤速度比对', duration: '01:55', date: '2026-08-03', coverUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-204', title: '04. 分茶入盏与礼仪姿态规范', duration: '01:50', date: '2026-08-04', coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=500&q=80' }
    ]
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
    originalPrice: '79.00',
    pointsPrice: 490,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['感官评茶', '皇菊品鉴', '回甘分层'],
    lessons: [
      { id: 'les-301', title: '01. 朵形完整度与产地鉴别', duration: '04:00', date: '2026-08-01', isFree: true, coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-302', title: '02. 透明玻璃器皿冲泡视觉', duration: '03:40', date: '2026-08-02', coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-303', title: '03. 香气分层与前中后调识别', duration: '04:10', date: '2026-08-03', coverUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-304', title: '04. 生津回甘与耐泡度评测', duration: '03:20', date: '2026-08-04', coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=500&q=80' }
    ]
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
    originalPrice: '98.00',
    pointsPrice: 680,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['茶席置景', '空间气韵', '插花配图'],
    lessons: [
      { id: 'les-401', title: '01. 茶布色彩搭配与材质选择', duration: '05:10', date: '2026-08-01', isFree: true, coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-402', title: '02. 主客杯位摆放与线条气韵', duration: '05:20', date: '2026-08-02', coverUrl: 'https://images.unsplash.com/photo-1571934811356-5cc531a6891e?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-403', title: '03. 枯枝野花瓶插美学构图', duration: '05:15', date: '2026-08-03', coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-404', title: '04. 柔光暗影气氛营造技巧', duration: '05:20', date: '2026-08-04', coverUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' }
    ]
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
    originalPrice: '168.00',
    pointsPrice: 1280,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['风味轮', '瑕疵辨识', '盲品实测'],
    lessons: [
      { id: 'les-501', title: '01. 评茶师风味轮体系建构', duration: '04:30', date: '2026-08-01', coverUrl: 'https://images.unsplash.com/photo-1571934811356-5cc531a6891e?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-502', title: '02. 常见储藏瑕疵味辨识', duration: '04:40', date: '2026-08-02', coverUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-503', title: '03. 炒青焦糊味与高温闷黄', duration: '04:32', date: '2026-08-03', coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-504', title: '04. 盲品实测训练与评分表', duration: '04:40', date: '2026-08-04', coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=500&q=80' }
    ]
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
    originalPrice: '218.00',
    pointsPrice: 1680,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['老茶仓储', '陈化调控', '菌群分析'],
    lessons: [
      { id: 'les-601', title: '01. 窖藏环境温湿度黄金平衡', duration: '06:10', date: '2026-08-01', coverUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-602', title: '02. 冠突散囊菌与后发酵机制', duration: '06:30', date: '2026-08-02', coverUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-603', title: '03. 紫砂缸与陶罐存茶效果比对', duration: '06:20', date: '2026-08-03', coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
      { id: 'les-604', title: '04. 陈年老茶定期退仓醒茶实操', duration: '06:40', date: '2026-08-04', coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80' }
    ]
  }
];

// Complete Redesigned WeChat Mini Program Source Code for Course Detail Page
const MINI_PROGRAM_CODE = {
  wxml: `<!-- 课程详情 pages/course/course-detail -->
<view class="page">
  <view class="container">

    <!-- 1. 顶部固定半透明导航栏 -->
    <view class="top-nav">
      <view class="top-nav-back" bindtap="goBack">
        <text class="top-nav-back-icon">‹</text>
      </view>
      <view class="top-nav-title">{{chapterDetail.name || '课程详情'}}</view>
      <view class="top-nav-share" bindtap="onShareTap">
        <text class="top-nav-share-icon">↗</text>
      </view>
    </view>

    <!-- 2. Hero 视频播放区 (状态机) -->
    <view class="hero-video">
      <block wx:if="{{chapterDetail.cover}}">
        <image src="{{chapterDetail.cover}}" class="video-poster video-poster--bg" mode="aspectFill"></image>
        <view class="video-overlay video-overlay--strong"></view>
      </block>

      <!-- HTML5 Video 播放器 -->
      <video
        wx:if="{{heroState === 'playing' && currentVideo && currentVideo.play_url && showVideoPlayer}}"
        id="courseVideoPlayer"
        src="{{currentVideo.play_url}}"
        poster="{{chapterDetail.cover}}"
        class="video-player"
        controls
        autoplay="{{true}}"
        bindplay="onVideoPlay"
        bindpause="onVideoPause"
        bindended="onVideoEnded"
        bindtimeupdate="onVideoTimeUpdate"
      ></video>

      <!-- 章节标题条 (永远显示) -->
      <view class="hero-title-bar">
        <text class="video-eyebrow">{{chapterDetail.category_name || 'CHAPTER'}}</text>
        <text class="video-title">{{chapterDetail.name}}</text>
      </view>

      <!-- 状态 1: 首次加载 -->
      <view class="hero-state-layer" wx:if="{{heroState === 'loading' && !chapterDetail.cover}}">
        <view class="placeholder-spinner"></view>
        <text class="placeholder-text">正在加载视频...</text>
      </view>

      <!-- 状态 2: 未登录 -->
      <view class="hero-state-layer" wx:elif="{{heroState === 'needLogin'}}">
        <view class="hero-cta">
          <view class="hero-cta-btn" bindtap="onLoginTap">
            <text class="hero-cta-btn-text">登录后观看</text>
          </view>
          <text class="hero-cta-hint">登录后可查看课时并学习</text>
        </view>
      </view>

      <!-- 状态 3: 未购买 -->
      <view class="hero-state-layer" wx:elif="{{heroState === 'needBuy'}}">
        <view class="hero-cta">
          <view class="hero-cta-price" wx:if="{{chapterPricing.is_paid && chapterPricing.price > 0}}">
            <text class="hero-cta-price-symbol">¥</text>
            <text class="hero-cta-price-num">{{chapterPricing.price}}</text>
            <text wx:if="{{chapterPricing.original_price}}" class="hero-cta-price-original">¥{{chapterPricing.original_price}}</text>
          </view>
          <view class="hero-cta-btn hero-cta-btn--primary" bindtap="onBuyTap">
            <text class="hero-cta-btn-text">购买本章节</text>
          </view>
          <text class="hero-cta-hint" wx:if="{{chapterPricing.is_points_exchange}}">支持 {{chapterPricing.points_price}} 积分兑换</text>
          <text class="hero-cta-hint" wx:else>购买后本章节全部课时可学习</text>
        </view>
      </view>

      <!-- 状态 4: 已购 + 就绪, 可点击中央播放 -->
      <view class="hero-state-layer" wx:elif="{{heroState === 'playing' && !showVideoPlayer}}">
        <view class="video-play-btn" bindtap="playVideo">
          <text class="video-play-icon">▶</text>
        </view>
      </view>
    </view>

    <!-- 3. 主体内容滚动区 -->
    <scroll-view scroll-y class="main-content" enhanced show-scrollbar="{{false}}">
      
      <!-- 章节 Title & Meta -->
      <view class="chapter-head">
        <text class="chapter-eyebrow">CHAPTER · {{chapterDetail.category_name || '基础课程'}}</text>
        <text class="chapter-name">{{chapterDetail.name || '课程详情'}}</text>
        <view class="chapter-meta">
          <text class="chapter-meta-text">{{chapterDetail.instructor || '黔茶小仙'}}</text>
          <text class="chapter-meta-dot">·</text>
          <text class="chapter-meta-text">{{chapterDetail.students || 1280}} 人正在学习</text>
        </view>
      </view>

      <!-- 学习进度卡 (已购买时显示) -->
      <view class="progress-card" wx:if="{{isPurchased}}">
        <view class="progress-card-head">
          <view class="progress-card-title-wrap">
            <text class="progress-eyebrow">PROGRESS · 学习进度</text>
            <text class="progress-title">{{learningProgress}}%</text>
          </view>
          <view class="reward-tag reward-tag--completed">
            <text>已获得 50 积分</text>
          </view>
        </view>
        <view class="progress-bar-wrap">
          <view class="progress-bar">
            <view class="progress-fill" style="width: {{learningProgress}}%"></view>
          </view>
        </view>
        <view class="progress-info">
          <view class="progress-info-item">
            <text class="progress-info-label">已观看</text>
            <text class="progress-info-value">09分45秒</text>
          </view>
          <view class="progress-info-divider"></view>
          <view class="progress-info-item">
            <text class="progress-info-label">总时长</text>
            <text class="progress-info-value">12分45秒</text>
          </view>
        </view>
      </view>

      <!-- 未购购买卡 (未购买时显示) -->
      <view class="purchase-card" wx:else>
        <view class="purchase-card-head">
          <text class="purchase-card-eyebrow">PREMIUM · 付费章节</text>
          <view class="purchase-card-price">
            <text class="purchase-card-symbol">¥</text>
            <text class="purchase-card-num">{{chapterPricing.price}}</text>
            <text wx:if="{{chapterPricing.original_price}}" class="purchase-card-original">¥{{chapterPricing.original_price}}</text>
          </view>
        </view>
        <view class="purchase-card-desc">购买本章节后，所有 {{lessonList.length}} 个课时均可学习。</view>
        <view class="purchase-card-actions">
          <view class="purchase-card-btn purchase-card-btn--primary" bindtap="onBuyTap">
            <text class="purchase-card-btn-text">立即购买</text>
          </view>
          <view class="purchase-card-btn" wx:if="{{chapterPricing.is_points_exchange}}" bindtap="onBuyTap">
            <text class="purchase-card-btn-text">{{chapterPricing.points_price}} 积分兑换</text>
          </view>
        </view>
      </view>

      <!-- 课时列表 (2列封面卡片) -->
      <view class="lessons-section">
        <view class="section-head">
          <view class="section-head-left">
            <text class="section-title">课时列表</text>
            <text class="section-sub">LESSONS · {{lessonList.length}}</text>
          </view>
          <text class="section-hint">点击卡片切换课时</text>
        </view>

        <view class="video-grid video-grid-2col">
          <view
            class="video-card lesson-card {{item.id === currentLessonId ? 'lesson-card--active' : ''}}"
            wx:for="{{lessonList}}"
            wx:key="id"
            bindtap="selectLesson"
            data-lesson="{{item}}"
            data-index="{{index}}"
          >
            <!-- 课程/课时封面图片 -->
            <view class="cover-wrap lesson-cover-wrap">
              <image src="{{item.coverUrl || chapterDetail.cover}}" class="cover-img" mode="aspectFill"></image>
              <view class="cover-gradient"></view>
              <view class="lesson-num-tag">
                <text class="lesson-num-text">0{{index + 1}}</text>
              </view>
              <view class="cover-stats">
                <text class="duration-text">{{item.duration}}</text>
              </view>
              <view class="owned-tag" wx:if="{{isPurchased}}">
                <text class="owned-tag-text">{{item.id === currentLessonId ? '播放中' : '已解锁'}}</text>
              </view>
              <view class="lock-overlay" wx:elif="{{item.isFree}}">
                <view class="lock-badge"><text class="lock-text">免费试看</text></view>
              </view>
              <view class="lock-overlay" wx:else>
                <view class="lock-badge"><text class="lock-text">需解锁</text></view>
              </view>
            </view>

            <!-- 课时信息 -->
            <view class="card-info">
              <text class="video-title lesson-title">{{item.title}}</text>
              <view class="author-row">
                <view class="author-left">
                  <text class="lesson-meta-prefix">第{{index + 1}}节</text>
                  <text class="lesson-meta-dot">·</text>
                  <text class="lesson-meta-sub">{{item.date}}</text>
                </view>
                <view class="lesson-status">
                  <text wx:if="{{item.id === currentLessonId}}" class="status-playing">● 播放中</text>
                  <text wx:elif="{{isPurchased}}" class="status-play">点击观看</text>
                  <text wx:elif="{{item.isFree}}" class="status-trial">免费试看</text>
                  <text wx:else class="status-locked">点击购买</text>
                </view>
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
   course-detail.wxss (课程详情 · 雅致深绿主题)
   =================================================== */

page {
  background-color: #F8F9FA;
  color: #1C1C1E;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
}

.top-nav-back, .top-nav-share {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12rpx);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.top-nav-title {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.hero-video {
  position: relative;
  width: 100%;
  height: 420rpx;
  background: #000000;
  overflow: hidden;
}

.video-poster--bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.video-overlay--strong {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%);
}

.hero-title-bar {
  position: absolute;
  left: 32rpx;
  right: 32rpx;
  bottom: 32rpx;
  z-index: 10;
}

.video-eyebrow {
  font-size: 20rpx;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 8rpx;
  display: block;
}

.video-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
}

.hero-state-layer {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.video-play-btn {
  width: 110rpx;
  height: 110rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.4);
}

.video-play-icon {
  font-size: 44rpx;
  color: #243727;
  margin-left: 6rpx;
}

.main-content {
  flex: 1;
  padding: 32rpx 28rpx;
}

.chapter-head {
  margin-bottom: 24rpx;
}

.chapter-eyebrow {
  font-size: 20rpx;
  color: #8E8E93;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.chapter-name {
  font-size: 36rpx;
  font-weight: 800;
  color: #1C1C1E;
  margin: 8rpx 0;
}

.chapter-meta {
  font-size: 22rpx;
  color: #8E8E93;
}

.progress-card {
  background: #FFFFFF;
  border: 1rpx solid #E5E5EA;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 28rpx;
}

.progress-title {
  font-size: 52rpx;
  font-weight: 800;
  color: #243727;
}

.progress-bar {
  width: 100%;
  height: 10rpx;
  background: #E5E5EA;
  border-radius: 5rpx;
  margin: 20rpx 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #243727;
  border-radius: 5rpx;
}

.purchase-card {
  background: linear-gradient(135deg, #F5EFE6 0%, #FFFFFF 100%);
  border: 1rpx solid #E5D5C0;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 28rpx;
}

.purchase-card-num {
  font-size: 44rpx;
  font-weight: 800;
  color: #243727;
}

.purchase-card-btn--primary {
  background: #243727;
  color: #FFFFFF;
  border-radius: 40rpx;
  padding: 16rpx 36rpx;
  text-align: center;
  font-weight: 700;
}

.lessons-section {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.lesson-card {
  display: flex;
  background: #FFFFFF;
  border-radius: 20rpx;
  border: 1rpx solid #E5E5EA;
  overflow: hidden;
}

.lesson-card--active {
  border-color: #243727;
  background: #F4F6F4;
}

.lesson-cover-wrap {
  width: 180rpx;
  height: 180rpx;
  background: linear-gradient(135deg, #243727 0%, #1a281c 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lesson-cover-num {
  font-size: 64rpx;
  font-weight: 900;
  color: rgba(255,255,255,0.9);
}`,

  js: `const { createPage } = require('../../utils/page-mixin');

createPage({
  data: {
    chapterId: 'chap-101',
    chapterDetail: {
      name: '黔藤茶道概论',
      category_name: '基础茶道',
      cover: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
      instructor: '黔茶小仙',
      students: 1280
    },
    chapterPricing: {
      is_paid: true,
      price: '29.00',
      original_price: '49.00',
      points_price: 290,
      is_points_exchange: true
    },
    heroState: 'playing',
    showVideoPlayer: false,
    isPurchased: true,
    learningProgress: 78,
    currentLessonId: 'les-101',
    lessonList: [
      { id: 'les-101', title: '01. 鲜叶采摘标准与杀青温控', duration: '04:15', date: '2026-08-01' },
      { id: 'les-102', title: '02. 传统渥堆发酵核心要素', duration: '03:50', date: '2026-08-02' },
      { id: 'les-103', title: '03. 盖碗抱壶与水温注水线', duration: '02:40', date: '2026-08-03' },
      { id: 'les-104', title: '04. 茶汤色泽与叶底感官评鉴', duration: '02:00', date: '2026-08-04' }
    ]
  },

  onLoad(options) {
    if (options.chap_id) {
      this.setData({ chapterId: options.chap_id });
    }
  },

  playVideo() {
    this.setData({ showVideoPlayer: true });
  },

  selectLesson(e) {
    const lesson = e.currentTarget.dataset.lesson;
    this.setData({
      currentLessonId: lesson.id,
      showVideoPlayer: true
    });
  },

  onBuyTap() {
    wx.showToast({ title: '拉起购买支付', icon: 'none' });
  },

  goBack() {
    wx.navigateBack();
  }
});`,

  json: `{
  "navigationBarTitleText": "课程详情",
  "navigationBarBackgroundColor": "#171717",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": false
}`
};

export const CoursePage: React.FC<CoursePageProps> = ({ onShowToast }) => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [currentTab, setCurrentTab] = useState<number>(0); // 0: 推荐, 1: 基础课程, 2: 进阶课程, 3: 实战直播, 4: 品鉴美学
  const [searchQuery, setSearchQuery] = useState('');
  const [chapters, setChapters] = useState<ChapterItem[]>(INITIAL_CHAPTERS);
  const [selectedChapter, setSelectedChapter] = useState<ChapterItem>(INITIAL_CHAPTERS[0]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(INITIAL_CHAPTERS[0].lessons[0].id);
  
  // Interactive Video Player State
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [learningProgress, setLearningProgress] = useState<number>(78);
  const [userPoints, setUserPoints] = useState<number>(520);

  // Modal State
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [modalChapter, setModalChapter] = useState<ChapterItem | null>(null);
  const [paymentType, setPaymentType] = useState<'cash' | 'points'>('cash');

  // Code inspection state
  const [showCodeView, setShowCodeView] = useState<boolean>(false);
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

  // Filtered chapters for list view
  const displayChapters = chapters.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.chapterName.toLowerCase().includes(q);
      const matchDesc = item.chapterDescription.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) return false;
    }

    if (currentTab === 1) return item.chapterType === 1;
    if (currentTab === 2) return item.chapterType === 2;
    return true;
  });

  const handleCopyCode = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    onShowToast(`已复制 ${tab.toUpperCase()} 代码到剪贴板`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleOpenDetail = (chapter: ChapterItem) => {
    setSelectedChapter(chapter);
    if (chapter.lessons && chapter.lessons.length > 0) {
      setSelectedLessonId(chapter.lessons[0].id);
    }
    setIsVideoPlaying(false);
    setViewMode('detail');
  };

  const handleSelectLesson = (lesson: LessonItem) => {
    if (!selectedChapter.isPurchased && !lesson.isFree) {
      setModalChapter(selectedChapter);
      setShowPurchaseModal(true);
      onShowToast('该课时需购买章节后解锁', 'warning');
      return;
    }

    setSelectedLessonId(lesson.id);
    setIsVideoPlaying(true);
    onShowToast(`开始播放课时: ${lesson.title}`, 'info');
  };

  const handleOpenPurchase = (chapter: ChapterItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalChapter(chapter);
    setPaymentType('cash');
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = () => {
    if (!modalChapter) return;

    if (paymentType === 'points') {
      if (userPoints < modalChapter.pointsPrice) {
        onShowToast('积分不足，无法完成兑换', 'warning');
        return;
      }
      setUserPoints((prev) => prev - modalChapter.pointsPrice);
      onShowToast(`成功使用 ${modalChapter.pointsPrice} 积分兑换章节: ${modalChapter.chapterName}`, 'success');
    } else {
      onShowToast(`即刻成功支付开通: ${modalChapter.chapterName}`, 'success');
    }

    // Mark as purchased
    setChapters((prev) =>
      prev.map((c) => (c.id === modalChapter.id ? { ...c, isPurchased: true } : c))
    );
    if (selectedChapter.id === modalChapter.id) {
      setSelectedChapter((prev) => ({ ...prev, isPurchased: true }));
    }

    setShowPurchaseModal(false);
    setModalChapter(null);
  };

  const currentLesson = selectedChapter.lessons.find((l) => l.id === selectedLessonId) || selectedChapter.lessons[0];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FA] text-neutral-800 font-sans overflow-hidden select-none">
      
      {/* Top Banner Navigation: Clear Mode Switcher */}
      <div className="bg-[#243727] text-white px-3.5 py-2 flex items-center justify-between text-xs shrink-0 shadow-sm border-b border-white/10 z-30">
        <div className="flex items-center gap-1.5 font-bold">
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <span className="tracking-tight">精选茶道视频课程</span>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-full border border-white/10 text-[11px]">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
              viewMode === 'list'
                ? 'bg-white text-[#243727] shadow-xs'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            视频大厅
          </button>
          <button
            type="button"
            onClick={() => handleOpenDetail(selectedChapter || chapters[0])}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold flex items-center gap-1 ${
              viewMode === 'detail'
                ? 'bg-emerald-400 text-neutral-900 shadow-xs'
                : 'text-emerald-300 hover:text-white font-black'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>课程详情预览</span>
          </button>
        </div>
      </div>

      {/* Dynamic Header */}
      {viewMode === 'list' ? (
        /* List View Sticky Header */
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
      ) : (
        /* Course Detail View Overlay Floating Nav Header */
        <div className="absolute top-0 left-0 right-0 z-40 px-3.5 py-3 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white pointer-events-auto">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer border border-white/10"
            title="返回列表"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>

          <div className="text-xs font-bold tracking-tight text-white/90 truncate max-w-[200px]">
            {selectedChapter.chapterName}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCodeView(!showCodeView)}
              className={`px-2 py-1 text-[11px] font-semibold rounded-full border backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer ${
                showCodeView
                  ? 'bg-white text-[#243727] border-white'
                  : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>{showCodeView ? '返回页面' : '源码'}</span>
            </button>

            <button
              type="button"
              onClick={() => onShowToast('分享链接已复制到剪贴板', 'success')}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer border border-white/10"
              title="分享"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* List Mode Channel Tabs Bar */}
      {viewMode === 'list' && (
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
      )}

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {showCodeView ? (
          /* Mini Program Code Drawer Mode */
          <div className="p-3 space-y-3">
            <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">
                  {viewMode === 'detail' ? '课程详情页面源码 (course-detail)' : '双列视频流页面源码 (course)'}
                </div>
                <div className="text-[11px] text-neutral-500">
                  Stitch Qián Téng 雅致深绿美学 · WXML / WXSS / JS / JSON
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

            <div className="relative bg-neutral-950 rounded-xl p-3 text-neutral-100 font-mono text-[11px] overflow-x-auto max-h-[520px] leading-relaxed border border-neutral-800">
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
        ) : viewMode === 'list' ? (
          /* LIST MODE: 2-Column Bilibili/Douyin Grid Layout */
          <div className="p-3 space-y-3">
            {/* Top Featured Hero Video Banner Card */}
            <div
              onClick={() => handleOpenDetail(chapters[0])}
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
                    <span>特献大咖课 · 黔藤茶道</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowToast('名师讲堂精选视界', 'info');
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm font-black tracking-tight leading-snug line-clamp-2 font-serif text-amber-100">
                    【大师亲授】跨越山海 遇见茶香 | 黔藤古树茶杀青与传统发酵全景通关
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-300 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-3 h-3 text-emerald-300" />
                        <span>12.5万人在看</span>
                      </span>
                      <span>·</span>
                      <span>茶道名师 黔茶小仙 讲授</span>
                    </div>

                    {/* Prominent Course Detail Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(chapters[0]);
                      }}
                      className="px-3 py-1 bg-[#243727] hover:bg-emerald-800 text-white font-extrabold text-[11px] rounded-full shadow-lg transition-all flex items-center gap-1 cursor-pointer border border-emerald-400/30"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-300" />
                      <span>查看课程详情</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
                onClick={() => onShowToast('当前已按综合好评度排序', 'info')}
                className="text-[11px] font-bold text-[#243727] hover:underline flex items-center gap-1"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>综合排序</span>
              </button>
            </div>

            {/* 2-Column Video Cards Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {displayChapters.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-[#243727]/30 transition-all flex flex-col cursor-pointer group"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.coverUrl}
                      alt={item.chapterName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top status tag */}
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

                    {/* Author & Price Tag */}
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

                    {/* Prominent Course Details Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(item);
                      }}
                      className="w-full mt-1.5 py-1.5 bg-[#243727] hover:bg-[#1a281c] text-white text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer active:scale-98"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-300" />
                      <span>查看课程详情</span>
                      <ArrowRight className="w-3 h-3 text-white/80" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* DETAIL MODE: Course Detail View (Matching exact user specification) */
          <div className="relative pb-16">
            
            {/* 1. Hero Video Area */}
            <div className="relative w-full h-56 bg-black overflow-hidden flex flex-col justify-end">
              {/* Background Poster Cover */}
              <img
                src={selectedChapter.coverUrl}
                alt={selectedChapter.chapterName}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isVideoPlaying ? 'opacity-30' : 'opacity-80'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* Video Player overlay when active */}
              {isVideoPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                    <div className="w-12 h-12 rounded-full bg-[#243727] text-white flex items-center justify-center animate-pulse mb-2 shadow-lg">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                    <div className="text-xs font-bold text-white mb-1">正在播放: {currentLesson.title}</div>
                    <div className="text-[10px] text-emerald-300 font-mono">高清 4K 流媒体在线传输</div>

                    {/* Video Player Controls Simulation */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-white text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => setIsVideoPlaying(false)}
                        className="p-1 hover:bg-white/20 rounded"
                      >
                        <Pause className="w-4 h-4 text-white" />
                      </button>
                      <div className="flex-1 bg-neutral-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-[#10b981] h-full w-2/3 rounded-full" />
                      </div>
                      <span>02:45 / {currentLesson.duration}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Hero State Layer before click */
                <div className="relative z-10 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-[#243727]/90 text-white text-[10px] font-bold rounded-full tracking-wider uppercase border border-white/10">
                      {selectedChapter.categoryName}
                    </span>

                    {selectedChapter.isPurchased && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                        ✓ 权限已解封
                      </span>
                    )}
                  </div>

                  <div className="text-base font-extrabold text-white font-serif leading-tight">
                    {selectedChapter.chapterName}
                  </div>

                  {/* Play Central Button */}
                  {selectedChapter.isPurchased ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsVideoPlaying(true);
                        onShowToast(`开始播放: ${currentLesson.title}`, 'info');
                      }}
                      className="mt-2 px-4 py-2 bg-white text-[#243727] font-bold text-xs rounded-full shadow-xl hover:bg-neutral-100 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-[#243727]" />
                      <span>立即播放第1节 ({selectedChapter.lessons[0].duration})</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleOpenPurchase(selectedChapter, e)}
                      className="mt-2 px-4 py-2 bg-[#243727] text-white font-bold text-xs rounded-full shadow-xl hover:bg-[#1a281c] transition-all flex items-center gap-2 cursor-pointer border border-white/20"
                    >
                      <CreditCard className="w-4 h-4 text-emerald-300" />
                      <span>解锁本章节课程 · ¥{selectedChapter.price}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 2. Main Content Scroll View */}
            <div className="p-3.5 space-y-3.5">
              
              {/* Chapter Head Info */}
              <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-1.5">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  CHAPTER · {selectedChapter.categoryName}
                </div>
                <div className="text-lg font-bold text-neutral-900 font-serif">
                  {selectedChapter.chapterName}
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed">
                  {selectedChapter.chapterDescription}
                </div>
                <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-500 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={selectedChapter.authorAvatar}
                      alt={selectedChapter.authorName}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="font-semibold text-neutral-700">{selectedChapter.authorName}</span>
                  </div>
                  <span>·</span>
                  <span>{selectedChapter.students} 人正在学习</span>
                </div>
              </div>

              {/* Progress Card (When Purchased) */}
              {selectedChapter.isPurchased ? (
                <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        PROGRESS · 学习进度
                      </div>
                      <div className="text-3xl font-black text-[#243727] font-mono leading-none mt-1">
                        {learningProgress}%
                      </div>
                    </div>

                    <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>已获得 50 积分</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#243727] h-full rounded-full transition-all duration-500"
                      style={{ width: `${learningProgress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-neutral-600 font-mono">
                    <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-100 flex justify-between items-center">
                      <span className="text-neutral-400">已观看</span>
                      <span className="font-bold text-neutral-900">09分45秒</span>
                    </div>
                    <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-100 flex justify-between items-center">
                      <span className="text-neutral-400">总时长</span>
                      <span className="font-bold text-neutral-900">{selectedChapter.duration}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Purchase Card (When Not Purchased) */
                <div className="bg-gradient-to-br from-[#F5EFE6] via-white to-white rounded-2xl p-4 border border-[#E5D5C0] shadow-2xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                        PREMIUM · 付费章节
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-sm font-bold text-[#243727]">¥</span>
                        <span className="text-2xl font-black text-[#243727] font-mono">
                          {selectedChapter.price}
                        </span>
                        {selectedChapter.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through ml-1">
                            ¥{selectedChapter.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded">
                      含 {selectedChapter.lessons.length} 节完整课时
                    </span>
                  </div>

                  <div className="text-xs text-neutral-600 leading-snug">
                    购买本章节后，所有 {selectedChapter.lessons.length} 个课时均可永久无限回看学习。
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={(e) => handleOpenPurchase(selectedChapter, e)}
                      className="flex-1 py-2.5 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>立即购买 (¥{selectedChapter.price})</span>
                    </button>

                    {selectedChapter.isPointsExchange && selectedChapter.pointsPrice > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          setPaymentType('points');
                          handleOpenPurchase(selectedChapter, e);
                        }}
                        className="px-3.5 py-2.5 bg-white hover:bg-neutral-50 text-[#243727] font-bold text-xs rounded-full border border-neutral-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Coins className="w-3.5 h-3.5 text-amber-600" />
                        <span>{selectedChapter.pointsPrice} 积分兑换</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Lessons Section */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-black text-neutral-900 tracking-tight">
                      课时列表
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 font-mono">
                      LESSONS · {selectedChapter.lessons.length}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400">点击卡片切换课时</span>
                </div>

                {/* Lesson Cards 2-Column Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {selectedChapter.lessons.map((lesson, idx) => {
                    const isActive = lesson.id === selectedLessonId;
                    const lessonCover = lesson.coverUrl || selectedChapter.coverUrl;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleSelectLesson(lesson)}
                        className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col bg-white shadow-2xs ${
                          isActive
                            ? 'border-[#243727] ring-2 ring-[#243727]/20 shadow-md'
                            : 'border-neutral-200/80 hover:border-neutral-300 hover:shadow-xs'
                        }`}
                      >
                        {/* Cover Image Header with Badges */}
                        <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900 shrink-0">
                          <img
                            src={lessonCover}
                            alt={lesson.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                            <span className="px-1.5 py-0.5 bg-black/60 text-white text-[9px] font-black font-mono rounded backdrop-blur-xs">
                              0{idx + 1}
                            </span>

                            {isActive ? (
                              <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[8px] font-bold rounded backdrop-blur-xs flex items-center gap-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                播放中
                              </span>
                            ) : selectedChapter.isPurchased ? (
                              <span className="px-1.5 py-0.5 bg-[#243727]/90 text-white text-[8px] font-bold rounded backdrop-blur-xs">
                                已解锁
                              </span>
                            ) : lesson.isFree ? (
                              <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[8px] font-bold rounded backdrop-blur-xs">
                                免费试看
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 bg-black/70 text-neutral-300 text-[8px] font-bold rounded backdrop-blur-xs flex items-center gap-0.5">
                                <Lock className="w-2 h-2" />
                                需解锁
                              </span>
                            )}
                          </div>

                          {/* Center Play Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                              isActive
                                ? 'bg-emerald-500 text-white scale-110 shadow-lg'
                                : 'bg-black/40 text-white group-hover:scale-110 group-hover:bg-black/60'
                            }`}>
                              {isActive ? (
                                <Pause className="w-4 h-4 fill-white" />
                              ) : (
                                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                              )}
                            </div>
                          </div>

                          {/* Bottom Right Duration */}
                          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.2 bg-black/70 text-white/90 text-[9px] font-mono rounded backdrop-blur-xs">
                            {lesson.duration}
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-2 flex-1 flex flex-col justify-between space-y-1.5">
                          <div className={`text-xs font-bold leading-snug line-clamp-2 ${
                            isActive ? 'text-[#243727]' : 'text-neutral-900 group-hover:text-[#243727]'
                          }`}>
                            {lesson.title}
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px]">
                            <span className="text-neutral-400 font-mono text-[9px]">
                              第{idx + 1}节 · {lesson.date}
                            </span>

                            {isActive ? (
                              <span className="font-extrabold text-emerald-600 text-[10px] flex items-center gap-0.5">
                                播放中
                              </span>
                            ) : (
                              <span className="text-neutral-500 font-medium text-[10px] group-hover:text-[#243727] flex items-center gap-0.5">
                                观看 <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Purchase Modal Bottom Sheet */}
      <AnimatePresence>
        {showPurchaseModal && modalChapter && (
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
                    {modalChapter.chapterName}
                  </div>
                  <div className="text-xs text-neutral-500 line-clamp-1">
                    {modalChapter.chapterDescription}
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
                      <div className="text-xs font-bold text-neutral-900">微信/现金支付</div>
                      <div className="text-[10px] text-neutral-500">即时开通 · 永久无限回看</div>
                    </div>
                  </div>

                  <div className="text-sm font-black font-mono text-[#243727]">
                    ¥{modalChapter.price}
                  </div>
                </div>

                {/* Points Option */}
                {modalChapter.isPointsExchange && modalChapter.pointsPrice > 0 && (
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
                      {modalChapter.pointsPrice} 积分
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
                <span>{paymentType === 'cash' ? `确认支付开通 (¥${modalChapter.price})` : `确认 ${modalChapter.pointsPrice} 积分兑换`}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
