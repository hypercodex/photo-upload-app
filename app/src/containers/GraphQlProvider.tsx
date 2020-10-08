import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';


const API_URI = 'http://localhost:4000/graphql'

const client = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache()
});


const GrapQlProvider: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default GrapQlProvider
