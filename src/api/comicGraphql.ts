import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const getClient = () => {
  const token = localStorage.getItem('token');
  const headers: any = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    cache,
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    headers,
  });

  return apolloClient;
};
