import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import theme from './components/theme';
import Tabs from './components/Tabs/Tabs';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:3005/graphql',
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache,
  link,
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <Tabs />
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
