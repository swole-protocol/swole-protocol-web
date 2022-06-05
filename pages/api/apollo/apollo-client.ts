import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const ARWEAVE_GRAPHQL = "https://arweave.net/graphql"
const SWOLE_SUBGRAPH_GRAPHQL = "https://api.thegraph.com/subgraphs/name/mnlesane/swole-protocol-mainnet"

export const ArweaveApolloClient = new ApolloClient({
    uri: ARWEAVE_GRAPHQL,
    cache: new InMemoryCache(),
});

export const SwoleApolloClient = new ApolloClient({
    uri: SWOLE_SUBGRAPH_GRAPHQL,
    cache: new InMemoryCache(),
})

