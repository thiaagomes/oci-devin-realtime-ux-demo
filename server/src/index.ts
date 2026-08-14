import { createApp } from './app';
import { config } from './config';

const app = createApp();

app.listen(config.port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(
    `[server] listening on http://0.0.0.0:${config.port} (version=${config.appVersion} build=${config.gitSha ?? 'local'})`,
  );
});
