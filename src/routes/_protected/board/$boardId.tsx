import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/board/$boardId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/boards/$boardId"!</div>;
}
