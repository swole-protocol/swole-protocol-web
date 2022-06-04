import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody 
  } from "@chakra-ui/react";


  export default function BeginModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {name, description, musclegroup, equipment, type, metaData} = props.exercise;

    return (
        <Box mb={[0, 2]}>
        <Button size='lg' minW='15vw' bg='none' border='0.5px solid black'
          fontSize='xl' boxShadow='0px 0px 15px #a5a5a5' _hover={{
            boxShadow: '0px 0px 35px #a5a5a5',
            bg: '#eee', color: 'black'
          }} color='#32CE2E' onClick={onOpen}>
          {name}
        </Button>


        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
          <ModalOverlay bg='none'
            backdropFilter='auto'
            backdropInvert='10%'
            backdropBlur='3px'
          />
          <ModalContent>
            <ModalBody p={6}>
              <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Mint New Exercise</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Create, Share, GET SWOLE!✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="name">
                                <FormLabel>Name:</FormLabel>
                                <FormLabel>{name}</FormLabel>
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel>Description:</FormLabel>
                                <FormLabel>{description}</FormLabel>
                            </FormControl>

                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Include Media</Checkbox>
                                    <Link color={'blue.400'}>Reset</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                    bg: 'blue.500',
                                    }} onClick={onMint}>
                                    Mint
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box >
    )
  }

  function onMint(){}