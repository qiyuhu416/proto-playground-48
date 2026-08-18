import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { NAV_ITEMS, navHref } from "./-navItems";

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
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <QueryClientProvider client={queryClient}>
      {/* Header badge - present on all pages */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-neutral-200/50">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
          <div className="hidden md:inline-flex group relative">
            <a href="https://www.linkedin.com/in/qiyu-hu/" className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-neutral-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-neutral-900 hover:text-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all overflow-hidden !cursor-default" target="_blank" rel="noopener noreferrer">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0 whitespace-nowrap">currently AI prototyper @Apple</span>
              <span className="absolute left-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">Qiyu's LinkedIn ↗</span>
            </a>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-full z-10">"key-you" it is 🔑 🫵</div>
          </div>
        </div>
      </header>

      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />

      {/* Floating bottom nav - present on all pages */}
      <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        {NAV_ITEMS.map((l) => {
          const isActive = (l === "work" && currentPath === "/") ||
                          (l !== "work" && currentPath.startsWith(`/${l}`));
          return (
            <Link key={l} to={navHref(l)} className={`rounded-full px-4 py-1.5 text-sm transition-colors ${isActive ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"}`}>{l}</Link>
          );
        })}
      </nav>
    </QueryClientProvider>
  );
}
