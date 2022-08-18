import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from './context/authContext';
import App from './App';
import './App.css';

const NODE_ENV = 'production';

const httpLink = createHttpLink({
  uri: NODE_ENV !== 'production'
  ? 'http://localhost:4000'
  : 'https://namblo-server.herokuapp.com/'
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ApolloProvider client={client} >
      {/* Remove strict mode cause of Semantic UI errors (fixed in v3) */}
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </ApolloProvider>
  </AuthProvider>
);