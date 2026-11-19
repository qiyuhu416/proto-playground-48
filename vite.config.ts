// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Forwarded straight into viteReact() (the config package instantiates it,
  // not us — see the comment above). Adds styled-jsx's own Babel transform
  // so `<style jsx>` blocks compile, needed for QuadrantDestinationView's
  // spinning-quote card to use the literal shadcn Button/style-jsx code it
  // was built from instead of a Tailwind-only reimplementation.
  react: {
    babel: {
      plugins: ["styled-jsx/babel"],
    },
  },
  vite: {
    server: {
      port: 3001,
      strictPort: false,
    },
  },
});
