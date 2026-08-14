import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { config } from './config';
import { healthRouter } from './routes/health';
import { metaRouter } from './routes/meta';
import { customizeRouter } from './routes/customize';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(compression());
  app.use(express.json({ limit: '128kb' }));

  app.use(healthRouter);
  app.use(metaRouter);
  app.use(customizeRouter);

  const indexHtml = path.join(config.clientDir, 'index.html');
  const hasClientBuild = fs.existsSync(indexHtml);

  if (hasClientBuild) {
    app.use(
      express.static(config.clientDir, {
        setHeaders: (res, filePath) => {
          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      }),
    );

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      res.sendFile(indexHtml);
    });
  }

  app.use((req, res) => {
    res.status(404).json({ error: 'NOT_FOUND', path: req.path });
  });

  return app;
}
