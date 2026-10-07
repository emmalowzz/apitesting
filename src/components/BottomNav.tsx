import React from 'react';
import { ArrowLeftRight, Store, LineChart, Star } from 'lucide-react';
import { ActiveTab } from '../types/currency';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'converter' as ActiveTab,
      label: 'Convert',
      icon: ArrowLeftRight,
    },
    {
      id: 'changer' as ActiveTab,
      label: 'Changer Check',
      icon: Store,
    },
    {
      id: 'charts' as ActiveTab,
      label: 'Charts',
      icon: LineChart,
    },
    {
      id: 'watchlist' as ActiveTab,
      label: 'Watchlist',
      icon: Star,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 pb-safe md:hidden shadow-lg">
      <div className="grid grid-cols-4 items-center h-15 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 whitespace-nowrap font-medium ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
