import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Play,
  X,
  ChevronRight,
  Plus,
  Check,
  AlertCircle,
  FileVideo,
  Sparkles,
  CheckCircle2,
  Video,
  Eye,
  Heart,
  Trash2,
  Code2,
  Copy,
  Coins,
  ShieldCheck,
  Tag,
  Clock,
  Filter,
  FileText
} from 'lucide-react';

export type VideoStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'quoted' | 'purchased';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
  duration: string;
  status: 'pending' | 'approved' | 'rejected' | 'quoted' | 'purchased';
  statusText: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  purchasePrice?: number;
  purchaseDate?: string;
  rejectReason?: string;
  categoryName: string;
  tags: string[];
}

interface VideoUploadPageProps {
  onBack?: () => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-001',
    title: '黔藤黑茶手工杀青与揉捻传统工艺全记录',
    description: '深入黔东南高山茶园，记录老茶农手工杀青、揉捻与日光干燥的完整工序细节。',
    coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '00:58',
    status: 'quoted',
    statusText: '报价中',
    viewCount: 1420,
    likeCount: 388,
    createdAt: '2026-07-24',
    purchasePrice: 2800,
    categoryName: '茶饮文化',
    tags: ['手工杀青', '黑茶制作', '非遗技艺']
  },
  {
    id: 'vid-002',
    title: '古树金丝皇菊开水注水冲泡生津实拍',
    description: '95℃沸水悬壶高冲，展示金丝皇菊在盖碗中缓缓绽放的唯美视觉体验。',
    coverUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '00:42',
    status: 'approved',
    statusText: '已通过',
    viewCount: 2890,
    likeCount: 612,
    createdAt: '2026-07-22',
    categoryName: '技能教学',
    tags: ['金丝皇菊', '高冲注水', '盖碗美学']
  },
  {
    id: 'vid-003',
    title: '黔东南高山茶园云海日出与晨露采茶',
    description: '清晨6点海拔1200米茶山云海交织，茶农采摘一芽一叶的自然晨光摄影。',
    coverUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '00:50',
    status: 'purchased',
    statusText: '已收购',
    viewCount: 5630,
    likeCount: 1240,
    createdAt: '2026-07-18',
    purchasePrice: 3500,
    purchaseDate: '2026-07-20',
    categoryName: '生活记录',
    tags: ['茶山风光', '云海日出', '原生态']
  },
  {
    id: 'vid-004',
    title: '新中式茶席置景与插花配色干货小课',
    description: '利用竹木茶盘与四季花草打造禅意茶席，营造静谧的品饮空间美学氛围。',
    coverUrl: 'https://images.unsplash.com/photo-1563822249510-096eedc23d46?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '00:36',
    status: 'pending',
    statusText: '审核中',
    viewCount: 0,
    likeCount: 0,
    createdAt: '2026-07-25',
    categoryName: '技能教学',
    tags: ['茶席置景', '插花艺术', '禅意美学']
  },
  {
    id: 'vid-005',
    title: '老茶仓储温湿度调控技巧误区辨析',
    description: '讲解老茶窖藏过程中避免仓味与过度潮解的核心关键参数判定。',
    coverUrl: 'https://images.unsplash.com/photo-1571934811356-5cc531a6891e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '00:45',
    status: 'rejected',
    statusText: '已拒绝',
    rejectReason: '画质清晰度未达到1080P标准，视频背景杂音较大',
    viewCount: 0,
    likeCount: 0,
    createdAt: '2026-07-15',
    categoryName: '经验分享',
    tags: ['老茶仓储', '品质调控', '避坑指南']
  }
];

const CATEGORIES = [
  { id: '1', name: '茶饮文化' },
  { id: '2', name: '技能教学' },
  { id: '3', name: '生活记录' },
  { id: '4', name: '品牌宣介' },
  { id: '5', name: '经验分享' },
  { id: '6', name: '其他' }
];

