import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { PrefsProvider } from "@/lib/prefs";
import { ThemedToaster } from "@/components/themed-toaster";
import { asset } from "@/lib/asset";
import { copy } from "@/lib/copy";
import appCss from "../styles.css?url";

const APP_NAME = "BliZzen eSport";
const DESCRIPTION = copy.de.meta.description;
const CSP = [
  "default-src 'self'",
  "img-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#0A0E1A" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: asset("og.jpg") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: asset("og.jpg") },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: asset("favicon.svg") },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <html lang="de" className="antialiased" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=(), payment=(), usb=()"
        />
        <HeadContent />
        <script src={asset("theme-boot.js")} />
      </head>
      <body className="bg-void text-fog font-sans">
        <PrefsProvider>
          <Outlet />
          <ThemedToaster />
        </PrefsProvider>
        <Scripts />
      </body>
    </html>
  ),
});
