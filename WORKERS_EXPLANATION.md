# Workers in Priscilla Life

## What You're Seeing in Build Output

When you see messages like:
```
Collecting page data using 11 workers ...
Generating static pages using 11 workers (0/8) ...
```

These are **Next.js build-time workers** (Node.js worker threads), NOT Web Workers in your application code.

## Next.js Build Workers

### What They Are
- **Node.js Worker Threads** - Parallel processing during the build
- Used by Next.js internally to speed up builds
- Automatically managed by Next.js - you don't configure them

### What They Do
1. **Collecting Page Data** - Fetch data from Sanity CMS for each page in parallel
2. **Generating Static Pages** - Render React components to HTML in parallel
3. **Optimizing Assets** - Process images and other assets concurrently

### How Many Workers?
- Next.js automatically detects your CPU cores
- Uses multiple workers (11 in your case) to parallelize work
- More workers = faster builds (up to a point)

## We're NOT Using Web Workers

**Important:** We are **NOT** using Web Workers (browser API) in our application code. 

### Web Workers vs Build Workers

| Type | Where | Purpose | Our Usage |
|------|-------|---------|-----------|
| **Build Workers** | Build time (Node.js) | Speed up Next.js builds | ✅ Automatic (Next.js) |
| **Web Workers** | Runtime (Browser) | Offload heavy JS to background | ❌ Not used |

## Why We Don't Need Web Workers

Our app doesn't have:
- Heavy client-side computations
- Image processing in the browser
- Large data transformations
- Complex calculations blocking the UI

Our performance optimizations are:
- ✅ Server-side rendering (Next.js)
- ✅ Image optimization (Next.js Image component)
- ✅ React Query caching
- ✅ Code splitting (automatic with Next.js)

## If We Needed Web Workers

If we ever needed to add Web Workers (for heavy client-side work), we would:

1. Create a worker file: `apps/web/public/worker.js`
2. Use it in a component:
```typescript
const worker = new Worker('/worker.js')
worker.postMessage(data)
worker.onmessage = (e) => setResult(e.data)
```

But we don't need this currently - our app is fast enough without it!

## Summary

- **Build workers** = Next.js internal optimization (automatic, good!)
- **Web Workers** = Browser API for heavy client-side work (not needed for our app)
- The "11 workers" you see = Next.js using 11 parallel processes to build faster