// Complete Redesigned WeChat Mini Program Source Code
const MINI_PROGRAM_CODE = {
  wxml: `<top-message id="top-message"></top-message>

<view class="container">
  <!-- 1. 页面顶部标题与投稿按钮 -->
  <view class="page-header">
    <view class="header-row">
      <view class="header-left">
        <text class="page-title">我的作品</text>
        <text class="page-sub">MY WORKS · {{total}}</text>
      </view>
      <view class="upload-btn" bindtap="showUploadModal">
        <view class="upload-plus"></view>
        <text class="upload-text">投稿</text>
      </view>
    </view>
  </view>

  <!-- 2. 状态筛选 Tabs 选项卡 -->
  <view class="status-tabs-wrapper">
    <scroll-view scroll-x class="tabs-scroll" enhanced show-scrollbar="{{false}}">
      <view class="tabs">
        <view
          wx:for="{{tabList}}"
          wx:key="status"
          class="tab {{currentTab === index ? 'tab-active' : ''}}"
          data-index="{{index}}"
          bindtap="onTabChange"
        >
          <text>{{item.name}}</text>
        </view>
      </view>
    </scroll-view>
  </view>

  <!-- 3. 视频卡片滚动列表区 -->
  <scroll-view scroll-y class="list" bindscrolltolower="onReachBottom" lower-threshold="200">

    <!-- 空状态 -->
    <view class="empty" wx:if="{{!isLoading && videoList.length === 0}}">
      <view class="empty-icon-wrap">
        <view class="empty-icon-box">
          <view class="empty-icon-tri"></view>
        </view>
      </view>
      <text class="empty-title">暂无作品数据</text>
      <text class="empty-desc">点击右上角「投稿」上传你的原创短视频作品</text>
      <view class="empty-btn" bindtap="showUploadModal">
        <text>立即投稿</text>
      </view>
    </view>

    <!-- 卡片列表 -->
    <view class="video-card" wx:for="{{videoList}}" wx:key="id">

      <!-- 视频封面区 -->
      <view class="cover" bindtap="viewVideoDetail" data-video="{{item}}">
        <image src="{{item.cover_url}}" class="cover-img" mode="aspectFill" />
        <view class="cover-mask"></view>

        <!-- 播放标识 -->
        <view class="play-badge">
          <view class="play-triangle"></view>
        </view>

        <!-- 视频时长 -->
        <view class="duration">
          <text>{{item.duration}}</text>
        </view>

        <!-- 状态标签 -->
        <view class="status-tag status-{{item.status}}">
          <text>{{item.status_text}}</text>
        </view>
      </view>

      <!-- 卡片信息区 -->
      <view class="info">
        <text class="title">{{item.title}}</text>

        <view class="stats">
          <view class="stat-item">
            <view class="stat-icon-eye"></view>
            <text class="stat-num">{{item.view_count}}</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <view class="stat-icon-heart"></view>
            <text class="stat-num">{{item.like_count}}</text>
          </view>
          <text class="created">{{item.created_at}}</text>
        </view>

        <!-- 报价中提示框 -->
        <view class="quote-box" wx:if="{{item.status === 'quoted'}}">
          <view class="quote-info">
            <text class="quote-label">平台收购报价</text>
            <text class="quote-price">{{item.purchase_price}} 积分</text>
          </view>
          <view class="quote-btn" catchtap="agreePurchase" data-video="{{item}}">
            <text>同意收购</text>
          </view>
        </view>

        <!-- 已收购提示框 -->
        <view class="purchased-box" wx:if="{{item.status === 'purchased'}}">
          <text class="purchased-label">著作权已转让</text>
          <text class="purchased-price">+{{item.purchase_price}} 积分</text>
          <text class="purchased-date">{{item.purchase_date}}</text>
        </view>

        <!-- 操作按钮组 -->
        <view class="actions">
          <view class="action view" bindtap="viewVideoDetail" data-video="{{item}}">
            <text>查看详情</text>
          </view>
          <view class="action delete" catchtap="deleteVideo" data-video="{{item}}" wx:if="{{item.status !== 'purchased'}}">
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>

  </scroll-view>
</view>`,

  wxss: `/* ===================================================
   manage.wxss (Stitch Qián Téng 雅致美学 · 视频管理)
   =================================================== */

page {
  background: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #F8F9FA;
}

.page-header {
  padding: 16rpx 0 0;
  background: #F8F9FA;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 32rpx 20rpx;
}

.page-title {
  font-size: 36rpx;
  font-weight: 800;
  color: #171717;
  letter-spacing: -0.01em;
}

.page-sub {
  font-size: 18rpx;
  font-weight: 700;
  color: #8C8C8C;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 10rpx;
  background: #243727;
  color: #ffffff;
  border-radius: 40rpx;
  padding: 14rpx 32rpx;
  box-shadow: 0 6rpx 18rpx rgba(36, 55, 39, 0.25);
}

.upload-text {
  font-size: 26rpx;
  font-weight: 700;
}

/* Tabs */
.status-tabs-wrapper {
  padding: 0 0 16rpx;
  background: #F8F9FA;
}

.tabs-scroll {
  white-space: nowrap;
  padding: 0 32rpx;
}

.tabs {
  display: inline-flex;
  gap: 10rpx;
}

.tab {
  padding: 12rpx 28rpx;
  background: #FFFFFF;
  border: 1rpx solid #E5E5E5;
  border-radius: 30rpx;
  font-size: 24rpx;
  color: #595959;
  font-weight: 600;
}

.tab-active {
  background: #243727;
  color: #FFFFFF;
  border-color: #243727;
  box-shadow: 0 4rpx 12rpx rgba(36, 55, 39, 0.2);
}

/* 视频卡片 */
.video-card {
  background: #FFFFFF;
  border: 1rpx solid #E5E5E5;
  border-radius: 28rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
}

.cover {
  position: relative;
  width: 100%;
  height: 380rpx;
  background: #171717;
}

.cover-img {
  width: 100%;
  height: 100%;
}

.play-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.25);
}

.play-triangle {
  width: 0;
  height: 0;
  border-left: 22rpx solid #243727;
  border-top: 14rpx solid transparent;
  border-bottom: 14rpx solid transparent;
  margin-left: 6rpx;
}

.status-tag {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  font-size: 22rpx;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
  font-weight: 700;
}

.status-quoted { background: #FFF7E6; color: #D48806; border: 1rpx solid #FFE58F; }
.status-purchased { background: #243727; color: #FFFFFF; }
.status-approved { background: #F6FFED; color: #389E0D; border: 1rpx solid #B7EB8F; }
.status-pending { background: #E6F7FF; color: #096DD9; border: 1rpx solid #91D5FF; }
.status-rejected { background: #FFF1F0; color: #CF1322; border: 1rpx solid #FFA39E; }

.info { padding: 28rpx; }
.title { font-size: 30rpx; font-weight: 700; color: #171717; line-height: 1.4; }

.quote-box {
  margin-top: 20rpx;
  background: #F5EFE6;
  border: 1rpx solid #E5D5C0;
  border-radius: 20rpx;
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quote-price { font-size: 32rpx; font-weight: 900; color: #243727; font-family: "DIN Alternate", monospace; }
.quote-btn { background: #243727; color: #FFFFFF; padding: 12rpx 28rpx; border-radius: 30rpx; font-size: 24rpx; font-weight: 700; }`,

  js: `const { createPage } = require('../../utils/page-mixin');
const { tokenGet, tokenPost } = require('../../utils/request');

createPage({
  data: {
    videoList: [],
    currentTab: 0,
    tabList: [
      { name: '全部', status: 'all' },
      { name: '审核中', status: 'pending' },
      { name: '已通过', status: 'approved' },
      { name: '已拒绝', status: 'rejected' },
      { name: '报价中', status: 'quoted' },
      { name: '已收购', status: 'purchased' }
    ],
    showUploadModal: false
  },

  onLoad() {
    this.loadVideoList(true);
  },

  async agreePurchase(e) {
    const video = e.currentTarget.dataset.video;
    const result = await wx.showModal({
      title: '著作权转让确认',
      content: '收购价格：' + video.purchase_price + ' 积分\\n\\n转让确认后，该视频作品完整著作权将永久归属于平台。确认将积分结算至您的账户。',
      confirmText: '确认转让',
      confirmColor: '#243727'
    });

    if (result.confirm) {
      await tokenPost('/video/agree-purchase', { video_id: video.id });
      wx.showToast({ title: '收购成功，积分已到账', icon: 'success' });
      this.loadVideoList(true);
    }
  }
});`,

  json: `{
  "navigationBarTitleText": "我的作品管理",
  "navigationBarBackgroundColor": "#F8F9FA",
  "navigationBarTextStyle": "black",
  "usingComponents": {
    "van-popup": "@vant/weapp/popup/index",
    "van-field": "@vant/weapp/field/index",
    "top-message": "/components/top-message/top-message"
  }
}`
};

