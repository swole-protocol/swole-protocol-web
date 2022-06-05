import { Wrap, WrapItem, Box, Text, Heading } from "@chakra-ui/react";
import {ApolloProvider, useQuery} from "@apollo/client";
import {SwoleApolloClient} from './api/apollo/apollo-client.ts';
import { Spinner } from '@chakra-ui/react'
import gql from "graphql-tag";
import WorkoutsModal from "../components/WorkoutsModal";

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

function filterSpec(spec) {
    if (!spec.ipfsJson) return false;

    const obj = JSON.parse(spec.ipfsJson)
    const requiredKeys = ["name", "description", "image", "attributes"]

    return requiredKeys.every(key => !!obj[key])
}

function WorkoutRoot() {
    const { loading, error, data } = useQuery(GET_ALL_WORKOUTS);

    console.log(loading, error, data?.workouts[0])

    if (loading) return <Spinner emptyColor='gray.200' color='red.500' size='xl' thickness="4px" speed="2s"/>
    if (error) return <p>Error: {error.toString}</p>

    return (
        <Box>
            <Heading>My Workouts</Heading>
            <Wrap align={'center'}>
                {
                    data.workouts
                        .filter(filterSpec)
                        .map((specs, idx) => <WrapItem key={idx}><WorkoutsModal specs={specs}/></WrapItem>)
                }
            </Wrap>

        </Box>
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