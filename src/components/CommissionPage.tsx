import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  CreditCard,
  Code2,
  CheckCircle2,
  Copy,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X,
  Sparkles,
  Coins,
  ShieldCheck,
  Building2,
  User,
  Filter
} from 'lucide-react';

interface CommissionPageProps {
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

// Sample mock data for live demo
const INITIAL_RECORDS = [
  {
    id: 'REC-20260725-01',
    description: '客户采购 [特级金丝皇菊礼盒] 佣金',
    commissionAmount: 128.0,
    status: 'available', // available | pending | withdrawn | cancelled
    statusText: '可提现',
    createdAt: '2026-07-25 11:20',
    orderNo: 'ORD88492011'
  },
  {
    id: 'REC-20260724-02',
    description: '客户采购 [黔藤定制品茗杯] 佣金',
    commissionAmount: 45.5,
    status: 'pending',
    statusText: '待结算 (7天解冻)',
    createdAt: '2026-07-24 16:05',
    orderNo: 'ORD88481092'
  },
  {
    id: 'REC-20260722-03',
    description: '分销团队二级推荐奖励',
    commissionAmount: 30.0,
    status: 'available',
    statusText: '可提现',
    createdAt: '2026-07-22 09:30',
    orderNo: 'ORD88463301'
  },
  {
    id: 'REC-20260720-04',
    description: '客户订单退款 (已冲抵)',
    commissionAmount: 20.0,
    status: 'cancelled',
    statusText: '已冲抵',
    createdAt: '2026-07-20 14:12',
    orderNo: 'ORD88421008'
  },
  {
    id: 'REC-20260718-05',
    description: '客户采购 [100元团购代金券] 佣金',
    commissionAmount: 250.0,
    status: 'withdrawn',
    statusText: '已提现',
    createdAt: '2026-07-18 18:40',
    orderNo: 'ORD88390021'
  }
];

const INITIAL_WITHDRAWALS = [
  {
    id: 'WD-20260721-01',
    amount: 500.0,
    status: 'approved', // pending | approved | rejected
    statusText: '已到账',
    appliedAt: '2026-07-21 10:15',
    bankInfo: '招商银行 (尾号 8829)',
    realName: '张**'
  },
  {
    id: 'WD-20260715-02',
    amount: 200.0,
    status: 'approved',
    statusText: '已到账',
    appliedAt: '2026-07-15 14:22',
    bankInfo: '微信零钱提现',
    realName: '张**'
  },
  {
    id: 'WD-20260708-03',
    amount: 1500.0,
    status: 'approved',
    statusText: '已到账',
    appliedAt: '2026-07-08 09:10',
    bankInfo: '建设银行 (尾号 1042)',
    realName: '张**'
  }
];

// Complete Optimized Mini Program Code Files
const MINI_PROGRAM_CODE = {
  wxml: `<view class="commission-page">

  <!-- ==================== 1. 佣金核心概览卡片 (已消除重复字段) ==================== -->
  <view class="balance-card">
    <view class="balance-top">
      <view class="balance-label-wrap">
        <text class="balance-title">可提现佣金</text>
        <text class="balance-tag">安全加密结算</text>
      </view>
      <view class="balance-rules-btn" bindtap="showRulesModal">
        <text class="rules-text">结算说明</text>
      </view>
    </view>

    <!-- 主金额展示 -->
    <view class="balance-amount-box">
      <text class="currency">¥</text>
      <text class="balance-value">{{availableAmountStr}}</text>
    </view>

    <!-- 补充维度数据 (避免重复展示“可提现”；展示“待结算”、“已提现”、“累计收益”) -->
    <view class="balance-stats-grid">
      <view class="stat-item">
        <text class="stat-value">¥{{pendingAmountStr}}</text>
        <text class="stat-label">待结算</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">¥{{withdrawnTotalStr}}</text>
        <text class="stat-label">已提现</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">¥{{totalEarnedStr}}</text>
        <text class="stat-label">累计总收益</text>
      </view>
    </view>

    <!-- 快捷提现按钮 -->
    <view class="withdraw-action-btn {{availableAmount <= 0 ? 'disabled' : ''}}" bindtap="showWithdrawModal">
      <text class="btn-text">申请提现</text>
    </view>
  </view>

  <!-- ==================== 2. 分段选择标签栏 ==================== -->
  <view class="segmented-bar">
    <view class="segmented-item {{activeTab === 'records' ? 'active' : ''}}" bindtap="switchTab" data-tab="records">
      <text>佣金明细</text>
      <view class="active-indicator" wx:if="{{activeTab === 'records'}}"></view>
    </view>
    <view class="segmented-item {{activeTab === 'withdrawals' ? 'active' : ''}}" bindtap="switchTab" data-tab="withdrawals">
      <text>提现记录</text>
      <view class="active-indicator" wx:if="{{activeTab === 'withdrawals'}}"></view>
    </view>
  </view>

  <!-- ==================== 3. 佣金记录列表 ==================== -->
  <view class="record-list" wx:if="{{activeTab === 'records'}}">
    <view class="record-card" wx:for="{{records}}" wx:key="id">
      <view class="record-header">
        <text class="record-desc">{{item.description}}</text>
        <text class="record-amount {{item.status === 'cancelled' ? 'cancelled' : ''}}">+¥{{item.commissionAmountStr}}</text>
      </view>

      <view class="record-meta">
        <view class="status-badge status-{{item.status}}">
          <text>{{item.status === 'pending' ? '待结算' : item.status === 'available' ? '可提现' : item.status === 'withdrawn' ? '已提现' : '已取消'}}</text>
        </view>
        <text class="record-time">{{item.created_at}}</text>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" wx:if="{{records.length === 0 && !loading}}">
      <view class="empty-icon"></view>
      <text class="empty-text">暂无佣金记录</text>
    </view>
  </view>

  <!-- ==================== 4. 提现记录列表 ==================== -->
  <view class="record-list" wx:if="{{activeTab === 'withdrawals'}}">
    <view class="record-card" wx:for="{{withdrawals}}" wx:key="id">
      <view class="record-header">
        <text class="record-desc">提现到 {{item.bank_card || '银行卡'}}</text>
        <text class="record-amount withdraw">-¥{{item.amountStr}}</text>
      </view>

      <view class="record-meta">
        <view class="status-badge status-wd-{{item.status}}">
          <text>{{item.status === 'pending' ? '审核中' : item.status === 'approved' ? '已到账' : '已驳回'}}</text>
        </view>
        <text class="record-time">{{item.applied_at}}</text>
      </view>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" wx:if="{{withdrawals.length === 0 && !loading}}">
      <view class="empty-icon"></view>
      <text class="empty-text">暂无提现记录</text>
    </view>
  </view>

  <!-- ==================== 5. 提现操作弹窗 ==================== -->
  <view class="modal-mask" wx:if="{{showWithdrawModal}}" catchtap="hideWithdrawModal">
    <view class="modal-dialog" catchtap="stopPropagation">
      <view class="modal-header">
        <text class="modal-title">申请提现</text>
        <view class="modal-close" bindtap="hideWithdrawModal">×</view>
      </view>

      <view class="modal-body">
        <view class="withdraw-tips-box">
          <text class="tip-label">当前可提现</text>
          <text class="tip-amount">¥{{availableAmountStr}}</text>
        </view>

        <!-- 金额输入框带“全部提现” -->
        <view class="input-group">
          <text class="input-label">提现金额 (元)</text>
          <view class="input-with-action">
            <input type="digit" class="modal-input" value="{{withdrawAmount}}" bindinput="onWithdrawInput" placeholder="最低1.00元" />
            <text class="all-btn" bindtap="onWithdrawAll">全部提现</text>
          </view>
        </view>

        <view class="input-group">
          <text class="input-label">收款人真实姓名</text>
          <input type="text" class="modal-input" value="{{withdrawRealName}}" bindinput="onRealNameInput" placeholder="核对银行卡户名" />
        </view>

        <view class="input-group">
          <text class="input-label">收款银行卡号 / 账号</text>
          <input type="text" class="modal-input" value="{{withdrawBankCard}}" bindinput="onBankCardInput" placeholder="请输入卡号或支付宝账号" />
        </view>

        <view class="input-group">
          <text class="input-label">备注 (选填)</text>
          <input type="text" class="modal-input" value="{{withdrawRemark}}" bindinput="onRemarkInput" placeholder="例如：招商银行极速转账" />
        </view>
      </view>

      <view class="modal-footer">
        <button class="btn btn-cancel" bindtap="hideWithdrawModal">取消</button>
        <button class="btn btn-confirm" bindtap="confirmWithdraw">提交提现申请</button>
      </view>
    </view>
  </view>

  <view class="safe-bottom"></view>
</view>`,

  wxss: `/* ======================================================
   commission.wxss - 极简高质感黑白灰极简风格
   ====================================================== */

page {
  background-color: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

.commission-page {
  min-height: 100vh;
  padding: 24rpx 24rpx 40rpx;
  box-sizing: border-box;
}

/* ================= 1. 核心概览卡片 ================= */
.balance-card {
  background: #171717;
  color: #FFFFFF;
  border-radius: 28rpx;
  padding: 36rpx 32rpx;
  box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.12);
  margin-bottom: 28rpx;
  position: relative;
  overflow: hidden;
}

.balance-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.balance-label-wrap {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.balance-title {
  font-size: 26rpx;
  color: #A3A3A3;
  font-weight: 500;
}

.balance-tag {
  font-size: 18rpx;
  background: rgba(255, 255, 255, 0.1);
  color: #E5E5E5;
  padding: 2rpx 12rpx;
  border-radius: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.15);
}

.balance-rules-btn {
  font-size: 22rpx;
  color: #D4D4D4;
  background: rgba(255, 255, 255, 0.08);
  padding: 6rpx 20rpx;
  border-radius: 30rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.12);
}

.balance-amount-box {
  display: flex;
  align-items: baseline;
  margin-bottom: 32rpx;
}

.currency {
  font-size: 36rpx;
  font-weight: 600;
  margin-right: 8rpx;
  color: #FFFFFF;
}

.balance-value {
  font-size: 72rpx;
  font-weight: 800;
  font-family: "DIN Alternate", -apple-system, sans-serif;
  letter-spacing: -1rpx;
  line-height: 1;
}

/* 消除重复后的三列维度指标 */
.balance-stats-grid {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20rpx;
  padding: 20rpx 16rpx;
  margin-bottom: 28rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: 28rpx;
  font-weight: 700;
  color: #FFFFFF;
  display: block;
  font-family: "DIN Alternate", monospace;
  margin-bottom: 4rpx;
}

.stat-label {
  font-size: 20rpx;
  color: #A3A3A3;
}

.stat-divider {
  width: 1rpx;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.12);
}

/* 提现按钮 */
.withdraw-action-btn {
  background: #FFFFFF;
  color: #171717;
  border-radius: 40rpx;
  padding: 24rpx 0;
  text-align: center;
  font-size: 28rpx;
  font-weight: 700;
  box-shadow: 0 4rpx 16rpx rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
}

.withdraw-action-btn:active {
  opacity: 0.9;
  transform: scale(0.99);
}

.withdraw-action-btn.disabled {
  background: #404040;
  color: #737373;
  pointer-events: none;
  box-shadow: none;
}

/* ================= 2. 分段选择标签栏 ================= */
.segmented-bar {
  display: flex;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 8rpx;
  border: 1rpx solid #E5E5E5;
  margin-bottom: 20rpx;
}

.segmented-item {
  flex: 1;
  text-align: center;
  padding: 18rpx 0;
  font-size: 26rpx;
  color: #737373;
  font-weight: 500;
  position: relative;
  transition: all 0.2s;
}

.segmented-item.active {
  color: #171717;
  font-weight: 700;
}

.active-indicator {
  position: absolute;
  bottom: 4rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 32rpx;
  height: 4rpx;
  background: #171717;
  border-radius: 2rpx;
}

/* ================= 3. 记录卡片列表 ================= */
.record-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.record-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx 28rpx;
  border: 1rpx solid #E5E5E5;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.record-desc {
  font-size: 26rpx;
  color: #171717;
  font-weight: 600;
  flex: 1;
  margin-right: 16rpx;
  line-height: 1.4;
}

.record-amount {
  font-size: 30rpx;
  font-weight: 800;
  color: #171717;
  font-family: "DIN Alternate", monospace;
}

.record-amount.cancelled {
  color: #A3A3A3;
  text-decoration: line-through;
}

.record-amount.withdraw {
  color: #171717;
}

.record-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-badge {
  font-size: 20rpx;
  padding: 4rpx 14rpx;
  border-radius: 12rpx;
  font-weight: 600;
}

.status-available {
  background: #171717;
  color: #FFFFFF;
}

.status-pending {
  background: #F5F5F5;
  color: #525252;
  border: 1rpx solid #E5E5E5;
}

.status-withdrawn {
  background: #E5E5E5;
  color: #404040;
}

.status-cancelled {
  background: #F5F5F5;
  color: #A3A3A3;
}

.status-wd-pending {
  background: #F5F5F5;
  color: #525252;
}

.status-wd-approved {
  background: #171717;
  color: #FFFFFF;
}

.record-time {
  font-size: 20rpx;
  color: #A3A3A3;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80rpx 0;
  color: #A3A3A3;
  font-size: 24rpx;
}

/* ================= 4. 弹窗样式 ================= */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
}

.modal-dialog {
  width: 100%;
  max-width: 600rpx;
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 36rpx;
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 800;
  color: #171717;
}

.modal-close {
  font-size: 40rpx;
  color: #A3A3A3;
  line-height: 1;
}

.withdraw-tips-box {
  background: #F5F5F5;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tip-label {
  font-size: 24rpx;
  color: #737373;
}

.tip-amount {
  font-size: 32rpx;
  font-weight: 800;
  color: #171717;
  font-family: "DIN Alternate", monospace;
}

.input-group {
  margin-bottom: 20rpx;
}

.input-label {
  font-size: 22rpx;
  color: #525252;
  margin-bottom: 8rpx;
  display: block;
  font-weight: 600;
}

.input-with-action {
  position: relative;
  display: flex;
  align-items: center;
}

.modal-input {
  width: 100%;
  box-sizing: border-box;
  background: #FAFAFA;
  border: 1rpx solid #E5E5E5;
  border-radius: 16rpx;
  padding: 18rpx 20rpx;
  font-size: 26rpx;
  color: #171717;
}

.all-btn {
  position: absolute;
  right: 20rpx;
  font-size: 22rpx;
  font-weight: 700;
  color: #171717;
  padding: 8rpx 12rpx;
  background: #E5E5E5;
  border-radius: 10rpx;
}

.modal-footer {
  display: flex;
  gap: 16rpx;
  margin-top: 32rpx;
}

.btn {
  flex: 1;
  font-size: 26rpx;
  font-weight: 700;
  padding: 20rpx 0;
  border-radius: 30rpx;
  border: none;
}

.btn-cancel {
  background: #F5F5F5;
  color: #525252;
}

.btn-confirm {
  background: #171717;
  color: #FFFFFF;
}

.safe-bottom {
  height: 40rpx;
}`,

  js: `const { tokenGet, tokenPost } = require('../../utils/request.js');

// 格式化金额工具：null/undefined/NaN → "0.00"
const fmtYuan = (v) => {
  if (v == null) return '0.00';
  const n = parseFloat(v);
  return isNaN(n) ? '0.00' : n.toFixed(2);
};

// 列表增加格式化金额字符串
const _addStrFields = (records) => {
  return records.map((r) => {
    r.commissionAmountStr = fmtYuan(r.commission_amount || r.amount);
    r.amountStr = fmtYuan(r.amount);
    return r;
  });
};

Page({
  data: {
    balance: 0,
    pendingAmount: 0,
    availableAmount: 0,
    withdrawnTotal: 0,
    totalEarned: 0,
    availableAmountStr: '0.00',
    pendingAmountStr: '0.00',
    withdrawnTotalStr: '0.00',
    totalEarnedStr: '0.00',
    
    records: [],
    withdrawals: [],
    activeTab: 'records',
    loading: false,
    page: 1,
    pageSize: 20,
    hasMore: true,

    withdrawAmount: '',
    withdrawRemark: '',
    withdrawRealName: '',
    withdrawBankCard: '',
    showWithdrawModal: false
  },

  onLoad() {
    this.loadBalance();
    this.loadRecords();
  },

  // 1. 获取佣金余额与统计 (包含待结算、已提现、累计总收益)
  async loadBalance() {
    try {
      const res = await tokenGet('/commission/balance');
      if (res) {
        const pending = parseFloat(res.pending_amount) || 0;
        const available = parseFloat(res.available_amount) || 0;
        const withdrawn = parseFloat(res.withdrawn_total) || 0;
        const total = available + pending + withdrawn;

        this.setData({
          balance: available,
          pendingAmount: pending,
          availableAmount: available,
          withdrawnTotal: withdrawn,
          totalEarned: total,
          availableAmountStr: fmtYuan(available),
          pendingAmountStr: fmtYuan(pending),
          withdrawnTotalStr: fmtYuan(withdrawn),
          totalEarnedStr: fmtYuan(total)
        });
      }
    } catch (error) {
      console.error('获取佣金余额失败:', error);
    }
  },

  // 2. 加载佣金明细
  async loadRecords() {
    if (this.data.loading || !this.data.hasMore) return;
    this.setData({ loading: true });

    try {
      const res = await tokenGet('/commission/records', {
        page: this.data.page,
        page_size: this.data.pageSize
      });

      if (res && res.records) {
        const newRecords = _addStrFields(res.records || []);
        this.setData({
          records: this.data.page === 1 ? newRecords : this.data.records.concat(newRecords),
          hasMore: newRecords.length === this.data.pageSize
        });
      } else {
        this.setData({ hasMore: false });
      }
    } catch (error) {
      console.error('获取佣金记录失败:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  // 3. 加载提现记录
  async loadWithdrawals() {
    if (this.data.loading || !this.data.hasMore) return;
    this.setData({ loading: true });

    try {
      const res = await tokenGet('/commission/withdrawals', {
        page: this.data.page,
        page_size: this.data.pageSize
      });

      if (res && res.records) {
        const newRecords = _addStrFields(res.records || []);
        this.setData({
          withdrawals: this.data.page === 1 ? newRecords : this.data.withdrawals.concat(newRecords),
          hasMore: newRecords.length === this.data.pageSize
        });
      } else {
        this.setData({ hasMore: false });
      }
    } catch (error) {
      console.error('获取提现记录失败:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  // 4. 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.activeTab) return;

    this.setData({
      activeTab: tab,
      page: 1,
      hasMore: true
    });

    if (tab === 'records') {
      if (this.data.records.length === 0) this.loadRecords();
    } else {
      if (this.data.withdrawals.length === 0) this.loadWithdrawals();
    }
  },

  // 输入监听
  onWithdrawInput(e) {
    this.setData({ withdrawAmount: e.detail.value });
  },
  onWithdrawAll() {
    this.setData({ withdrawAmount: this.data.availableAmountStr });
  },
  onRemarkInput(e) {
    this.setData({ withdrawRemark: e.detail.value });
  },
  onRealNameInput(e) {
    this.setData({ withdrawRealName: e.detail.value });
  },
  onBankCardInput(e) {
    this.setData({ withdrawBankCard: e.detail.value });
  },

  // 5. 弹窗控制
  showWithdrawModal() {
    if (this.data.availableAmount <= 0) {
      wx.showToast({ title: '可提现金额不足', icon: 'none' });
      return;
    }
    this.setData({ showWithdrawModal: true });
  },

  hideWithdrawModal() {
    this.setData({
      showWithdrawModal: false,
      withdrawAmount: '',
      withdrawRemark: '',
      withdrawRealName: '',
      withdrawBankCard: ''
    });
  },

  // 6. 提交提现
  async confirmWithdraw() {
    const amount = parseFloat(this.data.withdrawAmount);
    if (!amount || amount <= 0) {
      wx.showToast({ title: '请输入有效金额', icon: 'none' });
      return;
    }
    if (amount < 1) {
      wx.showToast({ title: '单次提现不能少于1.00元', icon: 'none' });
      return;
    }
    if (amount > this.data.availableAmount) {
      wx.showToast({ title: '可提现余额不足', icon: 'none' });
      return;
    }
    if (!this.data.withdrawRealName.trim()) {
      wx.showToast({ title: '请填写收款人真实姓名', icon: 'none' });
      return;
    }
    if (!this.data.withdrawBankCard.trim()) {
      wx.showToast({ title: '请填写收款账号/卡号', icon: 'none' });
      return;
    }

    try {
      const res = await tokenPost('/commission/withdraw', {
        amount: amount,
        remark: this.data.withdrawRemark,
        real_name: this.data.withdrawRealName,
        bank_card: this.data.withdrawBankCard
      });

      if (res && res.success !== false) {
        wx.showToast({ title: '申请提交成功', icon: 'success' });
        this.hideWithdrawModal();
        this.loadBalance();
        this.setData({ page: 1, hasMore: true, records: [], withdrawals: [] });
        if (this.data.activeTab === 'records') {
          this.loadRecords();
        } else {
          this.loadWithdrawals();
        }
      } else {
        wx.showToast({ title: (res && res.msg) || '申请失败', icon: 'none' });
      }
    } catch (error) {
      console.error('提现申请失败:', error);
      wx.showToast({ title: '网络异常，请重试', icon: 'none' });
    }
  },

  onReachBottom() {
    if (!this.data.hasMore) return;
    this.setData({ page: this.data.page + 1 });
    if (this.data.activeTab === 'records') {
      this.loadRecords();
    } else {
      this.loadWithdrawals();
    }
  },

  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true, records: [], withdrawals: [] });
    this.loadBalance();
    if (this.data.activeTab === 'records') {
      this.loadRecords();
    } else {
      this.loadWithdrawals();
    }
    wx.stopPullDownRefresh();
  }
});`,

  json: `{
  "navigationBarTitleText": "我的佣金",
  "navigationBarBackgroundColor": "#171717",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": true
}`
};

export const CommissionPage: React.FC<CommissionPageProps> = ({ onShowToast }) => {
  // State for live preview
  const [availableAmount, setAvailableAmount] = useState(158.5);
  const [pendingAmount, setPendingAmount] = useState(45.5);
  const [withdrawnTotal, setWithdrawnTotal] = useState(700.0);
  
  const [activeTab, setActiveTab] = useState<'records' | 'withdrawals'>('records');
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [withdrawals, setWithdrawals] = useState(INITIAL_WITHDRAWALS);

  // Modal State
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [realName, setRealName] = useState('张伟');
  const [bankCard, setBankCard] = useState('6222 0210 **** 8829');
  const [remark, setRemark] = useState('');
  const [showRulesModal, setShowRulesModal] = useState(false);

  // Code inspection state
  const [showCodeView, setShowCodeView] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'wxml' | 'wxss' | 'js' | 'json'>('wxml');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const totalEarned = availableAmount + pendingAmount + withdrawnTotal;

  // Handlers
  const handleCopyCode = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    onShowToast(`已复制 ${tab.toUpperCase()} 代码到剪贴板`, 'success');
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleWithdrawAll = () => {
    setWithdrawAmount(availableAmount.toFixed(2));
  };

  const handleConfirmWithdraw = () => {
    const num = parseFloat(withdrawAmount);
    if (!num || num <= 0) {
      onShowToast('请输入有效的提现金额', 'warning');
      return;
    }
    if (num < 1) {
      onShowToast('单次提现金额需大于 1.00 元', 'warning');
      return;
    }
    if (num > availableAmount) {
      onShowToast('申请金额超出当前可提现余额', 'warning');
      return;
    }
    if (!realName.trim() || !bankCard.trim()) {
      onShowToast('请完整填写收款人姓名与账号', 'warning');
      return;
    }

    // Process withdrawal
    const newAvailable = availableAmount - num;
    const newWithdrawn = withdrawnTotal + num;
    setAvailableAmount(newAvailable);
    setWithdrawnTotal(newWithdrawn);

    const newWithdrawRecord = {
      id: `WD-${Date.now().toString().slice(-6)}`,
      amount: num,
      status: 'pending',
      statusText: '审核中',
      appliedAt: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
      bankInfo: `${bankCard.includes('6222') ? '招商银行' : '银行卡账号'} (尾号 ${bankCard.slice(-4)})`,
      realName: realName
    };

    setWithdrawals([newWithdrawRecord, ...withdrawals]);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    onShowToast('提现申请提交成功，预计24小时内到账', 'success');
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#F8F9FA] text-neutral-800 font-sans overflow-hidden">
      {/* Top Header Navigation Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-neutral-200/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-neutral-900" />
          <span className="text-sm font-bold text-neutral-900 tracking-tight font-serif">
            我的佣金中心
          </span>
          <span className="text-[10px] font-bold text-white bg-neutral-900 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-white" />
            <span>精简美化版</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowCodeView(!showCodeView)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
            showCodeView
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'bg-neutral-50 text-neutral-900 border-neutral-300 hover:bg-neutral-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showCodeView ? '返回预览' : '小程序源码'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showCodeView ? (
          /* Mini Program Code Drawer Mode */
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-3 border border-neutral-200 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900">
                  小程序重构与美化代码 (WeChat Mini Program)
                </div>
                <div className="text-[11px] text-neutral-500">
                  已消除重复字段，优化结构，保持黑白极简风格
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
                        ? 'bg-neutral-900 text-white shadow-2xs font-bold'
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

              <pre className="pt-6">{MINI_PROGRAM_CODE[activeCodeTab]}</pre>
            </div>
          </div>
        ) : (
          /* Live UI Preview Mode */
          <>
            {/* 1. Core Overview Card (Eliminated Duplicate Fields) */}
            <div className="bg-[#171717] text-white rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden space-y-4 border border-neutral-800">
              {/* Subtle ambient light blur */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 font-medium">可提现佣金余额</span>
                  <span className="text-[10px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>安全加密结算</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRulesModal(true)}
                  className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>结算说明</span>
                </button>
              </div>

              {/* Main Number Display */}
              <div className="flex items-baseline gap-1 pt-1">
                <span className="text-xl font-bold text-neutral-300">¥</span>
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                  {availableAmount.toFixed(2)}
                </span>
              </div>

              {/* Complementary Dimensions Stats (No Repetition!) */}
              <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/5 rounded-xl p-2.5 border border-white/10 text-center">
                <div className="space-y-0.5">
                  <div className="text-sm font-black font-mono text-white">
                    ¥{pendingAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-neutral-400">待结算 (冻结中)</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-sm font-black font-mono text-white">
                    ¥{withdrawnTotal.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-neutral-400">已成功提现</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-sm font-black font-mono text-white">
                    ¥{totalEarned.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-neutral-400">累计总收益</div>
                </div>
              </div>

              {/* Withdraw Button */}
              <button
                type="button"
                disabled={availableAmount <= 0}
                onClick={() => setShowWithdrawModal(true)}
                className={`w-full py-3 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 ${
                  availableAmount <= 0
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-white hover:bg-neutral-100 text-neutral-900 active:scale-[0.99]'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                <span>申请提现至银行卡 / 微信</span>
              </button>
            </div>

            {/* 2. Segmented Tab Switcher */}
            <div className="bg-white rounded-xl p-1 border border-neutral-200/80 shadow-2xs flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab('records')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'records'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>佣金明细</span>
                <span className="text-[10px] opacity-75 font-mono">({records.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('withdrawals')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'withdrawals'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>提现记录</span>
                <span className="text-[10px] opacity-75 font-mono">({withdrawals.length})</span>
              </button>
            </div>

            {/* 3. Record Cards List */}
            {activeTab === 'records' ? (
              <div className="space-y-2">
                {records.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white rounded-xl p-3.5 border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-neutral-900 leading-snug">
                          {rec.description}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          订单号: {rec.orderNo}
                        </div>
                      </div>

                      <div
                        className={`text-sm font-black font-mono ${
                          rec.status === 'cancelled'
                            ? 'text-neutral-400 line-through'
                            : 'text-neutral-900'
                        }`}
                      >
                        +{rec.commissionAmount.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-neutral-100">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rec.status === 'available'
                            ? 'bg-neutral-900 text-white'
                            : rec.status === 'pending'
                            ? 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                            : rec.status === 'withdrawn'
                            ? 'bg-neutral-200 text-neutral-700'
                            : 'bg-neutral-100 text-neutral-400'
                        }`}
                      >
                        {rec.statusText}
                      </span>
                      <span className="text-neutral-400">{rec.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {withdrawals.map((wd) => (
                  <div
                    key={wd.id}
                    className="bg-white rounded-xl p-3.5 border border-neutral-200/80 shadow-2xs space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-neutral-900">
                          提现至 {wd.bankInfo}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          收款人: {wd.realName}
                        </div>
                      </div>

                      <div className="text-sm font-black font-mono text-neutral-900">
                        -{wd.amount.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-neutral-100">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          wd.status === 'approved'
                            ? 'bg-neutral-900 text-white'
                            : wd.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {wd.statusText}
                      </span>
                      <span className="text-neutral-400">{wd.appliedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowWithdrawModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl space-y-4 border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-neutral-900" />
                  <span>申请提现</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Available Balance Cue */}
              <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">当前可提现余额</span>
                <span className="text-base font-black font-mono text-neutral-900">
                  ¥{availableAmount.toFixed(2)}
                </span>
              </div>

              {/* Amount Input with "Withdraw All" */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700">提现金额 (元)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-neutral-400 font-bold">¥</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="最低 1.00 元"
                    className="w-full pl-8 pr-20 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleWithdrawAll}
                    className="absolute right-2 px-2.5 py-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    全部提现
                  </button>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700">收款人真实姓名</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    placeholder="请输入核对户名"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700">收款卡号 / 账号</label>
                <div className="relative flex items-center">
                  <Building2 className="absolute left-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={bankCard}
                    onChange={(e) => setBankCard(e.target.value)}
                    placeholder="请输入银行卡号或支付宝"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700">备注 (选填)</label>
                <input
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="如：招商银行极速提现"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmWithdraw}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  确认提现
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Settlement Rules Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setShowRulesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl space-y-3 border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <div className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-neutral-900" />
                  <span>佣金结算说明</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(false)}
                  className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-neutral-600 space-y-2 leading-relaxed max-h-[280px] overflow-y-auto">
                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="font-bold text-neutral-900 mb-0.5">1. 待结算资金解冻</div>
                  <div>客户完成订单支付后，佣金进入7天保护期 (待结算)。保护期满无退款则自动解冻为“可提现”余额。</div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="font-bold text-neutral-900 mb-0.5">2. 提现到账时间</div>
                  <div>工作日提交的提现申请通常在 24 小时内完成审核并划转至绑定卡号或微信零钱。</div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="font-bold text-neutral-900 mb-0.5">3. 提现限额</div>
                  <div>单次提现最低额度为 1.00 元，暂无最高上限。</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="w-full py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
