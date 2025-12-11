import { getUserQueryOptions } from "@/modules/auth/services";
import { SignOutButton } from "@/modules/auth/sign-out-button";

import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/boards")({
  component: RouteComponent,
});

function RouteComponent() {
  const getUserSuspenseQuery = useSuspenseQuery(getUserQueryOptions());

  return (
    <div>
      Hello "/_protected/boards"!
      <SignOutButton />
      <pre>{JSON.stringify(getUserSuspenseQuery.data, null, 2)}</pre>
    </div>
  );
}
