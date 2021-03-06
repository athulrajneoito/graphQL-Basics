import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import CreateBook from "./components/CreateBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CreateBook></CreateBook>
        <BookList></BookList>
      </div>
    </ApolloProvider>
  );
}

export default App;
