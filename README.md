# Bizpad – deploy to Vercel

Free business tools (receipts, sales book, debtors, stock, float tracker, price calculator) with SEO pages for 14 business types. Pro ($5/month) removes branding, adds logo/colour and backup.

## Run locally
`npm install && npm run dev` → http://localhost:3000

## Go live
1. Create a Lemon Squeezy product (works from Zimbabwe), enable **license keys**, price it monthly. Copy the buy link.
2. Push this folder to a GitHub repo.
3. vercel.com → Add New → Project → import the repo → Deploy.
4. Project → Settings → Environment Variables (copy from `.env.example`), then redeploy:
   `NEXT_PUBLIC_CHECKOUT_URL`, `NEXT_PUBLIC_PRO_PRICE`, `NEXT_PUBLIC_SITE_URL`, `LEMONSQUEEZY_VALIDATE=1`
5. Add a custom domain in Settings → Domains, then update `NEXT_PUBLIC_SITE_URL`.
6. Submit `https://YOURDOMAIN/sitemap.xml` to Google Search Console.

## Grow it (SEO)
- Add a business type: add one `B(...)` entry in `lib/data.js`. A new page, sitemap entry and footer link appear automatically.
- Add a tool: add an entry in `TOOLS`, build a component, register it in `components/ToolLoader.js`.
- Share the pages in WhatsApp groups and Facebook groups for shop owners, vendors and agents. Print a QR code for markets.
- Pages already include titles, descriptions, canonical URLs, FAQ and app structured data, sitemap, robots and a phone-installable manifest.

## Revenue honesty
At $5/month, $5,000 needs about 1,000 paying users. Nothing here guarantees that. Test with real shop owners first, and consider selling a done-for-you setup or a business pack in addition to subscriptions.
