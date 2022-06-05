import React, { useState } from "react";
import {
  SWOLE_PROTOCOL_ADDRESS,
  POLYGONSCAN_TX_URL,
} from "../../pages/utils/constants";
import { ethers } from "ethers";
import SwoleProtocol from "../../artifacts/SwoleProtocol.json";
import { pinJson } from "../../pages/api/pinata/pinata-service";
import {
  Button,
  HStack,
  CircularProgress,
  Center,
  Link,
} from "@chakra-ui/react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

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

const MintButton = (workoutData: string): JSX.Element => {
  const [isMinting, setIsMinting] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [txReceipt, setTxReceipt] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const uploadToPinata = async () => {
    try {
      const result = await pinJson(workoutData);
      setFileUrl(result);
    } catch (error) {
      console.log(`[Error uploading data to IPFS] ${error}`);
    }
  };

  const mint = async () => {
    try {
        const web3Modal = new Web3Modal({
            network: "matic", // optional
            cacheProvider: true, // optional
            providerOptions, // required
          });
          web3Modal.clearCachedProvider();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        SWOLE_PROTOCOL_ADDRESS,
        SwoleProtocol.abi,
        signer
      );

      //TODO: don't hard code this
      const uploadWorkoutUrl =
        "https://gateway.pinata.cloud/ipfs/Qmd4k2bMfiLeqgV4HDddGffSQ4v864n4rdK6fyciQDtfE5"; //await uploadToPinata();

      const transaction = await contract.mintWorkout(uploadWorkoutUrl);
      setIsMinting(true);
      const receipt = await transaction.wait();
      setTxReceipt(receipt.transactionHash);
    } catch (error) {
      console.log(`[Error minting] ${error}`);
    }
  };

  return (
    <HStack>
      <Button
        w="100%"
        colorScheme="green"
        onClick={mint}
        disabled={isMinting}
        hidden={isMinting}
        my="2"
        fontSize={{ base: "s", sm: "xl" }}
      >
        Mint
      </Button>
      {isMinting && (
        <Center h="160px">
          {!txReceipt && (
            <CircularProgress isIndeterminate color="green.300" size="100px" />
          )}
          {txReceipt && (
            <Link
              fontSize="lg"
              color="#3182ce"
              href={`${POLYGONSCAN_TX_URL}${txReceipt}`}
              isExternal
            >
              View your transaction
            </Link>
          )}
        </Center>
      )}
    </HStack>
  );
};

export default MintButton;
