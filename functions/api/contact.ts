import { clean, clientIp, handleErrors, json, limited, readJson, type Env } from '../_lib';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const onRequestPost = handleErrors(async ({ request, env }) => {
  const ip = clientIp(request);
  if (await limited(env, `contact:${ip}`, 5, 600)) return json(429, { error: 'Too many requests. Please try again later.' });

  const b = await readJson(request);
  if (b.website) return json(200, { ok: true }); // honeypot: silently drop bots

  const d = {
    name: clean(b.name, 120),
    company: clean(b.company, 160),
    phone: clean(b.phone, 40),
    email: clean(b.email, 160),
    product: clean(b.product, 120),
    message: clean(b.message, 4000),
  };
  const fields: string[] = [];
  if (!d.name) fields.push('name');
  if (!d.phone || !/^[+\d][\d\s()-]{5,}$/.test(d.phone)) fields.push('phone');
  if (!EMAIL_RE.test(d.email)) fields.push('email');
  if (!d.message) fields.push('message');
  if (fields.length) return json(422, { error: 'Please check the highlighted fields.', fields });

  await env.DB.prepare(
    `INSERT INTO messages (name, company, phone, email, product, message, ip, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(d.name, d.company, d.phone, d.email, d.product, d.message, ip, clean(request.headers.get('User-Agent'), 300))
    .run();
  return json(201, { ok: true });
});
