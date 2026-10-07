import React, { useState, useMemo } from 'react';
import {
  Store,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  Plus,
  Trash2,
  ArrowUpDown,
  HelpCircle,
  Award,
  CreditCard,
  Building,
  Info
} from 'lucide-react';
import { Currency, MoneyChangerQuote } from '../types/currency';
import { getExchangeRate, formatAmount, formatRatePrecision } from '../services/ratesService';

interface ChangerCheckerTabProps {
  homeCurrency: Currency;
  foreignCurrency: Currency;
  rates: Record<string, number>;
  onSelectHome: () => void;
  onSelectForeign: () => void;
  onSwapCurrencies: () => void;
  selectedBoothName?: string;
  onNavigateToNearby?: () => void;
}

export const ChangerCheckerTab: React.FC<ChangerCheckerTabProps> = ({
  homeCurrency,
  foreignCurrency,
  rates,
  onSelectHome,
  onSelectForeign,
  onSwapCurrencies,
  selectedBoothName,
  onNavigateToNearby,
}) => {
  // Mode: 'buy' = Traveler buying foreign cash with home currency
  // 'sell' = Traveler selling foreign cash to get home currency
  // 'spread' = Checking both We Buy & We Sell from board
  const [exchangeMode, setExchangeMode] = useState<'buy' | 'sell' | 'spread'>('buy');

  // Amount traveler plans to exchange
  const [amountInput, setAmountInput] = useState<string>('1000');

  // Money changer board rate input
  const [boardRateInput, setBoardRateInput] = useState<string>('');
  const [buyRateInput, setBuyRateInput] = useState<string>(''); // For dual spread check
  const [sellRateInput, setSellRateInput] = useState<string>('');

  // Unit multiplier: 1, 100, 1000 (common in Asia: JPY, IDR, KRW, VND quoted per 100)
  const [unitMultiplier, setUnitMultiplier] = useState<number>(() => {
    if (['JPY', 'KRW', 'IDR', 'VND'].includes(foreignCurrency.code)) {
      return 100;
    }
    return 1;
  });

  // Quotation style:
  // 'direct': 1 Home Currency = X Foreign Currency (e.g., 1 SGD = 114.5 JPY)
  // 'indirect': 1 Foreign Currency = Y Home Currency (e.g., 1 USD = 1.32 SGD, or 100 JPY = 0.88 SGD)
  const [quoteStyle, setQuoteStyle] = useState<'direct' | 'indirect'>('direct');

  // Saved booth quotes for comparison in current session
  const [savedQuotes, setSavedQuotes] = useState<MoneyChangerQuote[]>(() => {
    try {
      const stored = localStorage.getItem('xe_saved_changer_quotes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [boothNameInput, setBoothNameInput] = useState<string>(selectedBoothName || '');

  React.useEffect(() => {
    if (selectedBoothName) {
      setBoothNameInput(selectedBoothName);
    }
  }, [selectedBoothName]);

  // 1 Home Currency = midMarketDirect Foreign Currency
  const midMarketDirect = getExchangeRate(rates, homeCurrency.code, foreignCurrency.code);
  const midMarketIndirect = midMarketDirect > 0 ? 1 / midMarketDirect : 0;

  // Set default initial board rate estimate if empty
  React.useEffect(() => {
    if (!boardRateInput && midMarketDirect > 0) {
      // Prepopulate with a typical 2% street markup so the traveler sees how it works right away
      if (quoteStyle === 'direct') {
        const typical = exchangeMode === 'buy'
          ? (midMarketDirect * 0.98 * (unitMultiplier === 100 ? 1 : 1))
          : (midMarketDirect * 1.02);
        setBoardRateInput(formatRatePrecision(typical));
      } else {
        const typical = exchangeMode === 'buy'
          ? (midMarketIndirect * 1.02 * (unitMultiplier === 100 ? 100 : 1))
          : (midMarketIndirect * 0.98 * (unitMultiplier === 100 ? 100 : 1));
        setBoardRateInput(formatRatePrecision(typical));
      }
    }
  }, [foreignCurrency.code, homeCurrency.code, quoteStyle, unitMultiplier, exchangeMode]);

  // Calculations
  const numericAmount = parseFloat(amountInput) || 0;
  const numericBoardRate = parseFloat(boardRateInput) || 0;

  // Normalized effective rate: how many Foreign currency units per 1 Home currency unit
  const effectiveChangerRate = useMemo(() => {
    if (numericBoardRate <= 0) return 0;

    if (quoteStyle === 'direct') {
      // User says 1 Home = numericBoardRate Foreign
      // If multiplier is 100, they might mean "100 Home = numericBoardRate Foreign"
      return unitMultiplier === 100 ? numericBoardRate / 100 : numericBoardRate;
    } else {
      // User says 1 Foreign = numericBoardRate Home
      // If multiplier is 100 (e.g., 100 JPY costs 0.88 SGD)
      if (unitMultiplier === 100) {
        // 100 Foreign = numericBoardRate Home => 1 Foreign = numericBoardRate / 100 Home
        // 1 Home = 100 / numericBoardRate Foreign
        return 100 / numericBoardRate;
      }
      return 1 / numericBoardRate;
    }
  }, [numericBoardRate, quoteStyle, unitMultiplier]);

  // Inverse detection heuristic:
  // If effectiveChangerRate is off by more than 80% from mid-market, user probably entered inverse!
  const isSuspiciousInverted = useMemo(() => {
    if (effectiveChangerRate <= 0 || midMarketDirect <= 0) return false;
    const ratio = effectiveChangerRate / midMarketDirect;
    // If ratio is < 0.2 or > 5.0, high likelihood they typed inverted rate
    return ratio < 0.2 || ratio > 5.0;
  }, [effectiveChangerRate, midMarketDirect]);

  // Calculate payouts and markups
  const analysis = useMemo(() => {
    if (effectiveChangerRate <= 0 || numericAmount <= 0 || midMarketDirect <= 0) {
      return null;
    }

    let midMarketPayout = 0;
    let changerPayout = 0;
    let payoutCurrency = foreignCurrency;
    let spentCurrency = homeCurrency;

    if (exchangeMode === 'buy') {
      // User gives Home currency, receives Foreign Cash
      // Mid-market payout in Foreign Currency:
      midMarketPayout = numericAmount * midMarketDirect;
      changerPayout = numericAmount * effectiveChangerRate;
      payoutCurrency = foreignCurrency;
      spentCurrency = homeCurrency;
    } else {
      // User gives Foreign Cash, receives Home Currency
      // Mid-market payout in Home Currency:
      midMarketPayout = numericAmount * (1 / midMarketDirect);
      changerPayout = numericAmount * (1 / effectiveChangerRate);
      payoutCurrency = homeCurrency;
      spentCurrency = foreignCurrency;
    }

    // Cash loss to changer spread
    const rawLoss = midMarketPayout - changerPayout;
    const cashLoss = Math.max(0, rawLoss);
    const markupPercent = midMarketPayout > 0 ? (rawLoss / midMarketPayout) * 100 : 0;

    // Equivalent value of cash loss in home currency
    const lossInHomeCurrency = exchangeMode === 'buy'
      ? cashLoss * (1 / midMarketDirect)
      : cashLoss;

    // Rating tier
    let tier: 'excellent' | 'fair' | 'moderate' | 'expensive' | 'rip-off' = 'fair';
    let tierTitle = 'Decent Street Rate';
    let tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    let icon = CheckCircle2;
    let recommendation = 'Standard fair rate for a city money changer. Acceptable deal for physical cash.';

    if (markupPercent <= 0.8) {
      tier = 'excellent';
      tierTitle = 'Wholesale / Prime Rate (<0.8%)';
      tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
      icon = Award;
      recommendation = 'Exceptionally good rate! Matches central arcade wholesale booths. Highly recommended to exchange here.';
    } else if (markupPercent <= 2.2) {
      tier = 'fair';
      tierTitle = 'Competitive Street Rate (0.8% - 2.2%)';
      tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      icon = CheckCircle2;
      recommendation = 'Fair pricing for physical travel cash. Very reasonable margin for a retail kiosk.';
    } else if (markupPercent <= 4.0) {
      tier = 'moderate';
      tierTitle = 'Moderate Markup (2.2% - 4.0%)';
      tierColor = 'text-amber-800 bg-amber-50 border-amber-200';
      icon = AlertTriangle;
      recommendation = 'Noticeable spread. Acceptable if you need small pocket cash, but larger amounts will cost extra.';
    } else if (markupPercent <= 6.5) {
      tier = 'expensive';
      tierTitle = 'High Fee / Poor (4.0% - 6.5%)';
      tierColor = 'text-orange-800 bg-orange-50 border-orange-200';
      icon = ShieldAlert;
      recommendation = 'Expensive markup. Common in transit hubs and hotels. Check neighboring booths if available.';
    } else {
      tier = 'rip-off';
      tierTitle = 'Airport Rip-Off Alert (>6.5%)';
      tierColor = 'text-rose-800 bg-rose-50 border-rose-300';
      icon = XCircle;
      recommendation = 'Severe markup! Typical of airside gates and tourist traps. Avoid exchanging large amounts here.';
    }

    return {
      midMarketPayout,
      changerPayout,
      cashLoss,
      lossInHomeCurrency,
      markupPercent,
      tier,
      tierTitle,
      tierColor,
      icon,
      recommendation,
      payoutCurrency,
      spentCurrency,
    };
  }, [
    effectiveChangerRate,
    numericAmount,
    midMarketDirect,
    exchangeMode,
    homeCurrency,
    foreignCurrency,
  ]);

  // Dual Board Spread calculations (when user inputs both Buy and Sell)
  const spreadAnalysis = useMemo(() => {
    const buyVal = parseFloat(buyRateInput);
    const sellVal = parseFloat(sellRateInput);
    if (!buyVal || !sellVal || buyVal <= 0 || sellVal <= 0) return null;

    // Both rates usually quoted in same direction on a board:
    // Buy = Changer buys foreign from you (gives you fewer home currency)
    // Sell = Changer sells foreign to you (charges you more home currency)
    const mid = (buyVal + sellVal) / 2;
    const spreadGap = Math.abs(sellVal - buyVal);
    const spreadPct = (spreadGap / mid) * 100;

    return {
      buyVal,
      sellVal,
      mid,
      spreadGap,
      spreadPct,
    };
  }, [buyRateInput, sellRateInput]);

  const handleSaveCurrentQuote = () => {
    if (!analysis || numericBoardRate <= 0) return;
    const newQuote: MoneyChangerQuote = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      boothName: boothNameInput.trim() || `Booth #${savedQuotes.length + 1}`,
      fromCurrency: homeCurrency.code,
      toCurrency: foreignCurrency.code,
      mode: exchangeMode === 'spread' ? 'buy' : exchangeMode,
      offeredRate: numericBoardRate,
      unitsMultiplier: unitMultiplier,
      midMarketRate: midMarketDirect,
      markupPercent: analysis.markupPercent,
      amountToExchange: numericAmount,
      payoutAmount: analysis.changerPayout,
      midMarketPayout: analysis.midMarketPayout,
      cashDifference: analysis.cashLoss,
      ratingTier: analysis.tier,
      createdAt: Date.now(),
    };

    const updated = [newQuote, ...savedQuotes];
    setSavedQuotes(updated);
    setBoothNameInput('');
    try {
      localStorage.setItem('xe_saved_changer_quotes', JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteSavedQuote = (id: string) => {
    const updated = savedQuotes.filter((q) => q.id !== id);
    setSavedQuotes(updated);
    try {
      localStorage.setItem('xe_saved_changer_quotes', JSON.stringify(updated));
    } catch {}
  };

  const handleFixInversion = () => {
    // Invert the style or calculate the inverted number
    setQuoteStyle(quoteStyle === 'direct' ? 'indirect' : 'direct');
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Top Explainer Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-600" />
              <span>Physical Money Changer Checker</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Stand in front of the kiosk board, enter their rate, and immediately uncover the hidden spread markup.
            </p>
          </div>

          {onNavigateToNearby && (
            <button
              onClick={onNavigateToNearby}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-colors shrink-0 self-start sm:self-auto"
            >
              <Building className="w-3.5 h-3.5 text-emerald-700" />
              <span>Find Nearby Counters</span>
            </button>
          )}
        </div>

        {/* Currency Pair Selector Bar */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Home Currency */}
            <button
              onClick={onSelectHome}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 hover:border-slate-300 transition-colors"
            >
              <span className="text-base">{homeCurrency.flag}</span>
              <span className="font-mono">{homeCurrency.code}</span>
              <span className="text-[10px] text-slate-400 font-normal">Home</span>
            </button>

            <span className="text-slate-300">vs</span>

            {/* Foreign Currency */}
            <button
              onClick={onSelectForeign}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 hover:border-slate-300 transition-colors"
            >
              <span className="text-base">{foreignCurrency.flag}</span>
              <span className="font-mono">{foreignCurrency.code}</span>
              <span className="text-[10px] text-slate-400 font-normal">Foreign</span>
            </button>
          </div>

          <button
            onClick={onSwapCurrencies}
            title="Swap Home and Foreign"
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Mid-Market Benchmark Banner */}
        <div className="mt-3 flex items-center justify-between text-xs px-3 py-2 bg-slate-900 text-white rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">Official Mid-Market:</span>
          </div>
          <div className="font-mono font-bold text-emerald-400 tabular-nums">
            1 {homeCurrency.code} = {formatRatePrecision(midMarketDirect)} {foreignCurrency.code}
          </div>
        </div>
      </div>

      {/* Main Analysis Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 space-y-5">
        {/* Step 1: Exchange Mode Selector Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            What are you doing at the counter?
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setExchangeMode('buy')}
              className={`py-2 px-2 rounded-lg transition-all text-center ${
                exchangeMode === 'buy'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buying Cash
              <span className="block text-[10px] text-slate-400 font-normal">
                Have {homeCurrency.code} → Want {foreignCurrency.code}
              </span>
            </button>

            <button
              onClick={() => setExchangeMode('sell')}
              className={`py-2 px-2 rounded-lg transition-all text-center ${
                exchangeMode === 'sell'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Selling Leftovers
              <span className="block text-[10px] text-slate-400 font-normal">
                Have {foreignCurrency.code} → Want {homeCurrency.code}
              </span>
            </button>

            <button
              onClick={() => setExchangeMode('spread')}
              className={`py-2 px-2 rounded-lg transition-all text-center ${
                exchangeMode === 'spread'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Board Spread
              <span className="block text-[10px] text-slate-400 font-normal">
                Check Buy & Sell gap
              </span>
            </button>
          </div>
        </div>

        {/* Step 2: Amount to Exchange */}
        {exchangeMode !== 'spread' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Amount you plan to exchange
              </label>
              <span className="text-xs font-mono text-slate-400">
                {exchangeMode === 'buy' ? homeCurrency.code : foreignCurrency.code}
              </span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                {exchangeMode === 'buy' ? homeCurrency.symbol : foreignCurrency.symbol}
              </span>
              <input
                type="number"
                inputMode="decimal"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="1000"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all tabular-nums"
              />
            </div>
          </div>
        )}

        {/* Step 3: Money Changer Board Rate Input */}
        {exchangeMode !== 'spread' ? (
          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span>Rate on the Changer's Board / Screen</span>
              </label>

              {/* Quotation Style toggle */}
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setQuoteStyle('direct')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    quoteStyle === 'direct'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  1 {homeCurrency.code} = X {foreignCurrency.code}
                </button>
                <button
                  type="button"
                  onClick={() => setQuoteStyle('indirect')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    quoteStyle === 'indirect'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {unitMultiplier === 100 ? '100' : '1'} {foreignCurrency.code} costs Y {homeCurrency.code}
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={boardRateInput}
                onChange={(e) => setBoardRateInput(e.target.value)}
                placeholder={quoteStyle === 'direct' ? formatRatePrecision(midMarketDirect) : formatRatePrecision(midMarketIndirect)}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-emerald-500/40 rounded-xl text-xl font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all tabular-nums"
              />
            </div>

            {/* Units Multiplier (Per 100 Units, very common for JPY, THB, IDR, KRW, VND) */}
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-slate-500">Is the rate quoted per 100 units?</span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setUnitMultiplier(1)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    unitMultiplier === 1
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Per 1 Unit
                </button>
                <button
                  onClick={() => setUnitMultiplier(100)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    unitMultiplier === 100
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Per 100 Units
                </button>
              </div>
            </div>

            {/* Inversion Warning Heuristic */}
            {isSuspiciousInverted && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold">Possible inverted rate detected!</span>
                  <p className="mt-0.5 text-amber-800">
                    Your entered rate ({boardRateInput}) is drastically different from the mid-market benchmark ({formatRatePrecision(midMarketDirect)}). Did the board quote in the reverse direction?
                  </p>
                  <button
                    onClick={handleFixInversion}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>Switch Quotation Style</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Dual Board Check Mode: Input both We Buy and We Sell */
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  "WE BUY" Rate on board
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={buyRateInput}
                  onChange={(e) => setBuyRateInput(e.target.value)}
                  placeholder="e.g. 1.310"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  What changer gives you when you sell cash
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  "WE SELL" Rate on board
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={sellRateInput}
                  onChange={(e) => setSellRateInput(e.target.value)}
                  placeholder="e.g. 1.365"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  What changer charges you when you buy cash
                </span>
              </div>
            </div>

            {spreadAnalysis && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Changer's Bid-Ask Spread Gap:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {spreadAnalysis.spreadPct.toFixed(2)}% margin
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Changer's Implied Mid-Market:</span>
                  <span className="font-mono font-bold text-white">
                    {spreadAnalysis.mid.toFixed(4)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  {spreadAnalysis.spreadPct < 1.5
                    ? '🟢 Outstanding tight spread! High-volume competitive changer.'
                    : spreadAnalysis.spreadPct < 4.0
                    ? '🟡 Normal retail spread for high street exchange kiosks.'
                    : '🔴 Very wide spread! The counter is pocketing high margins on both sides.'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: The Core Competitiveness Verdict Card */}
        {analysis && exchangeMode !== 'spread' && (
          <div className="pt-2 border-t border-slate-100 space-y-4">
            {/* Verdict Header Badge */}
            <div className={`p-4 rounded-2xl border ${analysis.tierColor} transition-all`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <analysis.icon className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider block">
                      Verdict on this Rate
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight mt-0.5">
                      {analysis.tierTitle}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Hidden Markup</span>
                  <span className="text-lg sm:text-xl font-black font-mono tracking-tight tabular-nums">
                    +{analysis.markupPercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Visual Meter Bar */}
              <div className="mt-3">
                <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-500 ${
                      analysis.tier === 'excellent'
                        ? 'bg-emerald-500 w-[15%]'
                        : analysis.tier === 'fair'
                        ? 'bg-emerald-600 w-[35%]'
                        : analysis.tier === 'moderate'
                        ? 'bg-amber-500 w-[60%]'
                        : analysis.tier === 'expensive'
                        ? 'bg-orange-500 w-[80%]'
                        : 'bg-rose-600 w-[100%]'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>0% (Interbank)</span>
                  <span>2% (Fair)</span>
                  <span>4% (High)</span>
                  <span>6%+ (Rip-off)</span>
                </div>
              </div>

              <p className="text-xs mt-3 leading-relaxed opacity-95">
                {analysis.recommendation}
              </p>
            </div>

            {/* Cash Impact Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cash Comparison Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Mid-Market payout */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                  <span className="text-slate-500 block mb-0.5">
                    True Mid-Market Payout:
                  </span>
                  <div className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                    {formatAmount(analysis.midMarketPayout, analysis.payoutCurrency.code)}{' '}
                    <span className="text-xs font-semibold text-slate-600">
                      {analysis.payoutCurrency.code}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Theoretical 0% fee benchmark
                  </span>
                </div>

                {/* Changer payout */}
                <div className="p-3 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                  <span className="text-slate-500 block mb-0.5">
                    This Changer Hands You:
                  </span>
                  <div className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                    {formatAmount(analysis.changerPayout, analysis.payoutCurrency.code)}{' '}
                    <span className="text-xs font-semibold text-slate-600">
                      {analysis.payoutCurrency.code}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Actual cash in your hand
                  </span>
                </div>
              </div>

              {/* Cash Lost / Retained */}
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <span className="font-bold text-rose-950">Spread Cost / Cash Loss:</span>
                    <span className="text-[11px] text-rose-700 block">
                      Money kept by the money changer
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-sm font-extrabold text-rose-700 tabular-nums">
                    -{formatAmount(analysis.cashLoss, analysis.payoutCurrency.code)} {analysis.payoutCurrency.code}
                  </div>
                  <div className="text-[11px] text-rose-600">
                    ≈ -{formatAmount(analysis.lossInHomeCurrency, homeCurrency.code)} {homeCurrency.code}
                  </div>
                </div>
              </div>
            </div>

            {/* Alternatives Comparison: How Does It Stack Up? */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                How this counter compares to alternatives:
              </h4>

              <div className="space-y-2 text-xs">
                {/* This Money Changer */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-slate-700" />
                    <div>
                      <span className="font-bold text-slate-900">This Money Changer</span>
                      <span className="text-[10px] text-slate-500 block">Immediate physical cash</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-slate-900">
                      +{analysis.markupPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Wholesale Arcade Changer */}
                <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-950">City Wholesale Arcade</span>
                      <span className="text-[10px] text-emerald-700 block">Mustafa / Arcade / SuperRich</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-emerald-800">~0.5% – 0.8%</span>
                    <span className="text-[10px] text-emerald-600 block">Best cash rate</span>
                  </div>
                </div>

                {/* Travel Card */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="font-bold text-slate-900">Travel Multi-Currency Card</span>
                      <span className="text-[10px] text-slate-500 block">Wise / Revolut card payments</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-slate-900">~0.4% – 0.5%</span>
                    <span className="text-[10px] text-slate-500 block">Lowest FX margin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save This Quote for Multi-Booth Comparison */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Comparing multiple counters in the area?
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Save this quote to your session comparison board to rank which booth gives the highest cash payout.
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Booth name (e.g., Booth 3 near Gates, Mustafa #2)"
                  value={boothNameInput}
                  onChange={(e) => setBoothNameInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSaveCurrentQuote}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Quote</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Saved Booth Comparison Leaderboard */}
      {savedQuotes.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Booth Comparison Leaderboard ({savedQuotes.length})
              </h3>
              <p className="text-xs text-slate-500">
                Ranked by lowest markup and highest cash payout
              </p>
            </div>
            <button
              onClick={() => {
                setSavedQuotes([]);
                localStorage.removeItem('xe_saved_changer_quotes');
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2.5">
            {savedQuotes
              .slice()
              .sort((a, b) => a.markupPercent - b.markupPercent)
              .map((quote, idx) => {
                const isWinner = idx === 0;
                return (
                  <div
                    key={quote.id}
                    className={`p-3 rounded-xl border transition-all ${
                      isWinner
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {isWinner && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase">
                              Best Rate
                            </span>
                          )}
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {quote.boothName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                          Offered: {quote.offeredRate} ({quote.fromCurrency} → {quote.toCurrency})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono">
                          <span
                            className={`text-xs font-bold block ${
                              quote.markupPercent <= 1.5
                                ? 'text-emerald-700'
                                : quote.markupPercent <= 4.0
                                ? 'text-amber-700'
                                : 'text-rose-700'
                            }`}
                          >
                            +{quote.markupPercent.toFixed(2)}% markup
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Payout: {formatAmount(quote.payoutAmount, quote.toCurrency)} {quote.toCurrency}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteSavedQuote(quote.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
