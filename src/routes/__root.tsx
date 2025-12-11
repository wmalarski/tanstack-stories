import { TanStackQueryProvider } from "@/integrations/tanstack-query/provider";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { PropsWithChildren } from "react";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootComponent() {
  return (
    <TanStackQueryProvider>
      <Outlet />
      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </TanStackQueryProvider>
  );
}

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <Scripts />
      </body>
    </html>
  );
}
