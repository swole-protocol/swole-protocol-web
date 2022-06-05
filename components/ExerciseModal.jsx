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
    CheckIcon,
    Image
  } from "@chakra-ui/react";


  export default function BeginModal(props) {
    const { handleAddWorkout } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        name,
        description,
        muscleGroups,
        equipment,
        image_link,
        video_link,
        metadata
    } = props.exercise;

    return (
        <Box mb={[0, 2]}>
            <Center py={6}>
                <Box
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                        onClick={onOpen}
                        textAlign={'center'}
                        p={6}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Text
                            fontSize={'sm'}
                            fontWeight={500}
                            bg={useColorModeValue('green.50', 'green.900')}
                            p={2}
                            px={3}
                            color={'green.500'}
                            rounded={'full'}>
                            {name.toUpperCase()}
                        </Text>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <img src={image_link}/>
                        </Stack>
                    </Stack>

                    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                        <Button
                            onClick={onClick={() => handleAddWorkout(name)}}
                            w={'full'}
                            bg={'green.400'}
                            color={'white'}
                            rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{bg: 'green.500',}}
                            _focus={{bg: 'green.500',}}>
                            Add to Workout
                        </Button>
                    </Box>
                </Box>
            </Center>

            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay bg='none'
                    backdropFilter='auto'
                    backdropInvert='10%'
                    backdropBlur='3px'
                />
                <ModalContent maxW='75vw'>
                    <ModalBody p={6} maxH='80vh' overflow='scroll'>
                        <Flex
                            minH={'100vh'}
                            align={'center'}
                            justify={'center'}
                            bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Stack spacing={8} mx={'auto'} maxW={900} py={12} px={6}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'}>{name.toUpperCase()}</Heading>
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
                                        <FormControl>
                                            <FormLabel>Name:</FormLabel>
                                            <FormLabel>{name.toUpperCase()}</FormLabel>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Description:</FormLabel>
                                            <FormLabel>{description}</FormLabel>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>muscleGroup:</FormLabel>
                                            <FormLabel>{muscleGroups}</FormLabel>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Equipment:</FormLabel>
                                            <FormLabel>{equipment}</FormLabel>
                                        </FormControl>
                                        {
                                            image_link === null ?
                                                <FormControl>
                                                    <FormLabel>Image:</FormLabel>
                                                    <Image src={image}></Image>
                                                </FormControl> :
                                                <div/>
                                        }

                                        <Stack spacing={10}>
                                            <Stack
                                                direction={{ base: 'column', sm: 'row' }}
                                                align={'start'}
                                                justify={'space-between'}>
                                                <Checkbox>Include Media</Checkbox>
                                                <Link color={'blue.400'}>Reset</Link>
                                            </Stack>
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
  
