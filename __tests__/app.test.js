import React from "react"
import {render, fireEvent, waitFor, waitForElementToBeRemoved} from '@testing-library/react-native';
import {App} from '../App';
import server from '../server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should pass', async () => {
  expect(true).toBeTruthy();
});

test('shows mocked results', async () => {
  const {getByTestId, getByText, debug} = render(<App />);

  await waitFor(() => expect(getByTestId('loading')).toBeTruthy())
  
  await waitForElementToBeRemoved(() => getByTestId('loading'));

    debug()

  await waitFor(() => getByText('Jane').toBeTruthy());
});
