import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgreeAndClose?: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  onAgreeAndClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-neutral-100 flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-stone-50/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#243727]" />
                <h3 className="text-base font-semibold text-neutral-800">
                  黔藤壹号 免责条款与隐私协议
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-neutral-600 leading-relaxed">
              <p className="font-medium text-neutral-800 text-sm">
                欢迎您使用黔藤壹号快捷登录服务。在您开始使用本应用前，请认真阅读以下条款：
              </p>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-neutral-800 text-xs">
                  一、账号安全与登录规范
                </h4>
                <p>
                  1. 您在使用手机号快捷登录时，需保证该手机号码为您本人合法持有。请妥善保管接收到的短信验证码，切勿泄露给他人。
                </p>
                <p>
                  2. 因个人原因导致账号被他人冒用或引发安全风险的，相关责任由使用者自行承担。
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-neutral-800 text-xs">
                  二、个人信息保护与使用
                </h4>
                <p>
                  1. 黔藤壹号高度重视您的个人隐私。我们仅在提供必要服务范围内收集您的手机号码信息。
                </p>
                <p>
                  2. 未经您的明示同意，我们不会向任何第三方公开、转让或出售您的个人敏感数据，法律法规另有规定的除外。
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-semibold text-neutral-800 text-xs">
                  三、免责说明
                </h4>
                <p>
                  1. 因不可抗力、网络运营商故障或系统例行维护等客观原因导致服务临时中断或不可用的，平台将尽力妥善修复，但不承担由此产生的衍生损失。
                </p>
                <p>
                  2. 黔藤壹号保留根据业务发展对服务条款进行修订更新的权利，更新后的条款将通过平台公告形式予以展示。
                </p>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-neutral-100 bg-stone-50/50 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (onAgreeAndClose) onAgreeAndClose();
                  onClose();
                }}
                className="px-5 py-2 text-xs font-medium text-white bg-[#243727] hover:bg-[#1a281c] rounded-lg shadow-sm transition-colors"
              >
                同意并继续
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