export const VideoUploadPage: React.FC<VideoUploadPageProps> = ({ onShowToast }) => {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [currentTab, setCurrentTab] = useState<VideoStatus>('all');
  const [userPoints, setUserPoints] = useState(520);

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedVideoForPlayer, setSelectedVideoForPlayer] = useState<VideoItem | null>(null);
  const [selectedVideoForCopyright, setSelectedVideoForCopyright] = useState<VideoItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Upload progress
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  // Code inspection state
  const [showCodeView, setShowCodeView] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'wxml' | 'wxss' | 'js' | 'json'>('wxml');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filtered list
  const filteredVideos = videos.filter((vid) => {
    if (currentTab === 'all') return true;
    return vid.status === currentTab;
  });

  const handleCopyCode = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    onShowToast(`已复制 ${tab.toUpperCase()} 源码`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleChooseSampleVideo = () => {
    setSelectedFileName('黔藤黑茶_采茶茶风精剪.mp4');
    setTitle('黔藤黑茶采茶与日光晾晒实拍');
    setDescription('记录海拔千米茶园早晨采茶细节与传统竹篾晾晒全过程。');
    setTags('茶园实拍, 黑茶制作, 黔茶');
    onShowToast('已自动填入示例视频与信息', 'success');
  };

  const handleSubmitUpload = () => {
    if (!title.trim()) {
      onShowToast('请输入视频标题', 'warning');
      return;
    }
    if (!description.trim()) {
      onShowToast('请输入视频描述', 'warning');
      return;
    }
    if (!selectedFileName) {
      onShowToast('请选择视频文件', 'warning');
      return;
    }

    setIsUploading(true);
    setUploadPercent(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setUploadPercent(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setShowUploadModal(false);

          // Add new video to list
          const categoryObj = CATEGORIES.find((c) => c.id === category);
          const newVid: VideoItem = {
            id: `vid-${Date.now().toString().slice(-4)}`,
            title: title.trim(),
            description: description.trim(),
            coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: '00:45',
            status: 'pending',
            statusText: '审核中',
            viewCount: 0,
            likeCount: 0,
            createdAt: '刚才',
            categoryName: categoryObj ? categoryObj.name : '茶饮文化',
            tags: tags ? tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean) : ['原创视频']
          };

          setVideos((prev) => [newVid, ...prev]);
          onShowToast('作品投稿成功，已进入审核队列！', 'success');

          // Reset form
          setTitle('');
          setDescription('');
          setTags('');
          setSelectedFileName(null);
        }, 400);
      }
    }, 250);
  };

  const handleConfirmCopyrightTransfer = () => {
    if (!selectedVideoForCopyright) return;

    const price = selectedVideoForCopyright.purchasePrice || 2800;
    setUserPoints((prev) => prev + price);

    setVideos((prev) =>
      prev.map((v) =>
        v.id === selectedVideoForCopyright.id
          ? {
              ...v,
              status: 'purchased',
              statusText: '已收购',
              purchaseDate: '2026-07-25'
            }
          : v
      )
    );

    onShowToast(`转让成功！已获得 +${price} 积分`, 'success');
    setSelectedVideoForCopyright(null);
  };

  const handleDeleteVideo = (video: VideoItem) => {
    setVideos((prev) => prev.filter((v) => v.id !== video.id));
    onShowToast(`已删除作品: ${video.title}`, 'info');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FA] text-neutral-800 font-sans overflow-hidden">
      {/* Top Bar Navigation */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-200/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-[#243727]" />
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            我的作品管理
          </span>
          <span className="text-[10px] font-bold text-[#243727] bg-[#F5EFE6] px-2 py-0.5 rounded-full border border-[#E5D5C0]">
            积分: {userPoints}
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
          <span>{showCodeView ? '返回管理界面' : '小程序源码'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showCodeView ? (
          /* Mini Program Code Viewer Mode */
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">
                  视频管理小程序代码 (WeChat Mini Program)
                </div>
                <div className="text-[11px] text-neutral-500">
                  包含完整的状态筛选、收购报价弹框、投稿上传与列表动效
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
          /* Interactive Live Management View */
          <>
            {/* Header Title Row with Upload CTA */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs">
              <div>
                <div className="text-base font-black text-neutral-900 tracking-tight font-serif">
                  我的作品
                </div>
                <div className="text-[10px] font-bold text-neutral-400 font-mono tracking-wider">
                  MY WORKS · 共 {videos.length} 个视频
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-[#243727] hover:bg-[#1a281c] text-white rounded-full text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>投稿作品</span>
              </button>
            </div>

            {/* Filter Tabs Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { key: 'all', label: '全部' },
                { key: 'quoted', label: '报价中' },
                { key: 'purchased', label: '已收购' },
                { key: 'approved', label: '已通过' },
                { key: 'pending', label: '审核中' },
                { key: 'rejected', label: '已拒绝' }
              ].map((tab) => {
                const isActive = currentTab === tab.key;
                const count = videos.filter((v) =>
                  tab.key === 'all' ? true : v.status === tab.key
                ).length;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setCurrentTab(tab.key as VideoStatus)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#243727] text-white shadow-xs'
                        : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Video Cards List */}
            <div className="space-y-3.5">
              {filteredVideos.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-2xs hover:border-[#243727]/30 transition-all group"
                >
                  {/* Thumbnail / Video Preview Area */}
                  <div
                    className="relative w-full h-44 bg-neutral-900 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedVideoForPlayer(item)}
                  >
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Play Button Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs text-[#243727] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono rounded-full flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{item.duration}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      {item.status === 'quoted' && (
                        <span className="px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full shadow-xs flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          <span>报价中 ({item.purchasePrice} 积分)</span>
                        </span>
                      )}
                      {item.status === 'purchased' && (
                        <span className="px-2.5 py-1 bg-[#243727] text-white text-[10px] font-bold rounded-full shadow-xs flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-300" />
                          <span>已收购</span>
                        </span>
                      )}
                      {item.status === 'approved' && (
                        <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full shadow-xs">
                          已通过
                        </span>
                      )}
                      {item.status === 'pending' && (
                        <span className="px-2.5 py-1 bg-sky-500 text-white text-[10px] font-bold rounded-full shadow-xs">
                          审核中
                        </span>
                      )}
                      {item.status === 'rejected' && (
                        <span className="px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-xs">
                          已拒绝
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-3.5 space-y-2.5">
                    <div className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2">
                      {item.title}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{item.viewCount}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{item.likeCount}</span>
                        </span>
                      </div>

                      <span className="font-mono">{item.createdAt}</span>
                    </div>

                    {/* Quoted Offer Action Banner */}
                    {item.status === 'quoted' && (
                      <div className="bg-[#F5EFE6] border border-[#E5D5C0] rounded-xl p-3 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                            平台收购出价
                          </div>
                          <div className="text-base font-black font-mono text-[#243727]">
                            {item.purchasePrice} 积分
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedVideoForCopyright(item)}
                          className="px-3.5 py-1.5 bg-[#243727] hover:bg-[#1a281c] text-white rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Coins className="w-3.5 h-3.5" />
                          <span>同意收购</span>
                        </button>
                      </div>
                    )}

                    {/* Purchased Status Banner */}
                    {item.status === 'purchased' && (
                      <div className="bg-neutral-900 text-white rounded-xl p-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span className="font-bold">著作权已转让</span>
                        </div>
                        <span className="font-black font-mono text-amber-300">
                          +{item.purchasePrice} 积分
                        </span>
                      </div>
                    )}

                    {/* Rejection Reason Notice */}
                    {item.status === 'rejected' && item.rejectReason && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-2.5 text-[11px] flex items-start gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                        <div>
                          <span className="font-bold">拒绝原因: </span>
                          <span>{item.rejectReason}</span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-[10px] font-medium rounded-md"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={() => setSelectedVideoForPlayer(item)}
                        className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        查看详情
                      </button>

                      {item.status !== 'purchased' && (
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(item)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>删除</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {filteredVideos.length === 0 && (
                <div className="bg-white rounded-2xl p-8 border border-neutral-200/80 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                    <Video className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-neutral-800">该分类下暂无视频</div>
                  <div className="text-[11px] text-neutral-400">
                    点击右上角「投稿作品」选择并上传短视频
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="px-4 py-2 bg-[#243727] text-white rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    立即投稿
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Upload Modal Drawer */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto shrink-0" />

              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 shrink-0">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    SUBMIT WORK
                  </div>
                  <div className="text-base font-bold text-neutral-900 font-serif">
                    投稿原创作品
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                {/* Video File Picker */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">视频文件 *</span>
                    <span className="text-[10px] text-neutral-400">≤1分钟 · ≤100MB</span>
                  </div>

                  <div className="p-3.5 bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl space-y-2">
                    {selectedFileName ? (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-neutral-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileVideo className="w-5 h-5 text-[#243727] shrink-0" />
                          <span className="text-xs font-bold text-neutral-800 truncate">
                            {selectedFileName}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFileName(null)}
                          className="text-[10px] text-rose-500 font-bold hover:underline"
                        >
                          清除
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-2 py-2">
                        <div className="text-xs text-neutral-500">
                          点击上传或选择预设演示视频
                        </div>
                        <button
                          type="button"
                          onClick={handleChooseSampleVideo}
                          className="px-3 py-1.5 bg-[#243727] text-white text-xs font-bold rounded-full shadow-xs cursor-pointer hover:bg-[#1a281c] transition-colors"
                        >
                          填入示例视频
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-900">视频标题 *</label>
                  <input
                    type="text"
                    maxLength={50}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="请输入视频标题"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727]"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-900">视频描述 *</label>
                  <textarea
                    rows={3}
                    maxLength={200}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="请输入视频描述"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727] resize-none"
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-900">分类 *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500">标签 (选填)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="多个标签用逗号隔开"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#243727]"
                  />
                </div>
              </div>

              {/* Progress Bar / Submit Button */}
              {isUploading ? (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold text-[#243727]">
                    <span>上传进度</span>
                    <span>{uploadPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#243727] transition-all duration-300"
                      style={{ width: `${uploadPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitUpload}
                  className="w-full py-3 bg-[#243727] hover:bg-[#1a281c] text-white font-bold text-xs rounded-full shadow-md transition-all cursor-pointer"
                >
                  提交投稿
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideoForPlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedVideoForPlayer(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video bg-black">
                <video
                  src={selectedVideoForPlayer.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedVideoForPlayer(null)}
                  className="absolute top-3 right-3 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <div className="text-xs font-bold text-neutral-900 leading-snug">
                  {selectedVideoForPlayer.title}
                </div>
                <div className="text-[11px] text-neutral-500 leading-relaxed">
                  {selectedVideoForPlayer.description}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono pt-1">
                  发布日期: {selectedVideoForPlayer.createdAt} · 分类: {selectedVideoForPlayer.categoryName}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copyright Agreement Modal */}
      <AnimatePresence>
        {selectedVideoForCopyright && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedVideoForCopyright(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#243727]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>著作权转让确认</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideoForCopyright(null)}
                  className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-[#F5EFE6] p-3 rounded-2xl border border-[#E5D5C0] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-500 font-bold">收购出价金额</div>
                  <div className="text-lg font-black font-mono text-[#243727]">
                    {selectedVideoForCopyright.purchasePrice} 积分
                  </div>
                </div>
                <Coins className="w-8 h-8 text-[#243727]" />
              </div>

              <div className="text-[11px] text-neutral-600 space-y-2 bg-neutral-50 p-3 rounded-xl leading-relaxed">
                <p>
                  1. 您确认同意收购后，该视频作品的完整著作权（包含复制、发行、传播等）将永久转让给平台。
                </p>
                <p>2. 您确认该作品为本人原创，不存在侵权纠纷。</p>
                <p>3. 确认后收购积分将立即打入您的个人账户。</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedVideoForCopyright(null)}
                  className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-xs font-bold transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCopyrightTransfer}
                  className="flex-1 py-2.5 bg-[#243727] hover:bg-[#1a281c] text-white rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  确认转让
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
