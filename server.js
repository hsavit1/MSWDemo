import {graphql} from 'msw';
import {setupServer} from 'msw/native';

export default setupServer(
    graphql.query('getCharacters', (req, res, ctx) => {
      return res(
        ctx.data({
          characters: {
            results: [
              {
                __typename: 'Character',
                id: '1',
                name: 'Guy',
              },
              {
                __typename: 'Character',
                id: '2',
                name: 'Girl',
              },
              {
                __typename: 'Character',
                id: '3',
                name: 'Joe',
              },
              {
                __typename: 'Character',
                id: '4',
                name: 'Jane',
              },
              {
                __typename: 'Character',
                id: '5',
                name: 'John Smith',
              },
            ],
          },
        }),
      );
    }),
  );