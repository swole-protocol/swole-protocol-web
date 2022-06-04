import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './NavBar'
const { chains, provider } = configureChains(
  [chain.polygon],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: 'https://rpc.ankr.com/polygon', // go to https://www.ankr.com/protocol/ to get a free RPC for your network if you're not using Polygon
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Swole Protocol',
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <NavBar />
          <Box p={8}>
            <Component {...pageProps} />
          </Box>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
