import {
  Heading,
  Flex,
  Header
} from '@chakra-ui/react';
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import Link from 'next/link'

function NavBar() {
  return(
    <Flex justifyContent='space-between' p={2}>
      <Heading size='lg'>Swole</Heading>
      <Flex gap={6}>
        <Link href='/'>Home</Link>
        <Link href='/exercises'>Exercises</Link>
        <ConnectButton theme={darkTheme()} showBalance={false} />
      </Flex>
    </Flex>
  )
}

export default NavBar;