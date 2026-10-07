import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, ArrowLeftRight, Store, Search, Check } from 'lucide-react';
import { Currency } from '../types/currency';
import { CURRENCIES, getCurrency } from '../data/currencies';
import { getExchangeRate, formatRatePrecision } from '../services/ratesService';

interface WatchlistTabProps {
  baseCurrency: Currency;
  rates: Record<string, number>;
  onSelectBase: () => void;
  onQuickConvert: (currency: Currency) => void;
  onQuickCheckChanger: (currency: Currency) => void;
}

export const WatchlistTab: React.FC<WatchlistTabProps> = ({
  baseCurrency,
  rates,
  onSelectBase,
  onQuickConvert,
  onQuickCheckChanger,
}) => {
  const [watchlistCodes, setWatchlistCodes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('xe_watchlist_codes');
      return saved
        ? JSON.parse(saved)
        : ['JPY', 'MYR', 'THB', 'EUR', 'USD', 'IDR', 'KRW', 'AUD', 'GBP', 'TWD'];
    } catch {
      return ['JPY', 'MYR', 'THB', 'EUR', 'USD', 'IDR', 'KRW', 'AUD', 'GBP', 'TWD'];
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleCode = (code: string) => {
    let updated: string[];
    if (watchlistCodes.includes(code)) {
      updated = watchlistCodes.filter((c) => c !== code);
    } else {
      updated = [...watchlistCodes, code];
    }
    setWatchlistCodes(updated);
    try {
      localStorage.setItem('xe_watchlist_codes', JSON.stringify(updated));
    } catch {}
  };

  const handleRemoveCode = (code: string) => {
    const updated = watchlistCodes.filter((c) => c !== code);
    setWatchlistCodes(updated);
    try {
      localStorage.setItem('xe_watchlist_codes', JSON.stringify(updated));
    } catch {}
  };

  // Filtered currencies for add modal
  const addableCurrencies = CURRENCIES.filter((c) => {
    if (c.code === baseCurrency.code) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 pb-8">
      {/* Base Currency Selector Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Currency Watchlist
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare mid-market rates against your primary home currency
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Currency</span>
          </button>
        </div>

        {/* Base Currency Active Pill/Button */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
          <div className="text-xs text-slate-500">Base Currency:</div>
          <button
            onClick={onSelectBase}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <span className="text-base select-none">{baseCurrency.flag}</span>
            <span className="font-mono">{baseCurrency.code}</span>
            <span className="text-slate-400 font-normal">({baseCurrency.name})</span>
            <span className="text-emerald-600 text-[10px] uppercase font-bold ml-1">Change</span>
          </button>
        </div>
      </div>

      {/* Watchlist Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {watchlistCodes
          .filter((code) => code !== baseCurrency.code)
          .map((code) => {
            const currency = getCurrency(code);
            const rate = getExchangeRate(rates, baseCurrency.code, currency.code);
            const inverseRate = rate > 0 ? 1 / rate : 0;

            // Deterministic 24h change simulated from code string
            const pseudoSeed = (code.charCodeAt(0) * 7 + code.charCodeAt(1) * 3) % 100;
            const change24h = ((pseudoSeed - 50) / 100) * 0.85;
            const isUp = change24h >= 0;

            return (
              <div
                key={code}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl select-none leading-none">{currency.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-slate-900 tracking-wide">
                          {currency.code}
                        </span>
                        <span className="text-xs text-slate-400">· {currency.symbol}</span>
                      </div>
                      <span className="text-xs text-slate-500 block truncate max-w-[140px]">
                        {currency.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isUp ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                      }`}
                    >
                      {isUp ? '+' : ''}{change24h.toFixed(2)}%
                    </span>
                    <button
                      onClick={() => handleRemoveCode(code)}
                      className="p-1 text-slate-300 hover:text-rose-600 transition-colors"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rate Display */}
                <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                  <div className="font-mono">
                    <div className="text-base font-extrabold text-slate-950 tabular-nums">
                      1 {baseCurrency.code} = {formatRatePrecision(rate)} {currency.code}
                    </div>
                    <div className="text-[11px] text-slate-400 tabular-nums">
                      1 {currency.code} = {formatRatePrecision(inverseRate)} {baseCurrency.code}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onQuickConvert(currency)}
                    className="py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200/60"
                  >
                    <ArrowLeftRight className="w-3 h-3 text-slate-500" />
                    <span>Convert</span>
                  </button>

                  <button
                    onClick={() => onQuickCheckChanger(currency)}
                    className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200/60"
                  >
                    <Store className="w-3 h-3 text-emerald-600" />
                    <span>Check Changer</span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Add Currency Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Add to Watchlist</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Done
              </button>
            </div>

            <div className="p-3 bg-slate-50 border-b border-slate-100">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search currencies to track..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-2 divide-y divide-slate-100">
              {addableCurrencies.map((c) => {
                const isSelected = watchlistCodes.includes(c.code);
                return (
                  <button
                    key={c.code}
                    onClick={() => handleToggleCode(c.code)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none leading-none">{c.flag}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {c.code}
                          </span>
                          <span className="text-[11px] text-slate-400">· {c.country}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{c.name}</span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
