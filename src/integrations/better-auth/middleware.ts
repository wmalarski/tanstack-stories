import { createMiddleware } from "@tanstack/react-start";

import { env } from "cloudflare:workers";
import { drizzleMiddleware } from "../drizzle/middleware";
import { initBetterAuth } from "./init";

export const betterAuthMiddleware = createMiddleware()
  .middleware([drizzleMiddleware])
  .server(async ({ next, context, request }) => {
    const auth = initBetterAuth({ db: context.db, env });

    try {
      const response = await auth.api.getSession({ headers: request.headers });

      const session = response?.session ?? null;
      const user = response?.user ?? null;

      return next({ context: { auth, session, user } });
    } catch {
      return next({ context: { auth, session: null, user: null } });
    }
  });

export const protectedMiddleware = createMiddleware()
  .middleware([betterAuthMiddleware])
  .server(async ({ next, context }) => {
    if (!context.session || !context.user) {
      throw new Error("UNAUTHORIZED");
    }

    return next({ context: { session: context.session, user: context.user } });
  });
