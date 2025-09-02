import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SKS Auto Industries - India's Trusted Manufacturer of Auto Parts | Delhi",
  description:
    "SKS Auto Industries - Leading manufacturer of automotive fasteners, nut bolts, U bolts, clamps, washers & custom fasteners. 25+ years of excellence in Delhi, India. Trusted by 500+ clients across India.",
  keywords:
    "automotive fasteners, nut bolts manufacturer, U bolts, clamps, washers, custom fasteners, auto parts manufacturer, Delhi, India, India, SKS Auto Industries",
  authors: [{ name: "SKS Auto Industries" }],
  creator: "SKS Auto Industries",
  publisher: "SKS Auto Industries",
  robots: "index, follow",
  openGraph: {
    title: "SKS Auto Industries - India's Trusted Auto Parts Manufacturer",
    description:
      "Leading manufacturer of automotive fasteners and components. 25+ years of excellence serving India's automotive industry from Delhi, India.",
    url: "https://sksautoindustries.com",
    siteName: "SKS Auto Industries",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKS Auto Industries - Auto Parts Manufacturer",
    description: "India's trusted manufacturer of automotive fasteners and components since 1998.",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://sksautoindustries.com" />
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Delhi" />
        <meta name="geo.position" content="30.901;75.857" />
        <meta name="ICBM" content="30.901, 75.857" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
