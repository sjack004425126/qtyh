import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Copy,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  X,
  CreditCard,
  Coins,
  GraduationCap,
  PlayCircle,
  Award,
  Users,
  Check,
  Tag,
  ArrowRight
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
    chapterDescription: '黔藤黑茶工序与杀青工艺深度解析：从鲜叶采摘至渥堆发酵核心要素',
    categoryName: '基础茶道',
    students: 1280,
    chapterType: 1,
    isPaid: false,
    price: '0.00',
    pointsPrice: 0,
    isPointsExchange: false,
    isPurchased: true,
    tags: ['杀青工艺', '黑茶制作', '传统烘焙']
  },
  {
    id: 'chap-102',
    indexLabel: '02',
    chapterName: '冲泡手法进阶',
    chapterDescription: '盖碗抱壶与注水姿态标准规范：水温、注水线与浸泡时间的精准协同',
    categoryName: '基础茶道',
    students: 850,
    chapterType: 1,
    isPaid: true,
    price: '29.00',
    pointsPrice: 290,
    isPointsExchange: true,
    isPurchased: true,
    tags: ['盖碗冲泡', '姿态标准', '水温把控']
  },
  {
    id: 'chap-103',
    indexLabel: '03',
    chapterName: '金丝皇菊评鉴',
    chapterDescription: '古树金丝皇菊品饮与生津感官训练：汤色评估、菊香分层与口感回甘',
    categoryName: '花草品鉴',
    students: 620,
    chapterType: 1,
    isPaid: true,
    price: '49.00',
    pointsPrice: 490,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['感官评茶', '皇菊品鉴', '香气辨识']
  },
  {
    id: 'chap-104',
    indexLabel: '04',
    chapterName: '茶席美学设计',
    chapterDescription: '茶席置景美学与空间气韵营造：茶具搭配、花艺配饰与光影质感',
    categoryName: '茶艺美学',
    students: 410,
    chapterType: 1,
    isPaid: true,
    price: '68.00',
    pointsPrice: 680,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['茶席美学', '插花配饰', '空间氛围']
  },
  {
    id: 'chap-201',
    indexLabel: '05',
    chapterName: '风味轮辨识',
    chapterDescription: '高级评茶师风味轮与瑕疵辨识：酸败、仓味、焦糊味的成因与判定',
    categoryName: '进阶品鉴',
    students: 320,
    chapterType: 2,
    isPaid: true,
    price: '128.00',
    pointsPrice: 1280,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['风味轮', '瑕疵辨识', '盲品训练']
  },
  {
    id: 'chap-202',
    indexLabel: '06',
    chapterName: '老茶窖藏醇化',
    chapterDescription: '老茶窖藏醇化与环境温湿度调控：微生物菌群代谢对后期品质影响',
    categoryName: '进阶仓储',
    students: 210,
    chapterType: 2,
    isPaid: true,
    price: '168.00',
    pointsPrice: 1680,
    isPointsExchange: true,
    isPurchased: false,
    tags: ['老茶仓储', '陈化调控', '微生物菌群']
  }
];

