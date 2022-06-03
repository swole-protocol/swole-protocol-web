import {
  Container,
  Heading,
  Flex
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <Container p={2}>
      <Flex justifyContent='space-between'>
        <Heading size='lg'>Swole</Heading>
        <ConnectButton />
      </Flex>
    </Container>
  );
}