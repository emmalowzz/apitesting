import React, { useState, useEffect } from 'react';
import { X, Activity, CheckCircle2, AlertCircle, RefreshCw, Key, ExternalLink, ShieldCheck } from 'lucide-react';
import { checkApiHealth, fetchMasRates } from '../services/ratesService';

interface ApiHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiHealthModal: React.FC<ApiHealthModalProps> = ({ isOpen, onClose }) => {
  const [healthData, setHealthData] = useState<any>(null);
  const [masData, setMasData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'health' | 'mas'>('health');

  const runDiagnostics = async () => {
    setLoading(true);
    try {
      const [h, m] = await Promise.all([checkApiHealth(), fetchMasRates()]);
      setHealthData(h);
      setMasData(m);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runDiagnostics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-200 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm tracking-tight">API Diagnostics & Health Monitor</h3>
              <p className="text-[11px] text-slate-400">
                Monitors /api/health and Monetary Authority of Singapore (MAS) rates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('health')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'health' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              /api/health
            </button>
            <button
              onClick={() => setActiveTab('mas')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'mas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MAS Endpoint (/api/mas-rates)
            </button>
          </div>

          <button
            onClick={runDiagnostics}
            disabled={loading}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            <span>Test Now</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {activeTab === 'health' && (
            <div className="space-y-3">
              {/* Overall status card */}
              <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Overall System Status:</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        healthData?.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-bold text-sm text-slate-900 uppercase">
                      {healthData?.status || 'Testing...'}
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-slate-500">
                  <div>Latency: {healthData?.responseTimeMs ?? '--'} ms</div>
                  <div>Uptime: {healthData?.uptimeSeconds ?? '--'} s</div>
                </div>
              </div>

              {/* MAS Status card */}
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">MAS Data API Service</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      healthData?.apis?.masDailyRates?.configured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {healthData?.apis?.masDailyRates?.configured ? 'Active' : 'Awaiting Vercel Key'}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {healthData?.apis?.masDailyRates?.message ||
                    'MAS Account Key is read from process.env.MAS_ACCOUNT_KEY with a 20-second caching cycle.'}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                  Refresh Interval: 20s · Header: Account Key
                </div>
              </div>

              {/* Interbank Feed card */}
              <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Interbank Fallback Rates Feed</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                    {healthData?.apis?.interbankRates?.status || 'Operational'}
                  </span>
                </div>
                <p className="text-slate-600">
                  Primary live mid-market rates service for 160+ world currencies.
                </p>
              </div>

              {/* Raw JSON viewer */}
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                  Raw Health JSON Response:
                </span>
                <pre className="mt-1 p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-40">
                  {JSON.stringify(healthData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'mas' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">MAS Setup Instructions</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  The API proxy at <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">/api/mas-rates</code> targets the official Monetary Authority of Singapore endpoint:
                </p>
                <div className="p-2 bg-slate-900 text-slate-300 font-mono text-[10px] rounded-lg break-all select-all">
                  https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily
                </div>
                <p className="text-slate-600">
                  When deployed to Vercel, set your environment variable:
                </p>
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-mono text-[11px]">
                  <strong>Key:</strong> MAS_ACCOUNT_KEY<br />
                  <strong>Value:</strong> &lt;Your MAS Developer Account Key&gt;
                </div>
              </div>

              {/* MAS API Response status */}
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                  Current Response from /api/mas-rates:
                </span>
                <pre className="mt-1 p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-48">
                  {JSON.stringify(masData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Cache TTL: 20 seconds (Memory & Vercel edge)</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
