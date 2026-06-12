import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/providers/ClientProviders";
import { getCms } from "@/lib/cms";
import { SITE_NAME, SITE_DESCRIPTION, TAGLINE } from "@/lib/constants";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI filmmaking",
    "film production studio",
    "visual effects",
    "cinematic AI",
    "Om Tatva Digitals",
  ],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg" },
};

// All content is sourced from the database (managed via the admin panel), so
// render every route at request time instead of prerendering at build. This
// removes any build-time database dependency. Freshness/perf still come from
// the cached `getCms()` (revalidates on a timer + on admin save).
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cms = await getCms();

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-black text-foreground antialiased bold-texture"
        suppressHydrationWarning
      >
        <ClientProviders>
          <Navbar navigation={cms.navigation} />
          <main>{children}</main>
          <Footer site={cms.site} navigation={cms.navigation} />
        </ClientProviders>
      </body>
    </html>
  );
}