// Complete Redesigned WeChat Mini Program Source Code
const MINI_PROGRAM_CODE = {
  wxml: `<top-message id="top-message"></top-message>

<view class="page">
  <view class="container">

    <!-- ==================== 1. 顶部导航栏与分类切换 ==================== -->
    <top-navbar
      title="精选课程"
      tabs="{{navTabs}}"
      activeIndex="{{currentTab}}"
      bind:tabchange="onTabChange"
      bind:searchtap="onSearchTap"
    />

    <!-- ==================== 2. 在线报名入口卡片 ==================== -->
    <view class="enroll-entry" bindtap="onEnrollTap">
      <view class="enroll-entry-text">
        <text class="enroll-entry-eyebrow">OFFLINE · 线下茶学体验</text>
        <text class="enroll-entry-title">在线报名与茶会预约</text>
      </view>
      <view class="enroll-entry-arrow">
        <text class="enroll-entry-arrow-text">→</text>
      </view>
    </view>

    <!-- ==================== 3. 主内容滚动区 ==================== -->
    <scroll-view
      scroll-y
      class="main-content"
      enhanced
      show-scrollbar="{{false}}"
    >
      <!-- 章节标头 -->
      <view class="section-head">
        <view class="section-head-left">
          <text class="section-title">章节课程</text>
          <text class="section-sub">CHAPTERS · {{displayChapters.length}}</text>
        </view>
        <view class="section-action" bindtap="onFilterTap">
          <text class="section-action-text">筛选</text>
        </view>
      </view>

      <!-- 课程卡片列表 -->
      <view class="course-list">
        <view
          class="course-card"
          wx:for="{{displayChapters}}"
          wx:key="id"
          bindtap="onChapterTap"
          data-chapter="{{item}}"
        >
          <!-- 左侧 CH 编号区 -->
          <view class="course-num">
            <text class="course-num-label">CH</text>
            <text class="course-num-value">{{item.indexLabel}}</text>
          </view>

          <!-- 1px 细分割线 -->
          <view class="course-divider"></view>

          <!-- 右侧主信息区 -->
          <view class="course-main">
            <!-- 类别 Tag与已购状态 -->
            <view class="course-tags">
              <view class="course-tag">
                <text class="course-tag-text">{{item.chapter_name}}</text>
              </view>
              <view class="course-status course-status--owned" wx:if="{{item.is_purchased}}">
                <text class="course-status-text">已购</text>
              </view>
            </view>

            <!-- 课程描述/标题 -->
            <text class="course-title">{{item.chapter_description}}</text>

            <!-- 标签列表 -->
            <view class="course-chip-list" wx:if="{{item.tags && item.tags.length > 0}}">
              <view class="course-chip" wx:for="{{item.tags}}" wx:key="*this" wx:for-item="tag">
                <text class="course-chip-text">{{tag}}</text>
              </view>
            </view>

            <!-- 底部价格与操作按钮 -->
            <view class="course-footer">
              <view class="course-price-wrap">
                <!-- 免费 -->
                <view class="course-price course-price--free" wx:if="{{!item.is_paid}}">
                  <text class="course-price-text">免费学习</text>
                </view>
                <!-- 已购买 -->
                <view class="course-price course-price--owned" wx:elif="{{item.is_purchased}}">
                  <text class="course-price-text">去学习</text>
                </view>
                <!-- 付费未购买 -->
                <view class="course-price" wx:else>
                  <text class="course-price-symbol">¥</text>
                  <text class="course-price-value">{{item.price}}</text>
                  <text class="course-price-divider" wx:if="{{item.is_points_exchange && item.points_price > 0}}">·</text>
                  <text class="course-price-points" wx:if="{{item.is_points_exchange && item.points_price > 0}}">{{item.points_price}}积分</text>
                </view>
                <text class="course-students">已有 {{item.students || 0}} 人在学</text>
              </view>

              <!-- CTA 按钮 -->
              <view
                class="course-cta course-cta--ghost"
                wx:if="{{!item.is_paid || item.is_purchased}}"
                catchtap="onChapterTap"
                data-chapter="{{item}}"
              >
                <text class="course-cta-text">去学习</text>
              </view>
              <view
                class="course-cta"
                wx:else
                catchtap="showPurchasePopup"
                data-chapter="{{item}}"
              >
                <text class="course-cta-text">购买</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" wx:if="{{displayChapters.length === 0}}">
        <text class="empty-icon">∅</text>
        <text class="empty-title">该分类下暂无课程</text>
        <text class="empty-desc">请切换其他分类查看</text>
      </view>

      <view class="safe-bottom"></view>
    </scroll-view>

  </view>
</view>

<!-- ==================== 4. 购买弹窗层 ==================== -->
<view class="purchase-modal" wx:if="{{showPurchaseModal}}" catchtap="closePurchaseModal">
  <view class="purchase-sheet" catchtap="stopPropagation">
    <view class="purchase-handle"></view>
    <view class="purchase-header">
      <view class="purchase-header-text">
        <text class="purchase-eyebrow">CHAPTER · 章节开通</text>
        <text class="purchase-title">{{selectedChapter.chapter_name}}</text>
        <text class="purchase-desc" wx:if="{{selectedChapter.chapter_description}}">{{selectedChapter.chapter_description}}</text>
      </view>
      <view class="purchase-close" catchtap="closePurchaseModal">
        <text class="purchase-close-icon">×</text>
      </view>
    </view>

    <view class="purchase-options">
      <!-- 现金支付选项 -->
      <view
        class="purchase-option {{paymentType === 'cash' ? 'purchase-option--active' : ''}}"
        catchtap="onSelectPaymentType"
        data-type="cash"
      >
        <view class="purchase-radio">
          <view class="purchase-radio-dot" wx:if="{{paymentType === 'cash'}}"></view>
        </view>
        <view class="purchase-option-info">
          <text class="purchase-option-label">现金支付</text>
          <text class="purchase-option-sub">即时开通 · 永久回看</text>
        </view>
        <text class="purchase-option-amount">¥{{selectedChapter.price}}</text>
      </view>

      <!-- 积分兑换选项 -->
      <view
        class="purchase-option {{paymentType === 'points' ? 'purchase-option--active' : ''}} {{!canPointsExchange ? 'purchase-option--disabled' : ''}}"
        wx:if="{{selectedChapter.is_points_exchange && selectedChapter.points_price > 0}}"
        catchtap="onSelectPaymentType"
        data-type="points"
      >
        <view class="purchase-radio">
          <view class="purchase-radio-dot" wx:if="{{paymentType === 'points'}}"></view>
        </view>
        <view class="purchase-option-info">
          <text class="purchase-option-label">积分兑换</text>
          <text class="purchase-option-sub">{{canPointsExchange ? '当前积分 ' + userPoints : '积分不足 (当前 ' + userPoints + ')'}}</text>
        </view>
        <text class="purchase-option-amount">{{selectedChapter.points_price}} 积分</text>
      </view>
    </view>

    <view class="purchase-cta" catchtap="confirmPurchase">
      <text class="purchase-cta-text">{{paymentType === 'cash' ? '立即支付' : '立即兑换'}}</text>
    </view>
  </view>
</view>`,

  wxss: `/* ===================================================
   course.wxss (黔藤绿 #243727 雅致视觉)
   =================================================== */

page {
  background-color: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

.page {
  min-height: 100vh;
  background-color: #F8F9FA;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ================= 在线报名入口 ================= */
.enroll-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24rpx 24rpx 0;
  padding: 28rpx 32rpx;
  background: #FFFFFF;
  border: 1rpx solid #E5E5E5;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
  transition: opacity 0.2s ease;
}

.enroll-entry:active {
  opacity: 0.85;
}

.enroll-entry-text {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.enroll-entry-eyebrow {
  font-size: 20rpx;
  font-weight: 600;
  color: #8C8C8C;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.enroll-entry-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #243727;
  letter-spacing: -0.01em;
}

.enroll-entry-arrow {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #243727;
  border-radius: 50%;
  flex-shrink: 0;
}

.enroll-entry-arrow-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 600;
  line-height: 1;
}

/* ================= 主内容 ================= */
.main-content {
  flex: 1;
  padding: 24rpx 24rpx 0;
  box-sizing: border-box;
}

.safe-bottom {
  height: 160rpx;
}

/* 段标题 */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0 20rpx;
}

.section-head-left {
  display: flex;
  align-items: baseline;
  gap: 14rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 800;
  color: #171717;
  letter-spacing: -0.01em;
}

.section-sub {
  font-size: 20rpx;
  color: #8C8C8C;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.section-action {
  padding: 8rpx 24rpx;
  border-radius: 30rpx;
  border: 1rpx solid #D9D9D9;
  background: #FFFFFF;
}

.section-action:active {
  background: #F0F0F0;
}

.section-action-text {
  font-size: 22rpx;
  color: #243727;
  font-weight: 600;
}

/* 课程列表 */
.course-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

/* 课程卡片 */
.course-card {
  display: flex;
  align-items: stretch;
  padding: 28rpx 28rpx;
  background: #FFFFFF;
  border: 1rpx solid #E5E5E5;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease;
}

.course-card:active {
  transform: scale(0.99);
}

.course-num {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 80rpx;
  padding-right: 16rpx;
  flex-shrink: 0;
}

.course-num-label {
  font-size: 18rpx;
  font-weight: 700;
  color: #8C8C8C;
  letter-spacing: 0.2em;
}

.course-num-value {
  font-size: 48rpx;
  font-weight: 900;
  color: #243727;
  line-height: 1;
  font-family: "DIN Alternate", sans-serif;
}

.course-divider {
  width: 1rpx;
  background: #F0F0F0;
  margin: 0 20rpx 0 8rpx;
  flex-shrink: 0;
}

.course-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  min-width: 0;
}

.course-tags {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex-wrap: wrap;
}

.course-tag {
  display: inline-flex;
  align-items: center;
  padding: 4rpx 16rpx;
  background: #F5F6F8;
  border-radius: 20rpx;
}

.course-tag-text {
  font-size: 20rpx;
  color: #595959;
  font-weight: 600;
}

.course-status {
  padding: 2rpx 12rpx;
  border-radius: 20rpx;
  font-size: 18rpx;
  font-weight: 700;
}

.course-status--owned {
  background: #243727;
  color: #FFFFFF;
}

.course-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #171717;
  line-height: 1.4;
}

.course-chip-list {
  display: flex;
  gap: 10rpx;
  flex-wrap: wrap;
}

.course-chip {
  padding: 2rpx 12rpx;
  background: #FAFAFA;
  border: 1rpx solid #E8E8E8;
  border-radius: 12rpx;
}

.course-chip-text {
  font-size: 18rpx;
  color: #8C8C8C;
}

.course-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8rpx;
}

.course-price-wrap {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.course-price {
  display: flex;
  align-items: baseline;
  gap: 2rpx;
  color: #243727;
}

.course-price--free {
  background: #EBE8DF;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.course-price--free .course-price-text {
  font-size: 20rpx;
  color: #243727;
  font-weight: 700;
}

.course-price--owned {
  background: #F5EFE6;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.course-price--owned .course-price-text {
  font-size: 20rpx;
  color: #243727;
  font-weight: 700;
}

.course-price-symbol {
  font-size: 22rpx;
  font-weight: 700;
}

.course-price-value {
  font-size: 36rpx;
  font-weight: 900;
  font-family: "DIN Alternate", monospace;
  line-height: 1;
}

.course-price-divider {
  font-size: 20rpx;
  color: #BFBFBF;
  margin: 0 4rpx;
}

.course-price-points {
  font-size: 22rpx;
  color: #595959;
  font-weight: 600;
}

.course-students {
  font-size: 18rpx;
  color: #BFBFBF;
}

.course-cta {
  padding: 12rpx 28rpx;
  background: #243727;
  border-radius: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(36, 55, 39, 0.2);
}

.course-cta--ghost {
  background: transparent;
  border: 1rpx solid #243727;
  box-shadow: none;
}

.course-cta-text {
  font-size: 22rpx;
  color: #FFFFFF;
  font-weight: 700;
}

.course-cta--ghost .course-cta-text {
  color: #243727;
}

/* ================= 购买弹窗 ================= */
.purchase-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

.purchase-sheet {
  width: 100%;
  background: #FFFFFF;
  border-radius: 36rpx 36rpx 0 0;
  padding: 20rpx 40rpx 60rpx;
  box-sizing: border-box;
}

.purchase-handle {
  width: 60rpx;
  height: 6rpx;
  background: #D9D9D9;
  border-radius: 3rpx;
  margin: 0 auto 24rpx;
}

.purchase-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28rpx;
}

.purchase-eyebrow {
  font-size: 20rpx;
  font-weight: 600;
  color: #8C8C8C;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.purchase-title {
  font-size: 34rpx;
  font-weight: 800;
  color: #171717;
  display: block;
}

.purchase-desc {
  font-size: 22rpx;
  color: #595959;
  margin-top: 6rpx;
  display: block;
}

.purchase-close {
  font-size: 40rpx;
  color: #BFBFBF;
  line-height: 1;
}

.purchase-options {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.purchase-option {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx 28rpx;
  border: 1rpx solid #E5E5E5;
  border-radius: 20rpx;
  background: #FFFFFF;
}

.purchase-option--active {
  border-color: #243727;
  background: #F5EFE6;
}

.purchase-radio {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #BFBFBF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.purchase-option--active .purchase-radio {
  border-color: #243727;
}

.purchase-radio-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #243727;
}

.purchase-option-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.purchase-option-label {
  font-size: 26rpx;
  font-weight: 700;
  color: #171717;
}

.purchase-option-sub {
  font-size: 20rpx;
  color: #8C8C8C;
}

.purchase-option-amount {
  font-size: 32rpx;
  font-weight: 800;
  color: #243727;
  font-family: "DIN Alternate", monospace;
}

.purchase-cta {
  height: 88rpx;
  background: #243727;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(36, 55, 39, 0.25);
}

.purchase-cta-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: 0.1em;
}`,

  js: `const { createPage } = require('../../utils/page-mixin');
const { get, tokenGet, tokenPost } = require('../../utils/request');

createPage({
  data: {
    navTabs: [
      { name: '基础课程', sub: 'BASIC' },
      { name: '进阶课程', sub: 'ADVANCED' }
    ],
    currentTab: 0,
    allChapters: [],
    displayChapters: [],
    isLoggedIn: false,
    userPoints: 520,

    showPurchaseModal: false,
    selectedChapter: null,
    paymentType: 'cash',
    canPointsExchange: true
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({ isLoggedIn: !!(userInfo && userInfo.accessToken) });
    this.loadCourseData();
  },

  async loadCourseData() {
    try {
      const response = await get('/course/home/categories-with-courses');
      if (response) {
        // 解析章节列表数据...
      }
    } catch (error) {
      console.error('加载课程失败:', error);
    }
  },

  onTabChange(e) {
    const index = e.detail ? e.detail.index : e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    this.filterChaptersByTab();
  },

  showPurchasePopup(e) {
    const chapter = e.currentTarget.dataset.chapter;
    this.setData({
      selectedChapter: chapter,
      showPurchaseModal: true,
      paymentType: 'cash'
    });
  },

  closePurchaseModal() {
    this.setData({ showPurchaseModal: false, selectedChapter: null });
  },

  confirmPurchase() {
    wx.showToast({ title: '已发起订单处理', icon: 'success' });
    this.closePurchaseModal();
  }
});`,

  json: `{
  "navigationBarTitleText": "精选课程",
  "navigationBarBackgroundColor": "#FFFFFF",
  "navigationBarTextStyle": "black",
  "enablePullDownRefresh": false,
  "usingComponents": {
    "top-navbar": "../../components/top-navbar/top-navbar",
    "top-message": "../../components/top-message/top-message",
    "floating-service": "../../components/floating-service/floating-service"
  }
}`
};

