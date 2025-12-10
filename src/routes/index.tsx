import { authClient } from "@/integrations/better-auth/client";
import { SignInForm } from "@/modules/auth/sign-in-form";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  console.log("[authClient]", authClient);
  return <SignInForm onSignUpClick={() => console.log("[onSignUpClick]")} />;
}
