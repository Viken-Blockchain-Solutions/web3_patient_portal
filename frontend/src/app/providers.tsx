"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import { config } from "../wagmi";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <NextUIProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  );
}
