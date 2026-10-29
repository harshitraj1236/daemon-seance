import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DaemonSéance — Haunted Terminal of Computing Past",
  description: "An airgapped retro CRT terminal channeling the ghosts of computing pioneers and ancient dead languages with local open-weight AI.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                var regSW = function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.warn('SW registration failed: ', err);
                  });
                };
                if (document.readyState === 'complete') {
                  regSW();
                } else {
                  window.addEventListener('load', regSW);
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#06070a] min-h-screen text-[#ffb000] selection:bg-[#ffb000]/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
