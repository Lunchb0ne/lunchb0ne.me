import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { CursorProvider } from "@/hooks/useCursor";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Lunch's Site",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  errorComponent: (props) => (
    <RootDocument>
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Something went wrong</h1>
        <p className="text-neutral-400 mb-8 max-w-md">{props.error.message}</p>
        <button
          type="button"
          onClick={props.reset}
          className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </RootDocument>
  ),
  notFoundComponent: () => (
    <RootDocument>
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 text-center">
        <h1 className="text-9xl font-bold mb-4 text-neutral-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-neutral-400 mb-8 max-w-md">The page you are looking for does not exist or has been moved.</p>
        <a href="/" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors font-medium">
          Go Home
        </a>
      </div>
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <CursorProvider>
          {children}
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </CursorProvider>
        <Scripts />
      </body>
    </html>
  );
}
