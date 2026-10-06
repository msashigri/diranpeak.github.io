import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, Laptop, Share, PlusSquare, X, CheckCircle } from 'lucide-react';

interface PWAInstallProps {
  variant?: 'header' | 'floating' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, isMobile, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('dpa_pwa_dismissed');
      if (dismissed === 'true') {
        setBannerDismissed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    try {
      sessionStorage.setItem('dpa_pwa_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // If already running in standalone mode (already installed), hide completely
  if (isInstalled) {
    return null;
  }

  // Header / Topbar button variant
  if (variant === 'header') {
    if (isInstallable) {
      return (
        <button
          onClick={install}
          title="Install Diran Peak Adventure App on this device"
          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse"
        >
          {isMobile ? <Smartphone className="w-3.5 h-3.5" /> : <Laptop className="w-3.5 h-3.5" />}
          <span>Install App</span>
        </button>
      );
    }

    if (isIOS) {
      return (
        <>
          <button
            onClick={() => setShowIOSModal(true)}
            title="Install Diran Peak Adventure on iPhone / iPad"
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>

          {showIOSModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800 relative">
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a2b48] flex items-center justify-center p-2 shadow-md">
                    <img src="/public/icon.svg" alt="DPA Icon" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2b48]">Install on iPhone / iPad</h3>
                    <p className="text-xs text-slate-500">Fast offline access &amp; instant booking</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      Tap the <strong className="text-slate-900 inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-[#5191fa]" /> Share</strong> icon in your Safari bottom bar.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      Scroll down and tap <strong className="text-slate-900 inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 text-[#5191fa]" /> Add to Home Screen</strong>.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      Tap <strong className="text-slate-900">Add</strong> in top right corner. The app will appear on your home screen!
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowIOSModal(false)}
                  className="w-full py-2.5 bg-[#1a2b48] hover:bg-[#253d66] text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Got It
                </button>
              </div>
            </div>
          )}
        </>
      );
    }

    return null;
  }

  // Floating banner variant on Mobile or Laptop when prompt is ready
  if (variant === 'floating' || variant === 'banner') {
    if (bannerDismissed) return null;

    if (isInstallable) {
      return (
        <aside
          aria-label="Install Web App"
          className="fixed bottom-4 left-4 z-40 max-w-sm bg-[#1a2b48] text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 animate-in slide-in-from-bottom duration-300 flex items-center gap-3.5"
        >
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center p-2 shrink-0 border border-white/20">
            <img src="/public/icon.svg" alt="DPA Logo" className="w-full h-full object-contain" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs text-white leading-tight">Install Diran Peak App</h4>
            <p className="text-[11px] text-slate-300 leading-snug truncate">
              {isMobile ? 'Add to Home Screen for quick access' : 'Install on Laptop for offline itineraries'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={install}
              className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              Install
            </button>
            <button
              onClick={handleDismissBanner}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      );
    }

    if (isIOS) {
      return (
        <>
          <aside
            aria-label="Install iOS Web App"
            className="fixed bottom-4 left-4 z-40 max-w-sm bg-[#1a2b48] text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 animate-in slide-in-from-bottom duration-300 flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center p-2 shrink-0 border border-white/20">
              <img src="/public/icon.svg" alt="DPA Logo" className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-white leading-tight">Install on iPhone</h4>
              <p className="text-[11px] text-slate-300 leading-snug">Add to your home screen</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setShowIOSModal(true)}
                className="px-3 py-1.5 bg-[#5191fa] hover:bg-[#3d7be3] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                How to Install
              </button>
              <button
                onClick={handleDismissBanner}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {showIOSModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
              <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-800 relative">
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a2b48] flex items-center justify-center p-2 shadow-md">
                    <img src="/public/icon.svg" alt="DPA Icon" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2b48]">Install on iPhone / iPad</h3>
                    <p className="text-xs text-slate-500">Fast offline access &amp; instant booking</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      Tap the <strong className="text-slate-900 inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-[#5191fa]" /> Share</strong> icon in your Safari bottom bar.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      Scroll down and tap <strong className="text-slate-900 inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 text-[#5191fa]" /> Add to Home Screen</strong>.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5191fa] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      Tap <strong className="text-slate-900">Add</strong> in top right corner. The app will appear on your home screen!
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowIOSModal(false)}
                  className="w-full py-2.5 bg-[#1a2b48] hover:bg-[#253d66] text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Got It
                </button>
              </div>
            </div>
          )}
        </>
      );
    }
  }

  return null;
};
