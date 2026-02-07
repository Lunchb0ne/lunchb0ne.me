import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseTexture } from "@/components/ui/NoiseTexture";
import { siteMeta } from "@/content/seo";
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
        title: siteMeta.title,
      },
      {
        name: "theme-color",
        content: siteMeta.themeColor,
      },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/icon.svg",
      },
      {
        rel: "apple-touch-icon",
        href: "/icon.svg",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  errorComponent: (props) => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-4 text-center text-white">
      <h1 className="mb-4 font-bold text-4xl text-red-500">Something went wrong</h1>
      <p className="mb-8 max-w-md text-neutral-400">{props.error.message}</p>
      <button
        type="button"
        onClick={props.reset}
        className="rounded-lg bg-neutral-800 px-6 py-2 transition-colors hover:bg-neutral-700"
      >
        Try again
      </button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-4 text-center text-white">
      <h1 className="mb-4 font-bold text-9xl text-neutral-800">404</h1>
      <h2 className="mb-4 font-semibold text-2xl">Page Not Found</h2>
      <p className="mb-8 max-w-md text-neutral-400">The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="rounded-lg bg-cyan-600 px-6 py-2 font-medium transition-colors hover:bg-cyan-500">
        Go Home
      </Link>
    </div>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <NoiseTexture />
        <CursorProvider>
          <CustomCursor />
          {children}
          {import.meta.env.DEV && (
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
          )}
        </CursorProvider>
        <Scripts />
      </body>
    </html>
  );
}
