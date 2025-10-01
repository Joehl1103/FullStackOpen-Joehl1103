import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { SetContextLink } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws/client'

// link object used to gather the auth information from local storage
const authLink = new SetContextLink(({ headers }, forward) => {
  const token = localStorage.getItem("phonenumbers-user-token")
  const newHeaders = {
    ...headers,
    authorization: token ? `Bearer ${token}` : null
  }
  return { headers: newHeaders }
})
// terminating link that sends the graphql operation to the remote endpoint via HTTP
const httpLink = new HttpLink({
  uri: 'http:///localhost:4000'
})

// initializing a websocket link with connection to 4000
const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)

// merging the websocket link and the http link into a single link
const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation == 'subscription'
  )
},
  wsLink,
  authLink.concat(httpLink)
)

// this is the main object that will allow us to communicate with the server
const client = new ApolloClient({
  // composition of the link-chain
  link: splitLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

