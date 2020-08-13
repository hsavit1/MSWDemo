## MSW React Native example

An example of using MSW in development

### Running

```bash
yarn # install deps

react-native run-ios
```

this will only work right now if you uncomment https://rickandmortyapi.com/graphql/ in the App.js

### Tests

you can run the test suite with `npm run test`


**WIP**

Currently, this works when uncommenting https://rickandmortyapi.com/graphql/ . however, if im not mistaken, this should work against the mocked server even without the rickandmortyapi. I believe that there is a bug with MSW.