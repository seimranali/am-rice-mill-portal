import { clean, handleErrors, json, type Env } from '../../../_lib';

export const onRequestGet = handleErrors(async ({ request, env }) => {
  const url = new URL(request.url);
  const q = clean(url.searchParams.get('q'), 100);
  const status = url.searchParams.get('status');
  const where: string[] = [];
  const args: unknown[] = [];
  if (status === 'new' || status === 'read') {
    where.push('status = ?');
    args.push(status);
  }
  if (q) {
    where.push('(name LIKE ? OR company LIKE ? OR email LIKE ? OR phone LIKE ? OR product LIKE ? OR message LIKE ?)');
    args.push(...Array(6).fill(`%${q}%`));
  }
  const { results } = await env.DB.prepare(
    `SELECT id, name, company, phone, email, product, message, status, created_at FROM messages
     ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC LIMIT 500`,
  )
    .bind(...args)
    .all();
  const counts = await env.DB.prepare(`SELECT COUNT(*) AS total, SUM(status = 'new') AS unread FROM messages`).first<{
    total: number;
    unread: number | null;
  }>();
  return json(200, { messages: results, total: counts?.total ?? 0, unread: counts?.unread ?? 0 });
});
