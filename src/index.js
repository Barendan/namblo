import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const httpLink = createHttpLink({
  uri: process.env.NODE_ENV !== 'production'
  ? 'http://localhost:4000'
  : process.env.REACT_APP_GQL_SERVER
})

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  // uri: 'https://namblo-server.herokuapp.com/',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client} >
    {/* Remove strict mode cause of Semantic UI errors (fixed in v3) */}
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </ApolloProvider>
);