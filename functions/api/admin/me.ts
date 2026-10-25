import { json, type Env } from '../../_lib';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => json(200, { user: env.ADMIN_USER || 'admin' });
