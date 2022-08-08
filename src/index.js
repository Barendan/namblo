import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'https://namblo-server.herokuapp.com/',
  uri: 'http://localhost:4000/',
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