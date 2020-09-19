import React from "react"
import {render, fireEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native';
import {App, MyRootComponent} from '../App';
import server from "../server"
import client from '../client'
import { ApolloProvider } from "@apollo/client";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const ComposedComponent = () => {
  return (
    <ApolloProvider client={client}>
      <MyRootComponent />
    </ApolloProvider>
  )
}

test('should pass', async () => {
  expect(true).toBeTruthy();
});

test('shows mocked results', async () => {
  const {getByTestId, getByText, debug} = render(<ComposedComponent />);

  await waitFor(() => expect(getByTestId('loading')).toBeTruthy())
  
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  
  await waitFor(() => expect(getByText('Rick Sanchez')).toBeTruthy());
});
