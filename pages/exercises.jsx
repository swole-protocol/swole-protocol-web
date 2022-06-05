import { Flex, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import { Description } from "@ethersproject/properties";
import ExerciseModal from "../components/ExerciseModal";

function Exercise() {
  const data = require('../res/testData.json');

  return(
    <Wrap>
      {data.exercises.map(exercise => {
        return ( 
          <WrapItem>
            <ExerciseModal exercise={exercise}/>
          </WrapItem>
        );
      })}
    </Wrap>
  )
}

export default Exercise;