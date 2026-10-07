import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import healthHandler from './api/health.js';
import masRatesHandler from './api/mas-rates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Helper to adapt Vercel-style handlers to Express
const adaptHandler = (handler: any) => {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      console.error('API Error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err?.message || 'Internal Server Error' });
      }
    }
  };
};

// Mount API routes
app.all('/api/health', adaptHandler(healthHandler));
app.all('/api/health.js', adaptHandler(healthHandler));
app.all('/api/health/js', adaptHandler(healthHandler));
app.all('/api/mas-rates', adaptHandler(masRatesHandler));
app.all('/api/mas', adaptHandler(masRatesHandler));
app.all('/api/mas.js', adaptHandler(masRatesHandler));
app.all('/api/mas-rates.js', adaptHandler(masRatesHandler));

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
