import React from 'react';
import { RefreshCw, Radio } from 'lucide-react';
import { ActiveTab } from '../types/currency';

interface TopBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  lastUpdated: number;
  isLoading: boolean;
  onRefresh: () => void;
  source: 'live' | 'cache' | 'offline';
  onOpenHealth: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  lastUpdated,
  isLoading,
  onRefresh,
  source,
  onOpenHealth,
}) => {
  const formatTime = (ts: number) => {
    if (!ts) return 'Just now';
    const mins = Math.max(0, Math.floor((Date.now() - ts) / 60000));
    if (mins === 0) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
              XE
            </span>
            <span>RateCheck</span>
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">· Mid-Market FX</span>
        </div>

        {/* Zone 2: Navigation Links (Clean desktop/tablet navigation) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <button
            onClick={() => onTabChange('converter')}
            className={`transition-colors hover:text-white ${
              activeTab === 'converter' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Converter
          </button>
          <button
            onClick={() => onTabChange('changer')}
            className={`transition-colors hover:text-white ${
              activeTab === 'changer' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Rate Checker
          </button>
          <button
            onClick={() => onTabChange('nearby')}
            className={`transition-colors hover:text-white ${
              activeTab === 'nearby' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Nearby Changers
          </button>
          <button
            onClick={() => onTabChange('charts')}
            className={`transition-colors hover:text-white ${
              activeTab === 'charts' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Historical Charts
          </button>
          <button
            onClick={() => onTabChange('watchlist')}
            className={`transition-colors hover:text-white ${
              activeTab === 'watchlist' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Watchlist
          </button>
        </nav>

        {/* Zone 3: Live Rate Status & Refresh */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHealth}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
            title="Inspect API Health & MAS status"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                source === 'live'
                  ? 'bg-emerald-400 animate-pulse'
                  : source === 'cache'
                  ? 'bg-amber-400'
                  : 'bg-slate-500'
              }`}
            />
            <span className="hidden sm:inline font-mono">API Health</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh exchange rates"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition-all disabled:opacity-50"
            aria-label="Refresh rates"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
