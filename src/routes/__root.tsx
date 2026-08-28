import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { GridOverlay } from "@/components/GridOverlay";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Hello. You found a bug!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You know vibe coding needs more careful debugging.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <a  href="https://www.linkedin.com/in/qiyu-hu/">
            Talk to Qiyu
            </a>
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go back
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Qiyu Hu — AI Interaction Designer" },
      {
        name: "description",
        content:
          "Qiyu Hu is an AI interaction designer exploring human–AI collaboration through prototypes and research. Based in San Francisco.",
      },
      { name: "author", content: "Qiyu Hu" },
      { property: "og:site_name", content: "Qiyu Hu" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://key-you.com" },
      { property: "og:title", content: "Qiyu Hu — AI Interaction Designer" },
      {
        property: "og:description",
        content:
          "Qiyu Hu is an AI interaction designer exploring human–AI collaboration through prototypes and research.",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Qiyu Hu — AI Interaction Designer" },
      {
        name: "twitter:description",
        content:
          "Qiyu Hu is an AI interaction designer exploring human–AI collaboration through prototypes and research.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style>{`body.modal-open #navbar { display: none !important; }`}</style>
        <script dangerouslySetInnerHTML={{
          __html: `if (window.self !== window.top || new URLSearchParams(window.location.search).get("embed") === "true") {
            document.documentElement.classList.add("embed-mode");
          }`
        }} />
      </head>
      <body>
        {children}
        <Scripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Qiyu Hu",
              url: "https://key-you.com",
              jobTitle: "AI Interaction Designer",
              sameAs: ["https://www.linkedin.com/in/qiyu-hu/"],
            }),
          }}
        />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <GridOverlay />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />

    </QueryClientProvider>
  );
}
