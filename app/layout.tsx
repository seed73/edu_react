import React from 'react';
import FullLayout from "./full_layout";
import SessionProviderWrapper from '@/utils/sessionProviderWrapper'
// import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<SessionProviderWrapper><FullLayout>{children}</FullLayout></SessionProviderWrapper>)
}
