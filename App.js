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
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';

import client from './client.js'

import {graphql} from 'msw';
import {setupServer} from 'msw/native';

const query = graphql.query('getCharacters', (req, res, ctx) => {
  return res(
    ctx.data({
      characters: {
        results: [
          {
            __typename: 'Character',
            id: '1',
            name: 'Rick Sanchez',
          },
          {
            __typename: 'Character',
            id: '2',
            name: 'Morty Smith',
          },
          {
            __typename: 'Character',
            id: '3',
            name: 'Summer Smith',
          },
          {
            __typename: 'Character',
            id: '4',
            name: 'Beth Smith',
          },
          {
            __typename: 'Character',
            id: '5',
            name: 'Jerry Smith',
          },
          {
            __typename: 'Character',
            id: '6',
            name: 'Abadango Cluster Princess',
          },
          {
            __typename: 'Character',
            id: '7',
            name: 'Abradolf Lincler',
          },
          {
            __typename: 'Character',
            id: '8',
            name: 'Adjudicator Rick',
          },
          {
            __typename: 'Character',
            id: '9',
            name: 'Agency Director',
          },
          {
            __typename: 'Character',
            id: '10',
            name: 'Alan Rails',
          },
        ],
      },
    }),
  );
});

export const server = setupServer(query);

if(process.env.NODE_ENV === "development") {
  require('react-native-url-polyfill/auto');
  server.listen(); // comment this line to see real API results
}

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

export const MyRootComponent = () => {
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
