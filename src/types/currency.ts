export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  decimals: number;
  popular?: boolean;
  region: 'Asia' | 'Europe' | 'Americas' | 'Middle East & Africa' | 'Oceania';
}

export interface RatesData {
  base: string;
  rates: Record<string, number>;
  lastUpdated: number; // timestamp
  source: 'live' | 'cache' | 'offline';
}

export type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export interface ChartPoint {
  date: string;
  rate: number;
  timestamp: number;
}

export interface MoneyChangerQuote {
  id: string;
  boothName: string;
  location?: string;
  fromCurrency: string;
  toCurrency: string;
  mode: 'buy' | 'sell'; // 'buy' = user buying foreign cash; 'sell' = user selling foreign cash
  offeredRate: number;
  unitsMultiplier: number; // e.g., 1 or 100 for JPY/IDR
  midMarketRate: number;
  markupPercent: number; // positive = markup (user loses), negative = discount
  amountToExchange: number;
  payoutAmount: number;
  midMarketPayout: number;
  cashDifference: number;
  ratingTier: 'excellent' | 'fair' | 'moderate' | 'expensive' | 'rip-off';
  createdAt: number;
}

export type ActiveTab = 'converter' | 'changer' | 'charts' | 'watchlist';
