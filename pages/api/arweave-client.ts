import {arweaveApolloClient} from './apollo/apollo-client';
import { gql } from "@apollo/client";

export const fetchTransactionsByTag = async (tag: string) => {
    let tags = [  
        { "name": "brand", "values": [tag] }
    ] as any;
    

    const FIND_BY_TAG_QUERY = gql`
        query getDataByTags($tags: [TagFilter!]) {
        transactions(tags: $tags) {
            edges {
                node {
                    id
                    tags {
                        name
                        value
                    }
                }
            }
        }
    }
    `;

    try {
        const { data } = await arweaveApolloClient.query({
            query: FIND_BY_TAG_QUERY,
            variables: {
                "tags": tags
            }
        });

        return {
            props: {
                edges: data.transactions.edges
            }
        };
    } catch (error) {
        console.log(`[Error communicating with arweave graphql api] error=${error}`);

        return {
            props: {
                edges: "error"
            }
        }
    }

}