export const CoursePage: React.FC<CoursePageProps> = ({ onShowToast }) => {
  const [currentTab, setCurrentTab] = useState<0 | 1>(0); // 0: 基础课程, 1: 进阶课程
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

  // Filtered chapters for live view
  const displayChapters = chapters.filter((item) =>
    currentTab === 0 ? item.chapterType === 1 : item.chapterType === 2
  );

  const handleCopyCode = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    onShowToast(`已复制 ${tab.toUpperCase()} 代码到剪贴板`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleChapterClick = (chapter: ChapterItem) => {
    if (!chapter.isPaid || chapter.isPurchased) {
      onShowToast(`开启学习: ${chapter.chapterName}`, 'info');
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
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-200/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#243727]" />
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            茶学在线课程
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
          <span>{showCodeView ? '返回预览' : '小程序源码'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showCodeView ? (
          /* Mini Program Code Drawer Mode */
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">
                  小程序课程首页代码 (WeChat Mini Program)
                </div>
                <div className="text-[11px] text-neutral-500">
                  Stitch Qián Téng 雅致美学 · 包含完整导航、卡片与购买弹层
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
          /* Live UI Preview Mode */
          <>
            {/* 1. Category Tabs Switcher (Top Navbar Tabs) */}
            <div className="bg-white rounded-2xl p-1.5 border border-neutral-200/80 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-1 flex-1">
                <button
                  type="button"
                  onClick={() => setCurrentTab(0)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    currentTab === 0
                      ? 'bg-[#243727] text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>基础课程</span>
                  <span className="text-[10px] opacity-70 font-mono">BASIC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentTab(1)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    currentTab === 1
                      ? 'bg-[#243727] text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>进阶课程</span>
                  <span className="text-[10px] opacity-70 font-mono">ADVANCED</span>
                </button>
              </div>

              <div className="flex items-center gap-1 pl-2 border-l border-neutral-100">
                <button
                  type="button"
                  onClick={() => onShowToast('开启课程搜寻模式', 'info')}
                  className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="搜索"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Offline Event Enrollment Entry Card */}
            <div
              onClick={() => onShowToast('即将跳转线下活动报名页', 'info')}
              className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <span>OFFLINE · 线下茶学体验</span>
                </div>
                <div className="text-sm font-bold text-[#243727] tracking-tight">
                  在线报名与线下茶会预约
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#243727] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* 3. Section Title Header */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-black text-neutral-900 tracking-tight">
                  章节课程列表
                </span>
                <span className="text-[10px] font-bold text-neutral-400 font-mono">
                  CHAPTERS · {displayChapters.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onShowToast('筛选偏好设置', 'info')}
                className="px-2.5 py-1 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-full text-[11px] font-bold text-[#243727] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Filter className="w-3 h-3" />
                <span>筛选</span>
              </button>
            </div>

            {/* 4. Course Cards List */}
            <div className="space-y-3">
              {displayChapters.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleChapterClick(item)}
                  className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs hover:border-[#243727]/30 transition-all flex items-stretch gap-3 cursor-pointer group"
                >
                  {/* Left CH Number */}
                  <div className="flex flex-col items-start justify-start shrink-0 pr-1">
                    <span className="text-[10px] font-bold text-neutral-400 tracking-widest">
                      CH
                    </span>
                    <span className="text-2xl font-black font-mono text-[#243727] leading-none">
                      {item.indexLabel}
                    </span>
                  </div>

                  {/* 1px Vertical Divider */}
                  <div className="w-[1px] bg-neutral-100 shrink-0" />

                  {/* Right Main Info */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-[10px] font-bold text-neutral-600">
                          {item.chapterName}
                        </span>
                        {item.isPurchased && (
                          <span className="px-2 py-0.5 bg-[#243727] text-white rounded-full text-[10px] font-bold flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            <span>已购</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{item.students}人在学</span>
                      </span>
                    </div>

                    {/* Chapter Title & Description */}
                    <div className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2">
                      {item.chapterDescription}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-neutral-50 border border-neutral-100 text-neutral-500 text-[10px] rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer: Price & CTA */}
                    <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                      <div>
                        {!item.isPaid ? (
                          <span className="px-2.5 py-1 bg-[#EBE8DF] text-[#243727] font-bold text-[11px] rounded-full">
                            免费学习
                          </span>
                        ) : item.isPurchased ? (
                          <span className="px-2.5 py-1 bg-[#F5EFE6] text-[#243727] font-bold text-[11px] rounded-full">
                            去学习
                          </span>
                        ) : (
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs font-bold text-[#243727]">¥</span>
                            <span className="text-base font-black font-mono text-[#243727]">
                              {item.price}
                            </span>
                            {item.isPointsExchange && item.pointsPrice > 0 && (
                              <span className="text-[10px] text-neutral-400">
                                · {item.pointsPrice}积分
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {!item.isPaid || item.isPurchased ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChapterClick(item);
                          }}
                          className="px-3.5 py-1.5 border border-[#243727] text-[#243727] hover:bg-[#243727] hover:text-white rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>去学习</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedChapter(item);
                            setShowPurchaseModal(true);
                          }}
                          className="px-3.5 py-1.5 bg-[#243727] hover:bg-[#1a281c] text-white rounded-full text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>购买</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Purchase Modal */}
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
                    CHAPTER · 章节开通
                  </div>
                  <div className="text-base font-bold text-neutral-900">
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
                      <div className="text-[10px] text-neutral-500">即时开通 · 永久回看</div>
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
                className="w-full py-3 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer"
              >
                {paymentType === 'cash' ? '确认支付开通' : '确认积分兑换'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
