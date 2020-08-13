import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  ApolloLink,
  HttpLink,
} from '@apollo/client';

import fetch from 'node-fetch';

// import server from "./server.js"

const GET_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
      }
    }
  }
`;

const client = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      // uri: 'https://rickandmortyapi.com/graphql/', // uncomment this to see working example
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin',
      fetch: (...args) => {
        return fetch(...args);
      },
    }),
  ]),

  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const MyRootComponent = () => {
  const {data, loading, error} = useQuery(GET_CHARACTERS);

  const DATA = data?.characters?.results;

  const renderItem = ({item}) => {
    return <Item title={item.name} />;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.sectionTitle}>Rick and morty MSW demo</Text>

        {loading && <ActivityIndicator testID="loading" />}

        {error && <Text testID="error">{`${error}`}</Text>}

        {!loading && !error && DATA?.length > 0 && (
          <FlatList
            testID="list"
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
