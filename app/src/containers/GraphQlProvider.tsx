import React, { useEffect } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";
import { fetcher } from '../lib'
import { setContext } from '@apollo/client/link/context';


const API_ROOT = 'http://localhost:4000'
const API_URI = `${API_ROOT}/graphql`



const uploadLink = createUploadLink({
  uri: API_URI,
  credentials: 'include',
});


const authLink = setContext(
  (_, { headers }) => 
    new Promise((resolve, reject) => {
    try {
      const token = localStorage.getItem('authorization')
      resolve({
        headers: {
          ...headers,
          'authorization': token ? token : ''
        }
      })
    } catch {
      reject('Problem with authentication')
    }
  })
);


const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    addTypename: false
  })
});


const GrapQlProvider: React.FC = ({ children }) => {

  useEffect(() => {
    fetcher(`${API_ROOT}/auth`, {
      credentials: 'include'
    }).then(data => {
      const { token } = data as { token: string }
      localStorage.setItem('authorization', token)
    }).catch(() => null) 
  }, [])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default GrapQlProvider
