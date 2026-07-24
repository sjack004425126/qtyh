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
  ArrowLeft,
  Video,
} from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: '茶饮文化', description: '黔藤茶文化、冲泡手法与茶道鉴赏' },
  { id: '2', name: '品牌宣介', description: '企业风采、产品亮点与品牌故事' },
  { id: '3', name: '跨境电商', description: '包含商品展示、海外直播技巧与经验' },
  { id: '4', name: '教学视频', description: '知识科普、技能指导与教程干货' },
  { id: '5', name: '经验分享', description: '个人成长、创业历程与避坑指南' },
  { id: '6', name: '故事短剧', description: '剧情演绎、创意短片与生活剧场' },
];

interface VideoUploadPageProps {
  onBack?: () => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const VideoUploadPage: React.FC<VideoUploadPageProps> = ({ onBack, onShowToast }) => {
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(DEFAULT_CATEGORIES[0]);

  // File State
  const [videoFile, setVideoFile] = useState<{
    name: string;
    sizeFormatted: string;
    durationFormatted: string;
    url: string;
    sizeBytes: number;
    durationSec: number;
  } | null>(null);

  // UI State
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Upload Progress Modal State
  const [progressState, setProgressState] = useState<{
    show: boolean;
    percent: number;
    loaded: number;
    total: number;
    status: 'uploading' | 'success' | 'error';
  }>({
    show: false,
    percent: 0,
    loaded: 0,
    total: 10,
    status: 'uploading',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Form Validation
  const canSubmit = Boolean(title.trim() && description.trim() && selectedCategory && videoFile);

  // File Handler
  const handleSelectVideoFile = (file: File) => {
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      onShowToast('视频大小不能超过 100MB', 'warning');
      return;
    }

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const objectUrl = URL.createObjectURL(file);

    const tempVideo = document.createElement('video');
    tempVideo.src = objectUrl;
    tempVideo.onloadedmetadata = () => {
      const durationSec = Math.floor(tempVideo.duration || 15);
      if (durationSec > 60) {
        onShowToast('视频时长不能超过 60 秒', 'warning');
        return;
      }

      setVideoFile({
        name: file.name,
        sizeFormatted: `${sizeInMB} MB`,
        durationFormatted: `${durationSec} 秒`,
        url: objectUrl,
        sizeBytes: file.size,
        durationSec,
      });
      onShowToast('视频选择成功', 'success');
    };
  };

  // Mock Preset Sample Video selection
  const handleUseMockVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoFile({
      name: '黔藤壹号_茶文化宣介短片.mp4',
      sizeFormatted: '18.4 MB',
      durationFormatted: '32 秒',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      sizeBytes: 18.4 * 1024 * 1024,
      durationSec: 32,
    });
    onShowToast('已一键选定示例视频', 'success');
  };

  // Submit Upload Flow
  const handleSubmitUpload = () => {
    if (!canSubmit) {
      if (!videoFile) onShowToast('请先选择视频文件', 'warning');
      else if (!title.trim()) onShowToast('请填写视频标题', 'warning');
      else if (!description.trim()) onShowToast('请填写视频描述', 'warning');
      else if (!selectedCategory) onShowToast('请选择视频分类', 'warning');
      return;
    }

    setProgressState({
      show: true,
      percent: 0,
      loaded: 0,
      total: 10,
      status: 'uploading',
    });

    let currentPercent = 0;
    if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);

    uploadTimerRef.current = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 18) + 12;
      if (currentPercent >= 100) {
        currentPercent = 100;
        if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
        setProgressState({
          show: true,
          percent: 100,
          loaded: 10,
          total: 10,
          status: 'success',
        });
      } else {
        const loadedChunks = Math.floor((currentPercent / 100) * 10);
        setProgressState({
          show: true,
          percent: currentPercent,
          loaded: loadedChunks,
          total: 10,
          status: 'uploading',
        });
      }
    }, 350);
  };

  const handleCancelUpload = () => {
    if (uploadTimerRef.current) clearInterval(uploadTimerRef.current);
    setProgressState((prev) => ({ ...prev, show: false }));
    onShowToast('已取消上传', 'info');
  };

  const handleCompleteUploadModal = () => {
    setProgressState((prev) => ({ ...prev, show: false }));
    if (progressState.status === 'success') {
      onShowToast('投稿成功，等待审核', 'success');
      setTitle('');
      setDescription('');
      setTags('');
      setVideoFile(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F9FAFB] text-neutral-800 font-sans overflow-hidden">
      {/* Navbar Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 -ml-1 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            视频创作投稿
          </span>
        </div>
        <span className="text-[11px] font-medium text-[#243727] bg-[#243727]/8 px-2.5 py-0.5 rounded-full">
          黔藤壹号
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-28 scrollbar-none">
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleSelectVideoFile(file);
          }}
        />

        {/* 1. Core Focus: Compact & Elegant Video Picker Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs font-semibold text-neutral-700">
              视频文件 <span className="text-emerald-700 font-bold ml-0.5">*</span>
            </span>
            <span className="text-[10px] text-neutral-400">MP4格式 · ≤1分钟 · ≤100MB</span>
          </div>

          {videoFile ? (
            /* Selected File Compact Card */
            <div className="bg-white rounded-xl border border-neutral-200/90 p-3 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="w-9 h-9 rounded-lg bg-[#243727] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-neutral-900 truncate">
                    {videoFile.name}
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1.5">
                    <span className="text-emerald-700 font-medium">已选中</span>
                    <span>•</span>
                    <span>{videoFile.durationFormatted}</span>
                    <span>•</span>
                    <span>{videoFile.sizeFormatted}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 border border-neutral-200 text-neutral-700 text-[11px] font-medium rounded-lg transition-colors shrink-0"
              >
                更换
              </button>
            </div>
          ) : (
            /* Small, Clean Dropzone Box */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleSelectVideoFile(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border border-dashed px-3.5 py-3.5 transition-all flex items-center justify-between bg-white shadow-2xs group ${
                isDragOver
                  ? 'border-[#243727] bg-[#243727]/5'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#243727]/10 text-[#243727] flex items-center justify-center group-hover:bg-[#243727] group-hover:text-white transition-colors">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <span>点击选择视频作品</span>
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    支持拖拽上传，原创优质作品优先审核
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUseMockVideo}
                  className="text-[10px] text-neutral-400 hover:text-[#243727] underline transition-colors"
                >
                  填入示例
                </button>
                <div className="px-2.5 py-1 bg-[#243727] text-white text-[11px] font-medium rounded-lg shadow-2xs group-hover:bg-[#1a281c] transition-colors">
                  选择
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Main Form Fields Container */}
        <div className="bg-white rounded-xl p-4 shadow-2xs border border-neutral-200/80 space-y-4">
          
          {/* Title Field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-xs font-semibold text-neutral-700">
                视频标题 <span className="text-emerald-700 font-bold ml-0.5">*</span>
              </label>
              <span className="text-[10px] text-neutral-400 font-mono">
                {title.length}/50
              </span>
            </div>
            <input
              type="text"
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请填写视频标题"
              className="w-full px-3 py-2 bg-stone-50/80 border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#243727] focus:bg-white transition-all"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-xs font-semibold text-neutral-700">
                视频描述 <span className="text-emerald-700 font-bold ml-0.5">*</span>
              </label>
              <span className="text-[10px] text-neutral-400 font-mono">
                {description.length}/200
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入视频描述，简述创作亮点..."
              className="w-full px-3 py-2 bg-stone-50/80 border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#243727] focus:bg-white transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Category Quick Chips Selection */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-xs font-semibold text-neutral-700">
                视频分类 <span className="text-emerald-700 font-bold ml-0.5">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowCategorySheet(true)}
                className="text-[10px] text-[#243727] font-medium flex items-center gap-0.5 hover:underline"
              >
                <span>更多分类</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Chips Row */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {DEFAULT_CATEGORIES.slice(0, 4).map((cat) => {
                const isSelected = selectedCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                      isSelected
                        ? 'bg-[#243727] text-white font-medium shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-neutral-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Tags */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between px-0.5">
              <label className="text-xs font-semibold text-neutral-500">
                标签 <span className="text-[10px] text-neutral-400 font-normal">(选填)</span>
              </label>
            </div>
            <input
              type="text"
              maxLength={100}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="请输入标签，如：茶饮文化, 经验分享"
              className="w-full px-3 py-2 bg-stone-50/80 border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#243727] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Clean Footer Tip */}
        <div className="px-1 text-[11px] text-neutral-400 text-center leading-relaxed">
          优质原创内容审核通过后可在平台展示推广并有机会获得平台收购
        </div>

        {/* Primary Submit Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleSubmitUpload}
            className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-widest transition-all shadow-sm active:scale-[0.98] ${
              canSubmit
                ? 'bg-[#243727] hover:bg-[#1a281c] text-white cursor-pointer shadow-[#243727]/15'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            {canSubmit ? '提交投稿作品' : '请先选择视频并完善必填信息'}
          </button>
        </div>
      </div>

      {/* Category Selection Bottom Sheet Modal */}
      <AnimatePresence>
        {showCategorySheet && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCategorySheet(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-md bg-white rounded-t-2xl shadow-2xl p-4 z-10 max-h-[70vh] flex flex-col"
            >
              <div className="w-8 h-1 bg-neutral-200 rounded-full mx-auto mb-3 shrink-0" />
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 shrink-0">
                <span className="text-sm font-bold text-neutral-900 font-serif">
                  选择作品分类
                </span>
                <button
                  type="button"
                  onClick={() => setShowCategorySheet(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto py-2 divide-y divide-neutral-100">
                {DEFAULT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory?.id === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategorySheet(false);
                      }}
                      className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-stone-50' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div
                          className={`text-xs font-bold ${
                            isSelected ? 'text-[#243727]' : 'text-neutral-800'
                          }`}
                        >
                          {cat.name}
                        </div>
                        {cat.description && (
                          <div className="text-[10px] text-neutral-400">
                            {cat.description}
                          </div>
                        )}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#243727] border-[#243727] text-white'
                            : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Progress Modal */}
      <AnimatePresence>
        {progressState.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl p-5 z-10 text-center space-y-4 border border-neutral-100"
            >
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-neutral-900 font-serif">
                  {progressState.status === 'uploading'
                    ? '正在提交上传...'
                    : progressState.status === 'success'
                    ? '投稿成功'
                    : '上传失败'}
                </div>
              </div>

              <div className="flex items-center justify-center py-1">
                {progressState.status === 'uploading' && (
                  <div className="w-20 h-20 rounded-full border-3 border-stone-100 border-t-[#243727] animate-spin flex items-center justify-center relative">
                    <span className="text-lg font-bold text-neutral-900 font-mono">
                      {progressState.percent}%
                    </span>
                  </div>
                )}
                {progressState.status === 'success' && (
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="text-xs text-neutral-500">
                {progressState.status === 'uploading' && '作品数据分片传输中，请稍候'}
                {progressState.status === 'success' && '视频上传完成，已进入审核队列'}
              </div>

              <div className="pt-1">
                {progressState.status === 'uploading' ? (
                  <button
                    type="button"
                    onClick={handleCancelUpload}
                    className="w-full py-2 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    取消
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteUploadModal}
                    className="w-full py-2.5 bg-[#243727] hover:bg-[#1a281c] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    确定
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
