import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const ARWEAVE_GRAPHQL = "https://arweave.net/graphql"

export const arweaveApolloClient = new ApolloClient({
    uri: ARWEAVE_GRAPHQL,
    cache: new InMemoryCache(),
});