import {
  from,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  ApolloLink,
  HttpLink,
  ApolloError,
} from '@apollo/client';

import {onError, ErrorResponse} from '@apollo/client/link/error';

import fetch from 'node-fetch';

let uri = 'https://rickandmortyapi.com/graphql/';
if (process.env.NODE_ENV === 'test') {
  console.log({env: process.env.NODE_ENV})
  uri = 'http://localhost:3000/graphql/';
}

const link = from([
  new HttpLink({
    uri,
    credentials: 'same-origin',
    fetch: (...args) => {
      return fetch(...args);
    },
  }),
//   onError((error) => {
//     const {graphQLErrors, networkError, operation} = error;
//     if (operation) console.log({errorFromQueryName: operation.operationName});
//     if (graphQLErrors) console.log({graphQLErrors});
//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
