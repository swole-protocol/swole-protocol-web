import { Heading, Flex, Box, Text, Button, HStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Box p={32}>
      <Heading size='2xl' maxW='25rem'>On chain fitness</Heading>
      <Text fontSize='xl' maxW='25rem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
      <Link href='/exercises'>
        <Button size='lg' mt={12} minW='20vw' minH='5vh' bg='none' border='1.5px solid black'
          fontSize='xl' boxShadow='0px 0px 15px #a5a5a5' _hover={{
            boxShadow: '0px 0px 35px #a5a5a5',
            bg: '#eee', color: 'black'
          }} color='#fff'>
          Get Started
        </Button>
      </Link>
    </Box>
  );
}
