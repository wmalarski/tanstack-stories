import { betterAuthMiddleware } from "@/integrations/better-auth/middleware";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request, context }) => {
        return context.auth.handler(request);
      },
      POST: ({ request, context }) => {
        return context.auth.handler(request);
      },
    },
    middleware: [betterAuthMiddleware],
  },
});
