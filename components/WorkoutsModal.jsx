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
    ModalBody,
    Center,
    HStack,
    Image,
  } from "@chakra-ui/react";
  
  
  export default function WorkoutsModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleAddWorkout } = props;

    const tmpObj = JSON.parse(props.specs.ipfsJson);  

    console.log("here is the tmp object", tmpObj)
    
    return (
      <Box mb={[0, 2]} >

        <Flex py={6}>
          <Box
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Stack
              textAlign={'center'}
              p={6}
              color={useColorModeValue('gray.800', 'white')}
              align={'center'}
              >
              <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={useColorModeValue('green.50', 'green.900')}
                p={2}
                px={3}
                color={'green.500'}
                rounded={'full'}>
                {tmpObj.name.toUpperCase()}
              </Text>
              <Text textAlign={"center"}>{tmpObj?.description}</Text>
              <Stack direction={'row'} align={'center'} justify={'center'}>
                <Image boxSize='270px' src={tmpObj.image} />
              </Stack>
              
            </Stack>
  
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
              <Button
                onClick={onOpen}
                w={'full'}
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}>
                View
              </Button>
            </Box>
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
          <ModalOverlay bg='none'
            backdropFilter='auto'
            backdropInvert='10%'
            backdropBlur='3px'
          />
          <ModalContent mt={16} maxW={'70vw'}>
            <ModalBody p={6} maxH='80vh' overflow='scroll'>
              <Flex
                align={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={900} py={12} px={6}>

                  <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{tmpObj.name.toUpperCase()}</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                      Get to Work!
                    </Text>
                  </Stack>

                  <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                  >
                      <Stack>
                        {
                            tmpObj.attributes.map(({trait_type, value}, idx) => 
                                <Text key={idx}>{trait_type + ": " + value}</Text>
                            )
                        }
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
  