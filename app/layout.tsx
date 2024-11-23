import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import {Nunito} from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import { heIL } from "@clerk/localizations";

const MyAppFont=Nunito({subsets:['latin']});

export const metadata: Metadata = {
  title: "Magic Pages",
  description: "Create Kids Stories Using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={heIL}>
    <html lang="en">
      <body
        className={MyAppFont.className}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
    </ ClerkProvider>
  );
}
