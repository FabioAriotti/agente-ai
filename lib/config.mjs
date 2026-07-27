// lib/config.mjs — load a client config + resolve its WordPress credentials.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Load .env from the package root (once).
dotenv.config({ path: path.join(ROOT, '.env') });

export const paths = {
  root: ROOT,
  clients: path.join(ROOT, 'clients'),
  briefs: path.join(ROOT, 'workspace', 'briefs'),
  ready: path.join(ROOT, 'workspace', 'ready'),
  published: path.join(ROOT, 'workspace', 'published'),
};

export function listClients() {
  if (!fs.existsSync(paths.clients)) return [];
  return fs
    .readdirSync(paths.clients)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

// Load and validate one client config. Returns { ...config, wpAuth }.
export function loadClient(name) {
  if (!name) {
    throw new Error(
      `No client name given. Available: ${listClients().join(', ') || '(none — add one under clients/)'}`
    );
  }
  const file = path.join(paths.clients, `${name}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(
      `Client config not found: clients/${name}.json. Available: ${listClients().join(', ') || '(none)'}`
    );
  }

  let cfg;
  try {
    cfg = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    throw new Error(`clients/${name}.json is not valid JSON: ${e.message}`);
  }

  // Required fields.
  const url = cfg?.wp?.url;
  const user = cfg?.wp?.user;
  const envName = cfg?.wp?.appPasswordEnv;
  if (!url || !user || !envName) {
    throw new Error(
      `clients/${name}.json must define wp.url, wp.user and wp.appPasswordEnv.`
    );
  }

  const appPassword = process.env[envName];
  if (!appPassword || appPassword.includes('xxxx')) {
    throw new Error(
      `Missing WordPress Application Password. Set "${envName}" in your .env file ` +
        `(copy .env.example to .env and paste the password from WordPress -> Users -> Profile -> Application Passwords).`
    );
  }

  const wpAuth = {
    base: url.replace(/\/+$/, '') + '/wp-json/wp/v2',
    root: url.replace(/\/+$/, ''),
    user,
    // Basic auth header value, computed once.
    authHeader:
      'Basic ' + Buffer.from(`${user}:${appPassword}`).toString('base64'),
  };

  return { ...cfg, name, wpAuth };
}
