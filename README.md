# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## 260517ct1100 install notes - O.A
- From: youtube [Stop Burning Tokens - Use Shadcn Blocks Instead](https://www.youtube.com/watch?v=BU1UYqAZW4Y)
- preset creation ui: `https://ui.shadcn.com/create?preset=b3kb5ad7a&base=base`
- Preset new app command: `pnpm dlx shadcn@latest init --preset b3kb5ad7a --base base --template next`
- Issues:
-- had to run pnpm approve-builds
-- had to run `pnpm dlx shadcn@latest add button`
-- had to copy lib/utils (needed by button) from app previously created with `pnpm create next-app@latest my-app --yes`
-- google search error leads to Shadcn Docs for [Manual Installation](https://ui.shadcn.com/docs/installation/manual)
