import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

/*
setContext est utilisé pour créer un middleware qui peut modifier les requêtes sortantes
 avant qu'elles ne soient envoyées. 
Dans ce cas, il est utilisé pour obtenir le token JWT de l'espace de stockage local
 du navigateur (avec localStorage.getItem("token")),
 puis pour définir ce token dans l'en-tête d'autorisation des requêtes sortantes.
*/
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  /*
    Si le token existe, il est ajouté à l'en-tête d'autorisation avec le préfixe Bearer.
    C'est une convention courante pour envoyer un token JWT 
     dans le cadre d'une requête HTTP.
     Si le token n'existe pas, une chaîne vide est envoyée à la place.
    */
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
