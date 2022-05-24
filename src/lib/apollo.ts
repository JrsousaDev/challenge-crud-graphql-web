import { ApolloClient, InMemoryCache } from "@apollo/client";
/* import { APOLLO_CONNECTION_CLIENT } from "../constants/config"; */

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({})
})