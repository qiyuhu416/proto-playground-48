import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Design-system guardrail: UI code uses semantic tokens (text-foreground,
  // border-border, bg-card …), never raw palette classes or hard-coded hex.
  // This is an ERROR for every file except the LEGACY list below (a ratchet):
  // new code can't regress, and the list can only shrink. To migrate a legacy
  // file, fix its raw colours (see the "Code adoption map" in the Figma Design
  // system), then delete it from the list. Dark-surface files need an
  // "on dark" token set first; the 3 hidden pages are left untouched on purpose.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: [
      "src/components/ui/**",
      "src/routeTree.gen.ts",
      // ---- LEGACY (remove entries as they are migrated) ----
      "src/routes/haha.tsx", // hidden page
      "src/routes/reflection-notes.tsx", // hidden page
      "src/routes/human-ai-research.tsx", // hidden page
      "src/routes/designing-next-gen-ai-products.tsx", // dark demo panels
      "src/routes/proactive.tsx", // dark demo panels
      "src/routes/think.tsx", // dark surfaces
      "src/routes/listen.tsx", // dark page + canvas
      "src/routes/-SiteNav.tsx", // dark nav pill
      "src/routes/designing-for-conversations-that-earn-trust.tsx", // dark code boxes
      "src/components/QuadrantDestinationView.tsx", // dark surfaces
      "src/components/QuadrantSection.tsx", // dark surfaces
      "src/components/HeroWithCircles.tsx", // dark surfaces
      "src/components/LinkedInBadge.tsx", // dark surface
    ],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/\\b(?:text|bg|border|ring|fill|stroke|divide|outline|decoration|from|to|via)-(?:neutral|gray|zinc|slate|stone)-\\d{2,3}\\b/]",
          message:
            "Use a semantic token instead of a raw palette class (e.g. text-foreground, text-muted-foreground, text-subtle-foreground, border-border, bg-muted).",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(?:text|bg|border|ring|fill|stroke|divide|outline|decoration|from|to|via)-(?:neutral|gray|zinc|slate|stone)-\\d{2,3}\\b/]",
          message:
            "Use a semantic token instead of a raw palette class (e.g. text-foreground, text-muted-foreground, text-subtle-foreground, border-border, bg-muted).",
        },
        {
          selector: "Literal[value=/\\b(?:text|bg|border|ring|fill|stroke)-\\[#[0-9a-fA-F]{3,8}\\]/]",
          message: "Don't hard-code a hex color in a class. Add or use a design token instead.",
        },
      ],
    },
  },
  eslintPluginPrettier,
);
