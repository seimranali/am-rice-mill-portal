import { deleteSession, handleErrors, json, sessionCookie, type Env } from '../../_lib';

export const onRequestPost = handleErrors(async ({ request, env }) => {
  await deleteSession(env, request);
  return json(200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
});
