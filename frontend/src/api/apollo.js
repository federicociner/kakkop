import {ApolloClient, InMemoryCache} from "@apollo/client";

import * as endpoints from "./endpoints";

const client = new ApolloClient({
  uri: `${endpoints.BASE_URL}${endpoints.GRAPHQL}`,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
