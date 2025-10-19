import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeFlow - Next-Gen Resume Builder",
  description: "Build dynamic, verified resumes automatically based on your real achievements",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const suppressMetaMaskError = (message) => {
                const str = String(message || '').toLowerCase();
                return str.includes('metamask') || 
                       str.includes('failed to connect') || 
                       str.includes('web3') ||
                       str.includes('ethereum') ||
                       (str.includes('i:') && str.includes('failed'));
              };

              window.addEventListener('error', (event) => {
                if (suppressMetaMaskError(event.message)) {
                  event.preventDefault();
                }
              });
              
              window.addEventListener('unhandledrejection', (event) => {
                const reason = event.reason;
                if (suppressMetaMaskError(reason) || suppressMetaMaskError(reason?.message)) {
                  event.preventDefault();
                }
              });

              // Suppress console errors for MetaMask
              const originalError = console.error;
              console.error = function(...args) {
                if (!suppressMetaMaskError(args.join(' '))) {
                  originalError.apply(console, args);
                }
              };
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
