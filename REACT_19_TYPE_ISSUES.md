# React 19 Type Compatibility Issues

## Problem

React 19 has stricter type definitions that cause TypeScript errors with:
- `lucide-react` icons
- Next.js `Image` component
- Next.js `Link` component
- React Query `QueryClientProvider`

## Solution

We've added `@ts-ignore` comments to suppress these type errors. These are **type-only issues** and don't affect runtime behavior.

## How to Catch These Before Deployment

**Always run a build locally before pushing:**

```bash
pnpm --filter web build
```

This will catch all TypeScript errors before they reach Vercel.

## Pre-Push Hook

A git pre-push hook has been created (`.git/hooks/pre-push`) that will automatically run the build before pushing. If the build fails, the push will be blocked.

## Remaining Issues

Some components may still need `@ts-ignore` comments added. The pattern is:

```tsx
{/* @ts-ignore - React 19 type compatibility */}
<ComponentName ... />
```

## Long-term Fix

When React 19 types are fully stable and libraries are updated, we can remove these `@ts-ignore` comments.

