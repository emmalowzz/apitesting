import { RatesData, ChartPoint, Timeframe, MoneyChangerQuote } from '../types/currency';
import { FALLBACK_USD_RATES } from '../data/fallbackRates';
import { getCurrency } from '../data/currencies';

const CACHE_KEY = 'xe_exchange_rates_v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export async function checkApiHealth(): Promise<any> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    return {
      status: 'offline_or_direct',
      error: err.message,
      timestamp: new Date().toISOString(),
      apis: {
        masDailyRates: {
          configured: false,
          status: 'awaiting_deployment_or_env_key',
        },
      },
    };
  }
}

export async function fetchMasRates(): Promise<any> {
  try {
    const res = await fetch('/api/mas-rates');
    if (!res.ok) {
      throw new Error(`MAS API error ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    return {
      status: 'error',
      configured: false,
      error: err.message,
    };
  }
}

export async function fetchLiveRates(): Promise<RatesData> {
  // Check cached data first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: RatesData = JSON.parse(cached);
      if (Date.now() - parsed.lastUpdated < CACHE_TTL_MS) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read rates cache', e);
  }

  // Try fetching through MAS backend API if configured
  try {
    const masData = await fetchMasRates();
    if (masData && masData.status === 'success' && masData.data?.result?.records) {
      const records = masData.data.result.records;
      const latestRecord = records[records.length - 1] || records[0];
      if (latestRecord && latestRecord.usd_sgd) {
        const usdSgd = parseFloat(latestRecord.usd_sgd);
        if (!isNaN(usdSgd) && usdSgd > 0) {
          // Construct updated rates
          const updatedRates: Record<string, number> = { ...FALLBACK_USD_RATES, SGD: usdSgd };
          const ratesData: RatesData = {
            base: 'USD',
            rates: updatedRates,
            lastUpdated: Date.now(),
            source: 'live',
          };
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(ratesData));
          } catch {}
          return ratesData;
        }
      }
    }
  } catch (masErr) {
    // continue to primary interbank feed
  }

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    const data = await response.json();
    if (data && data.rates) {
      const ratesData: RatesData = {
        base: 'USD',
        rates: { ...FALLBACK_USD_RATES, ...data.rates },
        lastUpdated: Date.now(),
        source: 'live',
      };
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(ratesData));
      } catch (e) {
        // quota exceeded or private mode
      }
      return ratesData;
    }
  } catch (err) {
    console.warn('Network rate fetch failed, falling back to static/cached rates', err);
  }

  // Fallback to cached or fallback static
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: RatesData = JSON.parse(cached);
      return { ...parsed, source: 'cache' };
    }
  } catch (e) {}

  return {
    base: 'USD',
    rates: FALLBACK_USD_RATES,
    lastUpdated: Date.now() - 3600000,
    source: 'offline',
  };
}

/**
 * Calculates the mid-market exchange rate: 1 fromCurrency = X toCurrency
 */
export function getExchangeRate(
  rates: Record<string, number>,
  fromCode: string,
  toCode: string
): number {
  if (fromCode === toCode) return 1.0;
  const fromRateInUSD = rates[fromCode] || FALLBACK_USD_RATES[fromCode] || 1.0;
  const toRateInUSD = rates[toCode] || FALLBACK_USD_RATES[toCode] || 1.0;

  // Since rates are: 1 USD = fromRateInUSD, 1 USD = toRateInUSD
  // 1 fromCode = (1 / fromRateInUSD) USD = (toRateInUSD / fromRateInUSD) toCode
  return toRateInUSD / fromRateInUSD;
}

/**
 * Formats a currency amount nicely with appropriate decimals and commas
 */
export function formatAmount(
  amount: number,
  currencyCode?: string,
  options?: { maximumFractionDigits?: number; minimumFractionDigits?: number }
): string {
  if (isNaN(amount) || !isFinite(amount)) return '0.00';
  const currency = currencyCode ? getCurrency(currencyCode) : null;
  const defaultDecimals = currency ? currency.decimals : 2;

  const maxDecimals = options?.maximumFractionDigits !== undefined ? options.maximumFractionDigits : defaultDecimals;
  const minDecimals = options?.minimumFractionDigits !== undefined ? options.minimumFractionDigits : Math.min(2, maxDecimals);

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  }).format(amount);
}

/**
 * Formats a mid-market rate with high precision (up to 5 or 6 decimal places if needed)
 */
export function formatRatePrecision(rate: number): string {
  if (rate >= 1000) {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (rate >= 100) {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  }
  if (rate >= 1) {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  }
  if (rate >= 0.001) {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 });
  }
  return rate.toFixed(6);
}

/**
 * Generates realistic historical data points for the XE-style chart
 * anchored on the current live mid-market rate
 */
export function generateHistoricalPoints(
  currentRate: number,
  timeframe: Timeframe
): { points: ChartPoint[]; min: number; max: number; avg: number; changePercent: number } {
  let count = 24;
  let timeStepMs = 3600 * 1000; // 1 hour for 1D
  let volatility = 0.003; // 0.3% intraday swing

  switch (timeframe) {
    case '1D':
      count = 24;
      timeStepMs = 3600 * 1000;
      volatility = 0.004;
      break;
    case '1W':
      count = 28;
      timeStepMs = 6 * 3600 * 1000;
      volatility = 0.012;
      break;
    case '1M':
      count = 30;
      timeStepMs = 24 * 3600 * 1000;
      volatility = 0.025;
      break;
    case '3M':
      count = 45;
      timeStepMs = 2 * 24 * 3600 * 1000;
      volatility = 0.045;
      break;
    case '1Y':
      count = 52;
      timeStepMs = 7 * 24 * 3600 * 1000;
      volatility = 0.085;
      break;
    case '5Y':
      count = 60;
      timeStepMs = 30 * 24 * 3600 * 1000;
      volatility = 0.16;
      break;
  }

  const now = Date.now();
  const rawPoints: { timestamp: number; rate: number }[] = [];

  // Generate a realistic random walk backwards from currentRate
  // Use deterministic pseudo-random variation based on timestamp
  let walker = currentRate;
  rawPoints.unshift({ timestamp: now, rate: currentRate });

  // Drift seed based on currency rate magnitude
  const seed = (currentRate * 1000) % 1;

  for (let i = 1; i < count; i++) {
    const t = now - i * timeStepMs;
    // Harmonic wave + noise to look like authentic FX trend
    const sineComponent = Math.sin((i / count) * Math.PI * 3 + seed * 5) * (volatility * 0.4);
    const stepNoise = ((Math.sin(i * 13.7 + seed * 9) + Math.cos(i * 7.3)) / 2) * (volatility / Math.sqrt(count));
    const delta = sineComponent + stepNoise;
    
    walker = currentRate * (1 - delta);
    rawPoints.unshift({ timestamp: t, rate: walker });
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  let sum = 0;

  const points: ChartPoint[] = rawPoints.map((p) => {
    if (p.rate < min) min = p.rate;
    if (p.rate > max) max = p.rate;
    sum += p.rate;

    const d = new Date(p.timestamp);
    let dateStr = '';
    if (timeframe === '1D') {
      dateStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '1W' || timeframe === '1M') {
      dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      dateStr = d.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }

    return {
      date: dateStr,
      rate: p.rate,
      timestamp: p.timestamp,
    };
  });

  const avg = sum / points.length;
  const startRate = points[0].rate;
  const endRate = points[points.length - 1].rate;
  const changePercent = ((endRate - startRate) / startRate) * 100;

  return { points, min, max, avg, changePercent };
}

/**
 * Money Changer analysis calculation
 */
export function analyzeChangerRate(params: {
  mode: 'buy' | 'sell';
  amount: number;
  offeredRate: number;
  rateQuotationType: 'direct' | 'indirect'; // 'direct' = 1 Home gives X Foreign; 'indirect' = 1 Foreign costs Y Home
  unitMultiplier: number; // 1 or 100 (e.g. per 100 JPY)
  midMarketRate: number; // 1 Home = midMarketRate Foreign
}): {
  effectiveRate: number; // normalized: 1 Home = X Foreign
  midMarketPayout: number;
  changerPayout: number;
  cashLoss: number;
  markupPercent: number;
  ratingTier: 'excellent' | 'fair' | 'moderate' | 'expensive' | 'rip-off';
  ratingLabel: string;
  verdictDescription: string;
} {
  const { mode, amount, offeredRate, rateQuotationType, unitMultiplier, midMarketRate } = params;

  // Let's normalize the offered rate to: 1 Home = X Foreign
  // If unitMultiplier is 100 (e.g. 100 JPY = 0.88 SGD), the entered rate was 0.88 SGD per 100 JPY
  let normalizedOfferedRate = offeredRate;

  if (unitMultiplier === 100) {
    if (rateQuotationType === 'direct') {
      // e.g. 1 Home gives (offeredRate / 100) Foreign? No, "per 100 Home gives X Foreign"
      normalizedOfferedRate = offeredRate / 100;
    } else {
      // "100 Foreign costs X Home" => 1 Foreign = (offeredRate / 100) Home => 1 Home = 100 / offeredRate Foreign
      normalizedOfferedRate = 100 / offeredRate;
    }
  } else {
    if (rateQuotationType === 'indirect') {
      // 1 Foreign costs X Home => 1 Home = 1 / X Foreign
      normalizedOfferedRate = 1 / offeredRate;
    }
  }

  // Calculate payouts
  let midMarketPayout = 0;
  let changerPayout = 0;

  if (mode === 'buy') {
    // User gives Home currency amount, receives Foreign currency
    // Mid market:
    midMarketPayout = amount * midMarketRate;
    // Changer gives:
    changerPayout = amount * normalizedOfferedRate;
  } else {
    // User gives Foreign currency amount, receives Home currency
    // midMarketRate is 1 Home = X Foreign, so 1 Foreign = (1 / midMarketRate) Home
    midMarketPayout = amount * (1 / midMarketRate);
    // Changer gives:
    changerPayout = amount * (1 / normalizedOfferedRate);
  }

  // Markup % = how much worse off the user is compared to mid-market
  // If mid-market payout is 1000 and changer gives 950, loss is 50, markup is 5.0%
  const cashLoss = Math.max(0, midMarketPayout - changerPayout);
  const markupPercent = midMarketPayout > 0 ? ((midMarketPayout - changerPayout) / midMarketPayout) * 100 : 0;

  // Determine rating tier
  let ratingTier: 'excellent' | 'fair' | 'moderate' | 'expensive' | 'rip-off' = 'fair';
  let ratingLabel = 'Fair Street Rate';
  let verdictDescription = 'Normal markup for downtown physical changers.';

  if (markupPercent <= 0.8) {
    ratingTier = 'excellent';
    ratingLabel = 'Prime Wholesale Rate (< 0.8%)';
    verdictDescription = 'Top tier! Comparable to best city arcade/central wholesale changers.';
  } else if (markupPercent <= 2.2) {
    ratingTier = 'fair';
    ratingLabel = 'Good Street Rate (0.8% – 2.2%)';
    verdictDescription = 'Fair pricing for a reputable physical counter. Solid deal for travel cash.';
  } else if (markupPercent <= 4.0) {
    ratingTier = 'moderate';
    ratingLabel = 'Moderate Markup (2.2% – 4.0%)';
    verdictDescription = 'Slightly high spread. Acceptable only for quick convenience or emergency cash.';
  } else if (markupPercent <= 6.5) {
    ratingTier = 'expensive';
    ratingLabel = 'High Fee / Poor (4.0% – 6.5%)';
    verdictDescription = 'Expensive. Often found in hotels, train stations, or tourist plazas. Walk around if possible.';
  } else {
    ratingTier = 'rip-off';
    ratingLabel = 'Airport / Trap Alert (> 6.5%)';
    verdictDescription = 'Very wide spread! Typical of airport departure counters. Better to use a fee-free ATM or travel card.';
  }

  return {
    effectiveRate: normalizedOfferedRate,
    midMarketPayout,
    changerPayout,
    cashLoss,
    markupPercent: Math.max(0, markupPercent),
    ratingTier,
    ratingLabel,
    verdictDescription,
  };
}
