import { Wrap, WrapItem, Flex, Box, Heading, Center, Icon, HStack } from "@chakra-ui/react";
import useAddress from '../utils/useAddress.js';
import { MdClose } from 'react-icons/md'
import {ArweaveApolloClient} from './api/apollo/apollo-client.ts';
import ExerciseModal from "../components/ExerciseModal";
import MintButton from "../components/mint/mint-button";
import { useState } from 'react';
import {fetchTransactionsByTag} from '../pages/api/arweave-client';

function arweaveTxnToExercise(txn) {
  const {tags} = txn.node


  let exerciseObject = {}
  tags.forEach(element => {
    exerciseObject[element.name] = element.value
  });

  return exerciseObject
}

function Exercises(data) {
  const exercises = data.data

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
        {exercises?.map((exercise, idx) => {
          return (
            <WrapItem key={idx}>
              <ExerciseModal exercise={arweaveTxnToExercise(exercise)} handleAddWorkout={handleAddWorkout} />
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
              <HStack ml={24} w={80} h={6} onMouseOver={() => handleTrashIn(workout.name)} onMouseOut={() => handleTrashOut()}>
                <Heading size='sm'>{workout.name}</Heading>
                <Box w={10}>
                  {showTrash && currentWorkout == workout.name && <Icon as={MdClose} onClick={() => deleteFromWorkout(workout.name)} />}
                </Box>
              </HStack>
            )
          })}
        </Box>
        <Center>
          {newWorkout.length > 0 && <MintButton workoutData={`{"name": "test"}`} />}
          {!newWorkout.length  && <p>☝️ Connect wallet to mint ☝️</p>}
        </Center>
      </Box>
    </Flex>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const data = await fetchTransactionsByTag("swole-protocol");
   const { edges } = data.props;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data: edges
    },
  }
}


export default Exercises;