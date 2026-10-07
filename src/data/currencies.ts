import { Currency } from '../types/currency';

export const CURRENCIES: Currency[] = [
  // Popular Major Travel Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', country: 'United States', decimals: 2, popular: true, region: 'Americas' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', country: 'Eurozone', decimals: 2, popular: true, region: 'Europe' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', country: 'United Kingdom', decimals: 2, popular: true, region: 'Europe' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', country: 'Singapore', decimals: 2, popular: true, region: 'Asia' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', country: 'Japan', decimals: 0, popular: true, region: 'Asia' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', country: 'Malaysia', decimals: 2, popular: true, region: 'Asia' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', country: 'Thailand', decimals: 2, popular: true, region: 'Asia' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', country: 'Indonesia', decimals: 0, popular: true, region: 'Asia' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', country: 'Australia', decimals: 2, popular: true, region: 'Oceania' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', country: 'Canada', decimals: 2, popular: true, region: 'Americas' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', country: 'Switzerland', decimals: 2, popular: true, region: 'Europe' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', country: 'Hong Kong', decimals: 2, popular: true, region: 'Asia' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', country: 'China', decimals: 2, popular: true, region: 'Asia' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', country: 'South Korea', decimals: 0, popular: true, region: 'Asia' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼', country: 'Taiwan', decimals: 1, popular: true, region: 'Asia' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', country: 'New Zealand', decimals: 2, popular: true, region: 'Oceania' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳', country: 'Vietnam', decimals: 0, popular: true, region: 'Asia' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', country: 'Philippines', decimals: 2, popular: true, region: 'Asia' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', country: 'India', decimals: 2, popular: true, region: 'Asia' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪', country: 'United Arab Emirates', decimals: 2, popular: true, region: 'Middle East & Africa' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', flag: '🇸🇦', country: 'Saudi Arabia', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', country: 'Turkey', decimals: 2, popular: false, region: 'Europe' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', country: 'Sweden', decimals: 2, popular: false, region: 'Europe' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', country: 'Norway', decimals: 2, popular: false, region: 'Europe' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', country: 'Denmark', decimals: 2, popular: false, region: 'Europe' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', country: 'Poland', decimals: 2, popular: false, region: 'Europe' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', country: 'Hungary', decimals: 0, popular: false, region: 'Europe' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', country: 'Czech Republic', decimals: 2, popular: false, region: 'Europe' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', country: 'Mexico', decimals: 2, popular: false, region: 'Americas' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', country: 'Brazil', decimals: 2, popular: false, region: 'Americas' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', country: 'South Africa', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', country: 'Egypt', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', country: 'Israel', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', flag: '🇶🇦', country: 'Qatar', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', flag: '🇰🇼', country: 'Kuwait', decimals: 3, popular: false, region: 'Middle East & Africa' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BD', flag: '🇧🇭', country: 'Bahrain', decimals: 3, popular: false, region: 'Middle East & Africa' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'OMR', flag: '🇴🇲', country: 'Oman', decimals: 3, popular: false, region: 'Middle East & Africa' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', country: 'Chile', decimals: 0, popular: false, region: 'Americas' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', country: 'Colombia', decimals: 0, popular: false, region: 'Americas' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪', country: 'Peru', decimals: 2, popular: false, region: 'Americas' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', country: 'Argentina', decimals: 1, popular: false, region: 'Americas' },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯', country: 'Fiji', decimals: 2, popular: false, region: 'Oceania' },
  { code: 'BND', name: 'Brunei Dollar', symbol: 'B$', flag: '🇧🇳', country: 'Brunei', decimals: 2, popular: false, region: 'Asia' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰', country: 'Sri Lanka', decimals: 2, popular: false, region: 'Asia' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', flag: '🇳🇵', country: 'Nepal', decimals: 2, popular: false, region: 'Asia' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰', country: 'Pakistan', decimals: 2, popular: false, region: 'Asia' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', country: 'Bangladesh', decimals: 2, popular: false, region: 'Asia' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'MAD', flag: '🇲🇦', country: 'Morocco', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', country: 'Kenya', decimals: 2, popular: false, region: 'Middle East & Africa' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', country: 'Romania', decimals: 2, popular: false, region: 'Europe' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', country: 'Bulgaria', decimals: 2, popular: false, region: 'Europe' },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', flag: '🇮🇸', country: 'Iceland', decimals: 0, popular: false, region: 'Europe' },
];

export const CURRENCY_MAP = new Map<string, Currency>(
  CURRENCIES.map((c) => [c.code, c])
);

export function getCurrency(code: string): Currency {
  return CURRENCY_MAP.get(code) || {
    code,
    name: code,
    symbol: code,
    flag: '🌐',
    country: code,
    decimals: 2,
    region: 'Americas'
  };
}

export const DEFAULT_WATCHLIST = ['USD', 'EUR', 'GBP', 'JPY', 'SGD', 'MYR', 'THB', 'AUD'];
