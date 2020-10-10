import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";


const API_URI = 'http://localhost:4000/graphql'

const httpLink = createUploadLink({
  uri: API_URI,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false
  })
});


const GrapQlProvider: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default GrapQlProvider
