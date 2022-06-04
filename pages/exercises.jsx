import { HStack } from "@chakra-ui/react";
import { Description } from "@ethersproject/properties";
import ExerciseModal from "../components/ExerciseModal";

function Exercise() {
  const data = require('../res/testData.json');

  return(
    <HStack>
      {data.exercises.map(exercise => {
        return <ExerciseModal exercise={exercise}/>
      })}
    </HStack>
  )
}

export default Exercise;