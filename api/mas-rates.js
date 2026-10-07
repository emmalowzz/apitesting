/**
 * MAS (Monetary Authority of Singapore) Daily Exchange Rates API Proxy
 * Endpoint: https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily
 * Header: Account Key: <MAS_ACCOUNT_KEY>
 * Refreshes every 20 seconds.
 */

const MAS_ENDPOINT =
  'https://eservices.mas.gov.sg/apimg-gw/server/monthly_statistical_bulletin_non610ora/exchange_rates_end_of_period_daily/views/exchange_rates_end_of_period_daily';

const CACHE_TTL_MS = 20 * 1000; // 20 seconds refresh window

let memoryCache = {
  data: null,
  timestamp: 0,
  statusCode: 200,
  error: null,
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Account Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const now = Date.now();
  const cacheAge = now - memoryCache.timestamp;

  // Return cached response if within 20s TTL
  if (memoryCache.data && cacheAge < CACHE_TTL_MS) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('X-Cache-Age-Seconds', Math.floor(cacheAge / 1000).toString());
    return res.status(memoryCache.statusCode || 200).json({
      cached: true,
      cacheAgeSeconds: Math.floor(cacheAge / 1000),
      refreshesInSeconds: Math.max(0, Math.ceil((CACHE_TTL_MS - cacheAge) / 1000)),
      ...memoryCache.data,
    });
  }

  const accountKey = process.env.MAS_ACCOUNT_KEY;

  if (!accountKey) {
    return res.status(200).json({
      status: 'notice',
      configured: false,
      message:
        'MAS_ACCOUNT_KEY environment variable is not set. Add MAS_ACCOUNT_KEY in your Vercel Project Settings -> Environment Variables.',
      endpoint: MAS_ENDPOINT,
      cacheTtlSeconds: 20,
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const headers = {
      'Account Key': accountKey,
      'account_key': accountKey,
      'Accept': 'application/json',
      'User-Agent': 'CurrencyChecker/1.0',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const apiRes = await fetch(MAS_ENDPOINT, {
      method: 'GET',
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = apiRes.headers.get('content-type') || '';
    let payload;

    if (contentType.includes('application/json')) {
      payload = await apiRes.json();
    } else {
      const text = await apiRes.text();
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { raw: text };
      }
    }

    if (!apiRes.ok) {
      memoryCache = {
        data: {
          status: 'error',
          configured: true,
          statusCode: apiRes.status,
          statusText: apiRes.statusText,
          error: payload,
          message: `MAS API returned HTTP ${apiRes.status}`,
        },
        timestamp: now,
        statusCode: apiRes.status,
      };
      return res.status(apiRes.status).json(memoryCache.data);
    }

    // Success response: cache for 20 seconds
    const successData = {
      status: 'success',
      configured: true,
      source: 'Monetary Authority of Singapore (MAS)',
      endpoint: MAS_ENDPOINT,
      refreshedAt: new Date(now).toISOString(),
      cacheTtlSeconds: 20,
      data: payload,
    };

    memoryCache = {
      data: successData,
      timestamp: now,
      statusCode: 200,
    };

    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Cache-TTL', '20');
    return res.status(200).json(successData);
  } catch (error) {
    const isTimeout = error.name === 'AbortError';
    const errPayload = {
      status: 'error',
      configured: true,
      error: isTimeout ? 'Request timed out after 12s' : error.message,
      endpoint: MAS_ENDPOINT,
      timestamp: new Date().toISOString(),
    };

    // If we have stale cache, serve it with warning
    if (memoryCache.data) {
      return res.status(200).json({
        ...memoryCache.data,
        stale: true,
        staleWarning: 'Serving stale cache due to upstream fetch failure',
      });
    }

    return res.status(502).json(errPayload);
  }
}
