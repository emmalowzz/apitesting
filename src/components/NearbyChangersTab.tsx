import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  ExternalLink,
  Store,
  Compass,
  Check,
  Copy,
  SlidersHorizontal,
  Building2,
  Sparkles,
  Info
} from 'lucide-react';
import {
  MONEY_CHANGERS,
  MoneyChangerLocation,
  calculateDistanceKm,
  formatDistance,
  estimateWalkingTime,
  SINGAPORE_AREA_PRESETS,
  AreaPreset
} from '../data/moneyChangers';

interface NearbyChangersTabProps {
  onSelectChangerForCheck: (boothName: string) => void;
}

export const NearbyChangersTab: React.FC<NearbyChangersTabProps> = ({
  onSelectChangerForCheck,
}) => {
  // User location state (lat, lng)
  // Default to Raffles Place / The Arcade (Singapore's prime financial center) if GPS not yet activated
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationMode, setLocationMode] = useState<'gps' | 'preset' | 'default'>('default');
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Request browser GPS position
  const requestUserGps = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationMode('gps');
        setSelectedPreset(null);
        setGpsLoading(false);
      },
      (error) => {
        setGpsLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsError('Location access was denied. Please pick a nearby area from the list below.');
        } else {
          setGpsError('Unable to retrieve location. Try selecting a popular area.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Switch to preset location
  const handleSelectPreset = (preset: AreaPreset) => {
    setUserLocation({ lat: preset.lat, lng: preset.lng });
    setLocationMode('preset');
    setSelectedPreset(preset.name);
    setGpsError(null);
  };

  // Distinct cluster names for quick filtering
  const clusters = useMemo(() => {
    const set = new Set<string>();
    MONEY_CHANGERS.forEach((c) => {
      if (c.cluster) set.add(c.cluster);
    });
    return Array.from(set).sort();
  }, []);

  // Compute distance and sort
  const changersWithDistance = useMemo(() => {
    const referenceLat = userLocation?.lat ?? 1.28362;
    const referenceLng = userLocation?.lng ?? 103.85206;

    let list = MONEY_CHANGERS.map((changer) => {
      const distanceKm = calculateDistanceKm(
        referenceLat,
        referenceLng,
        changer.latitude,
        changer.longitude
      );
      return {
        ...changer,
        distanceKm,
      };
    });

    // Filter by cluster
    if (selectedClusterFilter !== 'all') {
      list = list.filter((c) => c.cluster === selectedClusterFilter);
    }

    // Filter by text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.building && c.building.toLowerCase().includes(q)) ||
          (c.address && c.address.toLowerCase().includes(q)) ||
          (c.postalCode && c.postalCode.includes(q))
      );
    }

    // Sort by closest distance first
    list.sort((a, b) => a.distanceKm - b.distanceKm);
    return list;
  }, [userLocation, selectedClusterFilter, searchQuery]);

  const handleCopyAddress = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header card with Location Finder */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>Find Closest Money Changer</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Official Monetary Authority of Singapore (MAS) licensed money-changing licensees.
            </p>
          </div>
        </div>

        {/* GPS Trigger & Current Status Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">
                {locationMode === 'gps'
                  ? 'Using Live GPS Location'
                  : locationMode === 'preset'
                  ? `Centered on: ${
                      SINGAPORE_AREA_PRESETS.find((p) => p.name === selectedPreset)?.label || 'Area'
                    }`
                  : 'Default Reference: The Arcade (Raffles Place)'}
              </div>
              <div className="text-[11px] text-slate-400">
                {userLocation
                  ? `${userLocation.lat.toFixed(4)}° N, ${userLocation.lng.toFixed(4)}° E`
                  : 'Tap below to find counters closest to where you are standing'}
              </div>
            </div>
          </div>

          <button
            onClick={requestUserGps}
            disabled={gpsLoading}
            className="flex items-center justify-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/20 disabled:opacity-60"
          >
            <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
            <span>{gpsLoading ? 'Locating...' : 'Use My GPS'}</span>
          </button>
        </div>

        {gpsError && (
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            {gpsError}
          </div>
        )}

        {/* Quick Area Preset Buttons */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Or Jump to Common Travel Hub:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {SINGAPORE_AREA_PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.name;
              return (
                <button
                  key={preset.name}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input & Cluster Filter */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by booth name, mall, or postal code (e.g. Lucky Plaza, 49317)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedClusterFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedClusterFilter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All Hubs ({MONEY_CHANGERS.length})
            </button>
            {clusters.map((cluster) => {
              const count = MONEY_CHANGERS.filter((c) => c.cluster === cluster).length;
              return (
                <button
                  key={cluster}
                  onClick={() => setSelectedClusterFilter(cluster)}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    selectedClusterFilter === cluster
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cluster} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traveler Pro-Tip Notice */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 text-emerald-950 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-emerald-900">Traveler Rate Tip:</span> Clustered locations like{' '}
          <strong>The Arcade (Raffles Place)</strong>, <strong>Lucky Plaza (Orchard)</strong>, and{' '}
          <strong>People's Park Complex (Chinatown)</strong> feature intense side-by-side competition. Money changers in these hubs typically offer the narrowest markups (<span className="font-semibold">&lt; 0.8%</span> spread from mid-market).
        </div>
      </div>

      {/* Changers Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-800">{changersWithDistance.length}</strong> licensed money changers
          </span>
          <span>Sorted by proximity</span>
        </div>

        {changersWithDistance.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            No money changers match your search criteria.
          </div>
        ) : (
          changersWithDistance.map((changer, idx) => {
            const isClosest = idx === 0 && (locationMode === 'gps' || locationMode === 'preset');
            const fullAddress = `${changer.address || ''}${
              changer.building ? `, ${changer.building}` : ''
            }${changer.postalCode ? `, Singapore ${changer.postalCode}` : ''}`;

            return (
              <div
                key={changer.id}
                className={`bg-white rounded-2xl border transition-all p-4 shadow-xs space-y-3 ${
                  isClosest
                    ? 'border-emerald-400 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Top Row: Name, Cluster & Distance */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isClosest && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          Closest Booth
                        </span>
                      )}
                      <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                        {changer.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                      <span className="font-medium text-slate-700">
                        {changer.building || changer.cluster}
                      </span>
                      <span>·</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Reg: {changer.registrationNumber}
                      </span>
                    </div>
                  </div>

                  {/* Distance pill */}
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-emerald-700 font-mono font-bold text-sm tabular-nums">
                      <Navigation className="w-3.5 h-3.5 rotate-45" />
                      <span>{formatDistance(changer.distanceKm)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {estimateWalkingTime(changer.distanceKm)}
                    </span>
                  </div>
                </div>

                {/* Address row */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-700 gap-2">
                  <div className="min-w-0 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{fullAddress}</span>
                  </div>
                  <button
                    onClick={() => handleCopyAddress(changer.id, fullAddress)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 p-1 shrink-0 flex items-center gap-1"
                    title="Copy full address"
                  >
                    {copiedId === changer.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Bottom Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Check Rate Here CTA */}
                  <button
                    onClick={() => onSelectChangerForCheck(changer.name)}
                    className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Check Rate Here</span>
                  </button>

                  {/* Directions CTA (Google Maps navigation) */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${changer.latitude},${changer.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
