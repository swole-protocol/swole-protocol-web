import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
    Text,
    Button,
    useDisclosure,
    HStack
  } from "@chakra-ui/react";


  export default function BeginModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {name, description, musclegroup, equipment, type, metaData} = props.exercise;
    //debugger;
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
              <Text>Name: </Text>
              <Box bg="#32CEFE">{name}</Box>
              <Text>Description: </Text>
              <Box bg="#32CEFE">{description}</Box>
              <Text>MuscleGroup: </Text>
              <Box bg="#32CEFE">{musclegroup}</Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box >
    )
  }