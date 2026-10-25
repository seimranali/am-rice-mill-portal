/**
 * Shared helpers for the Cloudflare Pages Functions API.
 * Bindings / secrets (set in Cloudflare → Pages → Settings):
 *   DB                   D1 database binding
 *   ADMIN_USER           e.g. "admin"
 *   ADMIN_PASSWORD_HASH  secret — create with: node scripts/hash-password.mjs "<password>"
 */
export interface Env {
  DB: D1Database;
  ADMIN_USER?: string;
  ADMIN_PASSWORD_HASH: string;
}

export const SESSION_TTL_S = 8 * 60 * 60; // 8 hours
const COOKIE = 'amrm_admin';

export const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

export async function readJson<T = Record<string, unknown>>(req: Request, limit = 20_000): Promise<T> {
  const text = await req.text();
  if (text.length > limit) throw Object.assign(new Error('Payload too large'), { status: 413 });
  try {
    return (text ? JSON.parse(text) : {}) as T;
  } catch {
    throw Object.assign(new Error('Invalid JSON'), { status: 400 });
  }
}

export const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
export const clientIp = (req: Request) => req.headers.get('CF-Connecting-IP') || '';

// ── Rate limiting (D1-backed, per key) ───────────────────────
export async function limited(env: Env, key: string, max: number, windowS: number): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare('DELETE FROM rate_limits WHERE ts < ?').bind(now - 3600).run();
  const row = await env.DB.prepare('SELECT COUNT(*) AS n FROM rate_limits WHERE key = ? AND ts > ?')
    .bind(key, now - windowS)
    .first<{ n: number }>();
  await env.DB.prepare('INSERT INTO rate_limits (key, ts) VALUES (?, ?)').bind(key, now).run();
  return (row?.n ?? 0) >= max;
}

// ── Password check (PBKDF2-SHA256) ───────────────────────────
const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
const unhex = (s: string) => new Uint8Array(s.match(/../g)!.map((h) => parseInt(h, 16)));

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iter, saltHex, hashHex] = (stored || '').split('$');
  if (scheme !== 'pbkdf2-sha256' || !iter || !saltHex || !hashHex) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: unhex(saltHex), iterations: Number(iter) },
    key,
    (hashHex.length / 2) * 8,
  );
  return safeEqual(hex(bits), hashHex);
}
export const sameUser = (a: string, b: string) => safeEqual(a, b);

// ── Sessions (D1) ────────────────────────────────────────────
export async function createSession(env: Env): Promise<string> {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)).buffer);
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_S;
  await env.DB.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(Math.floor(Date.now() / 1000)).run();
  await env.DB.prepare('INSERT INTO sessions (token, expires_at) VALUES (?, ?)').bind(token, exp).run();
  return token;
}
function tokenFrom(req: Request) {
  const m = (req.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-f0-9]{64})`));
  return m ? m[1] : null;
}
export async function getSession(env: Env, req: Request) {
  const t = tokenFrom(req);
  if (!t) return null;
  const row = await env.DB.prepare('SELECT expires_at FROM sessions WHERE token = ?').bind(t).first<{ expires_at: number }>();
  if (!row || row.expires_at < Math.floor(Date.now() / 1000)) return null;
  return t;
}
export async function deleteSession(env: Env, req: Request) {
  const t = tokenFrom(req);
  if (t) await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(t).run();
}
export const sessionCookie = (token: string, maxAge: number) =>
  `${COOKIE}=${token}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;

export const handleErrors = (fn: PagesFunction<Env>): PagesFunction<Env> => async (ctx) => {
  try {
    return await fn(ctx);
  } catch (err: any) {
    if (err?.status) return json(err.status, { error: err.message });
    console.error(err);
    return json(500, { error: 'Server error.' });
  }
};
