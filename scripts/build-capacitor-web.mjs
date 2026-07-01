import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'www');

const files = [
  'index.html',
  'atlas-engine.js',
  'manifest.webmanifest',
  'offline.html',
  'install.html',
  'privacy.html',
  'account-deletion.html',
  'reset-cache.html',
  'sw.js'
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const file of files) {
  await cp(join(root, file), join(out, file));
}

await cp(join(root, 'icons'), join(out, 'icons'), { recursive: true });

console.log('Built Capacitor web bundle in www/');
