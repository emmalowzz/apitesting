import React, { useState } from 'react';
import { ArrowLeftRight, ChevronDown, Info, ShieldAlert, Sparkles, Store, TrendingUp } from 'lucide-react';
import { Currency } from '../types/currency';
import { getCurrency } from '../data/currencies';
import { formatAmount, formatRatePrecision, getExchangeRate } from '../services/ratesService';

interface ConverterTabProps {
  fromCurrency: Currency;
  toCurrency: Currency;
  rates: Record<string, number>;
  onSelectFrom: () => void;
  onSelectTo: () => void;
  onSwap: () => void;
  onNavigateToChanger: () => void;
  onNavigateToCharts: () => void;
}

export const ConverterTab: React.FC<ConverterTabProps> = ({
  fromCurrency,
  toCurrency,
  rates,
  onSelectFrom,
  onSelectTo,
  onSwap,
  onNavigateToChanger,
  onNavigateToCharts,
}) => {
  const [amountInput, setAmountInput] = useState<string>('1000');
  const [activeTableTab, setActiveTableTab] = useState<'fromTo' | 'toFrom'>('fromTo');

  const numericAmount = parseFloat(amountInput) || 0;
  const rate = getExchangeRate(rates, fromCurrency.code, toCurrency.code);
  const inverseRate = rate > 0 ? 1 / rate : 0;
  const convertedAmount = numericAmount * rate;

  const quickAmounts = [100, 500, 1000, 5000];

  const travelUnits = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 5000];

  return (
    <div className="space-y-4 pb-8">
      {/* Main Converter Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">XE Currency Converter</h1>
            <p className="text-xs text-slate-300">
              Live mid-market exchange rate · Interbank pricing
            </p>
          </div>
          <button
            onClick={onNavigateToCharts}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-lg transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Chart</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5">
          {/* Amount Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Amount
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {fromCurrency.symbol} ({fromCurrency.code})
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold text-lg">
                {fromCurrency.symbol}
              </div>
              <input
                type="number"
                inputMode="decimal"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="1000"
                className="w-full pl-9 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xl sm:text-2xl font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all tabular-nums"
              />
              {amountInput && (
                <button
                  onClick={() => setAmountInput('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-2 mt-2.5 overflow-x-auto scrollbar-none">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmountInput(amt.toString())}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                    numericAmount === amt
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Currency Selectors & Swap Button */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
            {/* From Currency Picker Button */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                From
              </label>
              <button
                onClick={onSelectFrom}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors min-h-[52px] group text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl select-none leading-none">{fromCurrency.flag}</span>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-slate-900 font-mono tracking-wide block">
                      {fromCurrency.code}
                    </span>
                    <span className="text-xs text-slate-500 truncate block">
                      {fromCurrency.name}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 ml-2" />
              </button>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center sm:pt-6">
              <button
                onClick={onSwap}
                title="Swap currencies"
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 flex items-center justify-center text-slate-700 transition-all shadow-sm"
                aria-label="Swap currencies"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To Currency Picker Button */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                To
              </label>
              <button
                onClick={onSelectTo}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors min-h-[52px] group text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl select-none leading-none">{toCurrency.flag}</span>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-slate-900 font-mono tracking-wide block">
                      {toCurrency.code}
                    </span>
                    <span className="text-xs text-slate-500 truncate block">
                      {toCurrency.name}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 shrink-0 ml-2" />
              </button>
            </div>
          </div>

          {/* XE Authentic Conversion Result Hero */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-1">
              <span className="font-mono tabular-nums font-semibold text-slate-700">
                {formatAmount(numericAmount, fromCurrency.code)} {fromCurrency.code}
              </span>{' '}
              =
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight tabular-nums">
                {formatAmount(convertedAmount, toCurrency.code)}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-800">
                {toCurrency.name}
              </span>
            </div>

            {/* Sub-rates: direct & inverted */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 tabular-nums">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">1 {fromCurrency.code} =</span>
                <span className="font-bold text-slate-900">
                  {formatRatePrecision(rate)} {toCurrency.code}
                </span>
              </div>
              <div className="flex items-center justify-between sm:border-l sm:border-slate-200 sm:pl-3">
                <span className="text-slate-400">1 {toCurrency.code} =</span>
                <span className="font-bold text-slate-900">
                  {formatRatePrecision(inverseRate)} {fromCurrency.code}
                </span>
              </div>
            </div>
          </div>

          {/* XE Mid-market Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold">XE Mid-Market Rate Notice:</span> This is the real interbank exchange rate, shown for informational reference. Physical money changers, airport booths, and cash kiosks always apply a markup or spread to this rate.
            </div>
          </div>

          {/* Money Changer Checker Bridge Button */}
          <button
            onClick={onNavigateToChanger}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 text-sm"
          >
            <Store className="w-4 h-4" />
            <span>Check Rate at Physical Money Changer</span>
          </button>
        </div>
      </div>

      {/* Travel Conversion Tables (XE Feature) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Travel Conversion Table</h2>
          </div>
          {/* Segmented filter tab */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTableTab('fromTo')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTableTab === 'fromTo'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {fromCurrency.code} → {toCurrency.code}
            </button>
            <button
              onClick={() => setActiveTableTab('toFrom')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTableTab === 'toFrom'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {toCurrency.code} → {fromCurrency.code}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-slate-500 mb-3">
            Quick reference for cash bills and pocket spending while traveling:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {travelUnits.map((unit) => {
              const converted =
                activeTableTab === 'fromTo' ? unit * rate : unit * inverseRate;
              const sourceCode =
                activeTableTab === 'fromTo' ? fromCurrency.code : toCurrency.code;
              const targetCode =
                activeTableTab === 'fromTo' ? toCurrency.code : fromCurrency.code;

              return (
                <div
                  key={unit}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
                >
                  <span className="font-mono text-slate-400 font-medium">
                    {unit.toLocaleString()} {sourceCode}
                  </span>
                  <span className="font-mono font-bold text-slate-900 mt-1 tabular-nums">
                    {formatAmount(converted, targetCode, { maximumFractionDigits: 2 })} {targetCode}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
