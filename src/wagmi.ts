import { configureChains, mainnet, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultConfig } from 'connectkit';
import { polygon, polygonZkEvm, polygonZkEvmTestnet } from 'wagmi/chains';

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, polygonZkEvm, polygonZkEvmTestnet],
  [alchemyProvider({ apiKey: alchemyApiKey  }), publicProvider()],
)

export const config = createConfig(
  getDefaultConfig({
    publicClient,
    webSocketPublicClient,
    autoConnect: true,
    appName: 'Web3 Patient Portal',
    walletConnectProjectId,
  })
)




 