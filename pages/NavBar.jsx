import { Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useState } from "react";
import Web3Modal from "web3modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        137: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_RPC, 
      }
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Swole-Protocol", // Required
      rpc: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_RPC, // Optional if `infuraId` is provided; otherwise it's required
      chainId: 137, // Optional. It defaults to 1 if not provided
      darkMode: true, // Optional. Use dark theme, defaults to false
    },
  },
};

function NavBar() {
  const [isConnect, setIsConnected] = useState(false);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: "matic", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
    web3Modal.clearCachedProvider();
    const connection = await web3Modal.connect();
    setIsConnected(true);
  };

  const disconnectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: "matic", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
    await web3Modal?.clearCachedProvider();
    setIsConnected(false);
  };

  return (
    <Flex justifyContent="space-between" p={4}>
      <Heading
        size="2xl"
        bgGradient="linear(to-r, #C76173 70%, #9A7BC3 100%)"
        bgClip="text"
      >
        Swole Protocol
      </Heading>
      <Flex gap={6}>
        <Link href="/">Home</Link>
        <Link href="/exercises">Exercises</Link>
        <Link href="/workouts">Workouts</Link>
        {!isConnect && (
          <Button
            colorScheme="blue"
            onClick={connectWallet}
            fontSize={{ base: "s", sm: "xs" }}
          >
            Connect Wallet
          </Button>
        )}
        {isConnect && (
          <Button
            colorScheme="red"
            onClick={disconnectWallet}
            fontSize={{ base: "s", sm: "xs" }}
          >
            Disconnect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
