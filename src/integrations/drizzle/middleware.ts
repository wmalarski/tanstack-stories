import { createMiddleware } from "@tanstack/react-start";

import { env } from "cloudflare:workers";
import { initDrizzleConnect } from "./init";

export const drizzleMiddleware = createMiddleware().server(({ next }) => {
  return next({
    context: {
      db: initDrizzleConnect(env),
    },
  });
});
