import { Wrap, WrapItem } from "@chakra-ui/react";
import {ApolloProvider, useQuery} from "@apollo/client";
import {SwoleApolloClient} from './api/apollo/apollo-client.ts';
import { Spinner } from '@chakra-ui/react'
import gql from "graphql-tag";

// See our Subgraph GraphQL explorer here https://thegraph.com/hosted-service/subgraph/mnlesane/swole-protocol-mainnet
const GET_ALL_WORKOUTS = gql`
    query GetAllWorkouts {
        workouts {
            id
            owner
            ipfsJson
        }
    }
`;

function Workout(props) {
    console.log(props)
    console.log(props.specs)
    return (
        <div>
            <p>{props.specs.ipfsJson}</p>
        </div>
    )
}

function WorkoutRoot() {
    const { loading, error, data } = useQuery(GET_ALL_WORKOUTS);

    console.log(loading, error, data)

    if (loading) return <Spinner emptyColor='gray.200' color='red.500' size='xl' thickness="4px" speed="2s"/>
    if (error) return <p>Error: {error.toString}</p>

    return (
        <Wrap>
            {
                data.workouts.map((specs, idx) => <WrapItem key={idx}><Workout specs={specs}/></WrapItem>)
            }
        </Wrap>
    )
}

function Workouts() {
    return (
        <ApolloProvider client={SwoleApolloClient}>
            <WorkoutRoot />
        </ApolloProvider>
    );
}

export default Workouts