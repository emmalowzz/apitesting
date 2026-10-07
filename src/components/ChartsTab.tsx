import React, { useState, useMemo, useRef } from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown, Calendar, Info } from 'lucide-react';
import { Currency, Timeframe, ChartPoint } from '../types/currency';
import { getExchangeRate, formatRatePrecision, generateHistoricalPoints } from '../services/ratesService';

interface ChartsTabProps {
  fromCurrency: Currency;
  toCurrency: Currency;
  rates: Record<string, number>;
  onSelectFrom: () => void;
  onSelectTo: () => void;
  onSwapCurrencies: () => void;
}

export const ChartsTab: React.FC<ChartsTabProps> = ({
  fromCurrency,
  toCurrency,
  rates,
  onSelectFrom,
  onSelectTo,
  onSwapCurrencies,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1M');
  const [activePoint, setActivePoint] = useState<ChartPoint | null>(null);
  const chartSvgRef = useRef<SVGSVGElement>(null);

  const currentRate = getExchangeRate(rates, fromCurrency.code, toCurrency.code);

  const { points, min, max, avg, changePercent } = useMemo(() => {
    return generateHistoricalPoints(currentRate, timeframe);
  }, [currentRate, timeframe]);

  // Chart SVG bounds
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Transform coordinates
  const effectiveMin = min * 0.998;
  const effectiveMax = max * 1.002;
  const rateRange = effectiveMax - effectiveMin || 1;

  const svgPoints = useMemo(() => {
    return points.map((p, idx) => {
      const x = paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
      const y = height - paddingBottom - ((p.rate - effectiveMin) / rateRange) * (height - paddingTop - paddingBottom);
      return { x, y, point: p };
    });
  }, [points, effectiveMin, rateRange]);

  const pathD = useMemo(() => {
    if (svgPoints.length === 0) return '';
    return svgPoints.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [svgPoints]);

  const areaD = useMemo(() => {
    if (svgPoints.length === 0) return '';
    const firstX = svgPoints[0].x;
    const lastX = svgPoints[svgPoints.length - 1].x;
    const bottomY = height - paddingBottom;
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD, svgPoints]);

  const isPositive = changePercent >= 0;

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!chartSvgRef.current || svgPoints.length === 0) return;
    const rect = chartSvgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const relativeX = (clientX / rect.width) * width;

    // Find closest point
    let closest = svgPoints[0];
    let minDiff = Math.abs(svgPoints[0].x - relativeX);
    for (let i = 1; i < svgPoints.length; i++) {
      const diff = Math.abs(svgPoints[i].x - relativeX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = svgPoints[i];
      }
    }
    setActivePoint(closest.point);
  };

  const handlePointerLeave = () => {
    setActivePoint(null);
  };

  const displayedRate = activePoint ? activePoint.rate : currentRate;
  const displayedDate = activePoint ? activePoint.date : 'Latest Live Rate';

  return (
    <div className="space-y-4 pb-8">
      {/* Chart Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 space-y-5">
        {/* Pair Header & Switch */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl select-none">{fromCurrency.flag}</span>
              <span className="text-xl select-none">{toCurrency.flag}</span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {fromCurrency.code} to {toCurrency.code} Chart
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              XE Mid-Market Historical Currency Rates
            </p>
          </div>

          <button
            onClick={onSwapCurrencies}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Invert Pair</span>
          </button>
        </div>

        {/* Current / Hovered Rate Display */}
        <div className="flex items-baseline justify-between flex-wrap gap-2 pt-1">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight tabular-nums">
              1 {fromCurrency.code} = {formatRatePrecision(displayedRate)} {toCurrency.code}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className={`font-mono font-bold flex items-center gap-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-medium">{displayedDate}</span>
            </div>
          </div>

          {/* Timeframe Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-medium">
            {(['1D', '1W', '1M', '3M', '1Y', '5Y'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors font-mono ${
                  timeframe === tf
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Chart Container */}
        <div className="relative w-full aspect-[2.4/1] min-h-[220px] bg-slate-50/50 rounded-xl border border-slate-100 p-2 overflow-hidden select-none">
          <svg
            ref={chartSvgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full cursor-crosshair touch-none"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            <line
              x1={paddingX}
              y1={paddingTop}
              x2={width - paddingX}
              y2={paddingTop}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <line
              x1={paddingX}
              y1={height - paddingBottom}
              x2={width - paddingX}
              y2={height - paddingBottom}
              stroke="#e2e8f0"
            />

            {/* Min / Max Labels */}
            <text
              x={paddingX}
              y={paddingTop - 5}
              fill="#94a3b8"
              fontSize="10"
              fontFamily="monospace"
            >
              High: {formatRatePrecision(max)}
            </text>
            <text
              x={paddingX}
              y={height - paddingBottom + 16}
              fill="#94a3b8"
              fontSize="10"
              fontFamily="monospace"
            >
              Low: {formatRatePrecision(min)}
            </text>

            {/* Gradient Area */}
            <path d={areaD} fill="url(#chartGradient)" />

            {/* Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Scrubber active point marker */}
            {activePoint && (
              <g>
                {(() => {
                  const activeSvgPt = svgPoints.find((p) => p.point === activePoint);
                  if (!activeSvgPt) return null;
                  return (
                    <>
                      <line
                        x1={activeSvgPt.x}
                        y1={paddingTop}
                        x2={activeSvgPt.x}
                        y2={height - paddingBottom}
                        stroke="#0f172a"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={activeSvgPt.x}
                        cy={activeSvgPt.y}
                        r="5"
                        fill="#059669"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </>
                  );
                })()}
              </g>
            )}
          </svg>
        </div>

        {/* High, Low, Average Stats Bar */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">High ({timeframe})</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {formatRatePrecision(max)}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Low ({timeframe})</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {formatRatePrecision(min)}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-0.5">Average</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {formatRatePrecision(avg)}
            </span>
          </div>
        </div>
      </div>

      {/* Traveler FX Timing Insight Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-slate-900">Traveler Timing Insight</h4>
          <p className="text-slate-600 leading-relaxed">
            {fromCurrency.code} is currently trading at{' '}
            <span className="font-bold font-mono text-slate-900">
              {formatRatePrecision(currentRate)}
            </span>{' '}
            against {toCurrency.code}. Compared to the {timeframe} average of{' '}
            <span className="font-mono text-slate-800 font-semibold">{formatRatePrecision(avg)}</span>
            , the current rate is{' '}
            <span className="font-bold text-emerald-700">
              {currentRate >= avg ? 'favorable (+)' : 'slightly lower (-)'}
            </span>{' '}
            for exchanging {fromCurrency.code} into {toCurrency.code}.
          </p>
        </div>
      </div>
    </div>
  );
};
