import React, { useState } from "react";
import {
  SWOLE_PROTOCOL_ADDRESS,
  POLYGONSCAN_TX_URL,
} from "../../pages/utils/constants";
import { ethers } from "ethers";
import SwoleProtocol from "../../artifacts/SwoleProtocol.json";
import { pinJson } from "../../pages/api/pinata/pinata-service";
import {
  useToast,
  Button,
  HStack,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CircularProgress,
  Center,
  Link,
} from "@chakra-ui/react";

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
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_RPC
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        SWOLE_PROTOCOL_ADDRESS,
        SwoleProtocol.abi,
        signer
      );

      const uploadWorkoutUrl = await uploadToPinata();

      const transaction = await contract.mintWorkout(uploadWorkoutUrl);
      const receipt = await transaction.wait();
      setTxReceipt(receipt.transactionHash);
      setIsMinting(true);
    } catch (error) {
      console.log(`[Error minting] ${error}`);
    }
  };

  const modalCloseHandler = () => {
    setIsMinting(false);
    setModelOpen(false);
    setTxReceipt("");
    setFileUrl("");
  };

  return (
    <HStack>
      <Button
        w="100%"
        colorScheme="green"
        onClick={mint}
        disabled={isMinting}
        mt="10"
        fontSize={{ base: "s", sm: "xl" }}
      >
        Mint
      </Button>
      {isMinting && (
        <Modal
          isOpen={modelOpen}
          onClose={modalCloseHandler}
          closeOnOverlayClick={false}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Processing transaction...</ModalHeader>
            {txReceipt && <ModalCloseButton />}
            <ModalBody>
              <Center h="160px">
                {!txReceipt && (
                  <CircularProgress
                    isIndeterminate
                    color="green.300"
                    size="100px"
                  />
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
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </HStack>
  );
};

export default MintButton;
