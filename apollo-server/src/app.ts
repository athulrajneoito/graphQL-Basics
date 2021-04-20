import { gql } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import {typeDefs} from '../graphql/typeDefs/typeDefs';
import { resolvers } from "../graphql/resolvers/resolvers";

const PORT = process.env.port || 4000;


const app = express();


// establishing database connection
require('../db/mongoose');


const server = new ApolloServer({ typeDefs, resolvers, context: {} });

server.applyMiddleware({ app })

app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});