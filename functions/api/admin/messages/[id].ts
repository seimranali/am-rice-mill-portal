import { handleErrors, json, readJson, type Env } from '../../../_lib';

const idOf = (p: string | string[]) => Number(Array.isArray(p) ? p[0] : p);

export const onRequestPatch = handleErrors(async ({ request, env, params }) => {
  const b = await readJson(request, 1_000);
  if (b.status !== 'new' && b.status !== 'read') return json(422, { error: 'Invalid status.' });
  const r = await env.DB.prepare('UPDATE messages SET status = ? WHERE id = ?').bind(b.status, idOf(params.id)).run();
  return r.meta.changes ? json(200, { ok: true }) : json(404, { error: 'Not found.' });
});

export const onRequestDelete = handleErrors(async ({ env, params }) => {
  const r = await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(idOf(params.id)).run();
  return r.meta.changes ? json(200, { ok: true }) : json(404, { error: 'Not found.' });
});
