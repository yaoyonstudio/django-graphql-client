import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './libs/keact/css/normalize.css'
import './libs/keact/css/flex.css'
import './libs/keact/css/common.css'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8888/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Authorization JWT ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  // link: new HttpLink({ uri: 'http://127.0.0.1:8888/graphql' }),
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

registerServiceWorker();
