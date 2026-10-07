import React, { useState, useMemo } from 'react';
import { Search, X, Check } from 'lucide-react';
import { Currency } from '../types/currency';
import { CURRENCIES } from '../data/currencies';

interface CurrencyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCode: string;
  onSelect: (currency: Currency) => void;
  title?: string;
}

export const CurrencyPickerModal: React.FC<CurrencyPickerModalProps> = ({
  isOpen,
  onClose,
  selectedCode,
  onSelect,
  title = 'Select Currency',
}) => {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState<'All' | 'Popular' | 'Asia' | 'Europe' | 'Americas'>('All');

  const filteredCurrencies = useMemo(() => {
    let list = CURRENCIES;

    if (regionFilter === 'Popular') {
      list = list.filter((c) => c.popular);
    } else if (regionFilter !== 'All') {
      list = list.filter((c) => c.region === regionFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
      );
    }

    return list;
  }, [search, regionFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet / Modal Container */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col shadow-2xl overflow-hidden z-10 border border-slate-200">
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3 sm:hidden" />

        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by code, country, or currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs">
            {(['All', 'Popular', 'Asia', 'Europe', 'Americas'] as const).map((region) => (
              <button
                key={region}
                onClick={() => setRegionFilter(region)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  regionFilter === region
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Currency List */}
        <div className="overflow-y-auto flex-1 p-2 divide-y divide-slate-100 overscroll-contain">
          {filteredCurrencies.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No currencies match "{search}"
            </div>
          ) : (
            filteredCurrencies.map((c) => {
              const isSelected = c.code === selectedCode;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    onSelect(c);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl min-h-[52px] text-left transition-colors ${
                    isSelected
                      ? 'bg-emerald-50/80 text-emerald-950 font-medium'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl leading-none select-none">{c.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm tracking-wide text-slate-900 font-mono">
                          {c.code}
                        </span>
                        <span className="text-xs text-slate-400 truncate">
                          {c.symbol}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">
                        {c.name} · {c.country}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
