import { authClient } from "@/integrations/better-auth/client";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  console.log("[authClient]", authClient);
  return <div>Hello</div>;
}
