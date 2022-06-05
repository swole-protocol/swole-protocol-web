import { Wrap, WrapItem, Flex, Box, Heading, Button, Center } from "@chakra-ui/react";
import useAddress from '../utils/useAddress.js';

import ExerciseModal from "../components/ExerciseModal";
import { useState } from 'react';

function Exercise() {
  const data = require('../res/testData.json');
  const [newWorkout, setNewWorkout] = useState([]);
  let address = useAddress();

  const handleAddWorkout = (workout) => {
    if (newWorkout.length >= 7) {
      return
    }
    if (!newWorkout?.some(x => x === workout)) {
      setNewWorkout(oldState => [...oldState, workout]);
    }
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
       {newWorkout.length > 0 && newWorkout.map(workout => {
         return (
           <Box>
           <Heading size='sm'>{workout.name}</Heading>
           {/* {showTrash && <Trash
             size={20}
             strokeWidth={2}
             color={'black'}
           />} */}
           </Box>
         )
       })}
     </Box>
     <Center>
     {newWorkout.length > 0 && address && <Button m='0 auto' my={2}>Mint Workout</Button>}
       {!address && <p>☝️ Connect wallet to mint ☝️</p>}
     </Center>
     </Box>
    </Flex>
  )
}

export default Exercise;