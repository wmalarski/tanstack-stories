import { SignOutButton } from "@/modules/auth/sign-out-button";

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      Hello
      <SignOutButton />
      <Outlet />
    </>
  );
}
