import {
  from,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import fetch from 'node-fetch';

let uri = 'https://rickandmortyapi.com/graphql/';
if (process.env.NODE_ENV === 'test') {
  uri = 'http://localhost:3000/graphql/';
}

const link = from([
  new HttpLink({
    uri,
    credentials: 'same-origin',
    fetch: (...args) => {
      return fetch(...args);
    },
  })
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
