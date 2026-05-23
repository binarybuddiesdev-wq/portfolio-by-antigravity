import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import pino from 'pino';

const configLogger = pino({ name: 'playwright-config' });

function getDevServerPort(): number {
  const defaultPort = 5173;
  try {
    const viteConfigPath = path.resolve(process.cwd(), 'vite.config.ts');
    if (fs.existsSync(viteConfigPath)) {
      const content = fs.readFileSync(viteConfigPath, 'utf-8');
      const match = content.match(/port\s*:\s*(\d+)/);
      if (match && match[1]) {
        return parseInt(match[1], 10);
      }
    }
  } catch (err) {
    configLogger.warn(err, 'Failed to detect dev server port from vite.config.ts, falling back to default');
  }
  return defaultPort;
}

const port = getDevServerPort();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: `http://localhost:${port}`,
    viewport: { width: 1200, height: 800 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
