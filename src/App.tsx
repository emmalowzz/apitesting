/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, Currency, RatesData } from './types/currency';
import { getCurrency } from './data/currencies';
import { FALLBACK_USD_RATES } from './data/fallbackRates';
import { fetchLiveRates } from './services/ratesService';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { CurrencyPickerModal } from './components/CurrencyPickerModal';
import { ConverterTab } from './components/ConverterTab';
import { ChangerCheckerTab } from './components/ChangerCheckerTab';
import { ChartsTab } from './components/ChartsTab';
import { WatchlistTab } from './components/WatchlistTab';
import { ApiHealthModal } from './components/ApiHealthModal';
import { Info, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('converter');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState<boolean>(false);

  // Currencies state
  const [fromCurrency, setFromCurrency] = useState<Currency>(() => getCurrency('USD'));
  const [toCurrency, setToCurrency] = useState<Currency>(() => getCurrency('SGD'));

  // Home & Foreign currencies for the Money Changer Checker
  const [homeCurrency, setHomeCurrency] = useState<Currency>(() => getCurrency('SGD'));
  const [foreignCurrency, setForeignCurrency] = useState<Currency>(() => getCurrency('JPY'));

  // Base currency for Watchlist
  const [baseCurrency, setBaseCurrency] = useState<Currency>(() => getCurrency('SGD'));

  // Exchange rates data state
  const [ratesData, setRatesData] = useState<RatesData>({
    base: 'USD',
    rates: FALLBACK_USD_RATES,
    lastUpdated: Date.now(),
    source: 'offline',
  });
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);

  // Picker modal state
  const [pickerTarget, setPickerTarget] = useState<
    'from' | 'to' | 'home' | 'foreign' | 'base' | null
  >(null);

  // Fetch live rates on mount
  const loadRates = useCallback(async () => {
    setIsLoadingRates(true);
    try {
      const data = await fetchLiveRates();
      setRatesData(data);
    } catch (err) {
      console.warn('Error loading exchange rates', err);
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  // Currency swap handlers
  const handleSwapConverter = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleSwapChanger = () => {
    setHomeCurrency(foreignCurrency);
    setForeignCurrency(homeCurrency);
  };

  // Bridge from Converter to Money Changer Checker
  const handleNavigateConverterToChanger = () => {
    setHomeCurrency(fromCurrency);
    setForeignCurrency(toCurrency);
    setActiveTab('changer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateConverterToCharts = () => {
    setActiveTab('charts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Watchlist quick actions
  const handleWatchlistQuickConvert = (target: Currency) => {
    setFromCurrency(baseCurrency);
    setToCurrency(target);
    setActiveTab('converter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWatchlistQuickChanger = (target: Currency) => {
    setHomeCurrency(baseCurrency);
    setForeignCurrency(target);
    setActiveTab('changer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Currency picker selection handler
  const handleSelectCurrency = (selected: Currency) => {
    if (pickerTarget === 'from') {
      setFromCurrency(selected);
    } else if (pickerTarget === 'to') {
      setToCurrency(selected);
    } else if (pickerTarget === 'home') {
      setHomeCurrency(selected);
    } else if (pickerTarget === 'foreign') {
      setForeignCurrency(selected);
    } else if (pickerTarget === 'base') {
      setBaseCurrency(selected);
    }
    setPickerTarget(null);
  };

  const getPickerTitle = () => {
    switch (pickerTarget) {
      case 'from':
        return 'Convert From';
      case 'to':
        return 'Convert To';
      case 'home':
        return 'Select Your Home Currency';
      case 'foreign':
        return 'Select Foreign Currency';
      case 'base':
        return 'Select Base Watchlist Currency';
      default:
        return 'Select Currency';
    }
  };

  const getCurrentlySelectedCode = () => {
    switch (pickerTarget) {
      case 'from':
        return fromCurrency.code;
      case 'to':
        return toCurrency.code;
      case 'home':
        return homeCurrency.code;
      case 'foreign':
        return foreignCurrency.code;
      case 'base':
        return baseCurrency.code;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Bar adhering to Top Bar Contract */}
      <TopBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lastUpdated={ratesData.lastUpdated}
        isLoading={isLoadingRates}
        onRefresh={loadRates}
        source={ratesData.source}
        onOpenHealth={() => setIsHealthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3 sm:px-6 pt-4 pb-20 md:pb-8">
        {/* Mobile Tab Pills for quick touch navigation at the top */}
        <div className="flex md:hidden items-center gap-1 p-1 bg-white rounded-xl border border-slate-200/80 mb-4 shadow-2xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('converter')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'converter'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Converter
          </button>
          <button
            onClick={() => setActiveTab('changer')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'changer'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Changer Check
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'charts'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'watchlist'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Watchlist
          </button>
        </div>

        {/* Tab 1: XE Currency Converter */}
        {activeTab === 'converter' && (
          <ConverterTab
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rates={ratesData.rates}
            onSelectFrom={() => setPickerTarget('from')}
            onSelectTo={() => setPickerTarget('to')}
            onSwap={handleSwapConverter}
            onNavigateToChanger={handleNavigateConverterToChanger}
            onNavigateToCharts={handleNavigateConverterToCharts}
          />
        )}

        {/* Tab 2: Money Changer Board Rate Checker */}
        {activeTab === 'changer' && (
          <ChangerCheckerTab
            homeCurrency={homeCurrency}
            foreignCurrency={foreignCurrency}
            rates={ratesData.rates}
            onSelectHome={() => setPickerTarget('home')}
            onSelectForeign={() => setPickerTarget('foreign')}
            onSwapCurrencies={handleSwapChanger}
          />
        )}

        {/* Tab 3: Historical Mid-Market Rate Charts */}
        {activeTab === 'charts' && (
          <ChartsTab
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rates={ratesData.rates}
            onSelectFrom={() => setPickerTarget('from')}
            onSelectTo={() => setPickerTarget('to')}
            onSwapCurrencies={handleSwapConverter}
          />
        )}

        {/* Tab 4: Currency Watchlist */}
        {activeTab === 'watchlist' && (
          <WatchlistTab
            baseCurrency={baseCurrency}
            rates={ratesData.rates}
            onSelectBase={() => setPickerTarget('base')}
            onQuickConvert={handleWatchlistQuickConvert}
            onQuickCheckChanger={handleWatchlistQuickChanger}
          />
        )}
      </main>

      {/* Footer conforming to anti-slop guidelines: quiet copyright and unboxed metadata */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 hidden md:block">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">XE RateCheck</span>
            <span>·</span>
            <span>Real-time mid-market foreign exchange & physical counter spread calculator</span>
          </div>
          <div className="text-slate-400">
            For travel reference · Rates refreshed continuously
          </div>
        </div>
      </footer>

      {/* Mobile Ergonomic Bottom Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Currency Selection Sheet / Modal */}
      <CurrencyPickerModal
        isOpen={pickerTarget !== null}
        onClose={() => setPickerTarget(null)}
        title={getPickerTitle()}
        selectedCode={getCurrentlySelectedCode()}
        onSelect={handleSelectCurrency}
      />

      {/* API Health & MAS Diagnostics Modal */}
      <ApiHealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />
    </div>
  );
}
