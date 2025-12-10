import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import type { Db } from "../drizzle/init";
import { schema } from "../drizzle/schema";

type InitBetterAuthArgs = {
  db: Db;
  env: Env;
};

export const initBetterAuth = ({ db, env }: InitBetterAuthArgs) => {
  return betterAuth({
    baseURL: env.VITE_BETTER_AUTH_URL,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    emailAndPassword: { enabled: true },
    plugins: [tanstackStartCookies()],
    secret: env.BETTER_AUTH_SECRET,
  });
};

export type Auth = ReturnType<typeof initBetterAuth>;
