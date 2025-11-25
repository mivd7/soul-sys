import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { env } from './constants';
import App from './App';

const client = new ApolloClient({
  link: new HttpLink({ uri: env.VITE_API_URL || "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </StrictMode>,
)
