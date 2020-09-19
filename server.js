import {graphql} from 'msw';

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

let server
if (process.env.NODE_ENV === "test") {
    const node = require("msw/node")
    server = node.setupServer(query)
} else {
    const native = require("msw/native")
    server = native.setupServer(query)
}

export default server
