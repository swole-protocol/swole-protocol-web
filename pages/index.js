import { Heading, Flex, Box, Text, Button, HStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  const sampleData = require("../sample-json/pinata-sample.json");

  return (
    <Box p={32}>
      <Heading size='2xl' maxW='25rem'>On chain fitness</Heading>
      <Text fontSize='xl' maxW='25rem'>Swole Protocol aims to be the go-to decentralized source of truth for exercise data and will provide personal trainers (and anyone really) to create customized workouts as NFT's which they can perpetually profit from secondary market sales. Swole-Protocol is fitness but with a web3 twist 💪</Text>
      <Link href='/exercises'>
        <Button size='lg' mt={12} minW='20vw' minH='5vh' bg='none' border='1.5px solid black'
          fontSize='xl' boxShadow='0px 0px 15px #a5a5a5' _hover={{
            boxShadow: '0px 0px 35px #a5a5a5'
          }} color='#000'>
          Get Started
        </Button>
      </Link>
    </Box>
  );
}
