import { Wrap, WrapItem, Flex, Box, Heading, Center, Icon, HStack } from "@chakra-ui/react";
import useAddress from '../utils/useAddress.js';
import { MdClose } from 'react-icons/md'
import ExerciseModal from "../components/ExerciseModal";
import MintButton from "../components/mint/mint-button";
import { useState } from 'react';

function Exercise() {
  const data = require('../res/testData.json');
  const [newWorkout, setNewWorkout] = useState([]);
  const [showTrash, setShowTrash] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null)
  let address = useAddress();

  const handleAddWorkout = (workout) => {
    if (newWorkout.length >= 7) {
      return
    }
    if (!newWorkout?.some(x => x === workout)) {
      setNewWorkout(oldState => [...oldState, workout]);
    }
  }

  const handleTrashIn = (name) => {
    setShowTrash(true);
    setCurrentWorkout(name);
  }

  const handleTrashOut = () => {
    setShowTrash(false);
    setCurrentWorkout(null);
  }

  const deleteFromWorkout = (name) => {
    const newArray = newWorkout.filter(x => x.name != name);
    setNewWorkout(newArray);
  }

  return (
    <Flex>
      <Wrap>
        {data?.map(exercise => {
          return (
            <WrapItem>
              <ExerciseModal exercise={exercise} handleAddWorkout={handleAddWorkout} />
            </WrapItem>
          );
        })}
      </Wrap>
      <Box>
        <Box mt={6} h='30vh' w='25rem' border='1px solid #eee' textAlign='center'>
          <Heading size='md' pb={4}>Workout Plan</Heading>
          {newWorkout.length === 0 && <p>add workouts to mint</p>}
          {newWorkout.length > 0 && newWorkout.map((workout, idx) => {
            return (
              <HStack ml={32} w={64} h={6} onMouseOver={() => handleTrashIn(workout.name)} onMouseOut={() => handleTrashOut()}>
                <Heading size='sm'>{workout.name}</Heading>
                <Box w={10}>
                  {showTrash && currentWorkout == workout.name && <Icon as={MdClose} onClick={() => deleteFromWorkout(workout.name)} />}
                </Box>
              </HStack>
            )
          })}
        </Box>
        <Center>
          {newWorkout.length > 0 && address && <MintButton workoutData={`{"name": "test"}`} />}
          {!address && <p>☝️ Connect wallet to mint ☝️</p>}
        </Center>
      </Box>
    </Flex>
  )
}

export default Exercise;