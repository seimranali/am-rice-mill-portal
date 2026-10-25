import { getSession, json, type Env } from '../../_lib';

// Every /api/admin/* route except login and logout requires a valid session.
export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const path = new URL(request.url).pathname.replace(/\/+$/, '');
  if (path === '/api/admin/login' || path === '/api/admin/logout') return next();
  if (!(await getSession(env, request))) return json(401, { error: 'Not signed in.' });
  return next();
};
