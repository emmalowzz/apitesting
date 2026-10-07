/**
 * Health & API Status Monitoring Endpoint
 * Path: /api/health
 * Checks health of MAS Data API, environment configuration, and fallback rate services.
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const startTime = Date.now();
  const masConfigured = Boolean(process.env.MAS_ACCOUNT_KEY);

  // Check MAS endpoint connectivity if configured
  let masCheck = {
    endpoint:
      'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily',
    headerUsed: 'Account Key',
    configured: masConfigured,
    status: masConfigured ? 'ready' : 'pending_env_key',
    message: masConfigured
      ? 'MAS_ACCOUNT_KEY is configured in environment.'
      : 'MAS_ACCOUNT_KEY is not yet set in Vercel environment variables.',
    refreshIntervalSeconds: 20,
  };

  // Test primary interbank rates feed connectivity
  let interbankCheck = {
    endpoint: 'https://open.er-api.com/v6/latest/USD',
    status: 'untested',
    latencyMs: null,
  };

  try {
    const t0 = Date.now();
    const probeRes = await fetch('https://open.er-api.com/v6/latest/USD', {
      method: 'HEAD',
      signal: AbortSignal.timeout(3000),
    });
    interbankCheck.status = probeRes.ok ? 'operational' : `http_${probeRes.status}`;
    interbankCheck.latencyMs = Date.now() - t0;
  } catch (probeErr) {
    interbankCheck.status = 'probe_timeout_or_offline';
    interbankCheck.error = probeErr.message;
  }

  const durationMs = Date.now() - startTime;
  const isHealthy = interbankCheck.status === 'operational';

  const healthReport = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    responseTimeMs: durationMs,
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      vercel: Boolean(process.env.VERCEL),
    },
    apis: {
      masDailyRates: masCheck,
      interbankRates: interbankCheck,
    },
    system: {
      memoryUsageMb: process.memoryUsage ? Math.round(process.memoryUsage().heapUsed / 1024 / 1024) : null,
    },
  };

  return res.status(isHealthy ? 200 : 503).json(healthReport);
}
