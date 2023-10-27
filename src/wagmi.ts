import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'

const walletConnectProjectId = '410e3ee66a03487c8e932b383ffa6de8'

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    walletConnectProjectId,
  })
)
