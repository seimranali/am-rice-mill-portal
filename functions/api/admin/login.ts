import {
  clean, clientIp, createSession, handleErrors, json, limited, readJson, sameUser, SESSION_TTL_S, sessionCookie, verifyPassword, type Env,
} from '../../_lib';

export const onRequestPost = handleErrors(async ({ request, env }) => {
  if (await limited(env, `login:${clientIp(request)}`, 8, 900)) {
    return json(429, { error: 'Too many login attempts. Try again in 15 minutes.' });
  }
  const b = await readJson(request, 2_000);
  const user = env.ADMIN_USER || 'admin';
  const okUser = sameUser(clean(b.username, 100), user);
  const okPass = await verifyPassword(String(b.password ?? ''), env.ADMIN_PASSWORD_HASH);
  if (!okUser || !okPass) return json(401, { error: 'Incorrect username or password.' });

  const token = await createSession(env);
  return json(200, { ok: true, user }, { 'Set-Cookie': sessionCookie(token, SESSION_TTL_S) });
});
