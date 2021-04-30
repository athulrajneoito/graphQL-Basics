
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from '../graphql/typeDefs';
import resolvers from "../graphql/resolvers";
import * as appModels from '../models';
import auth from '../middlewares/auth';
import { RequestCustom } from '../interfaces'

const PORT = process.env.port || 4000;


const app = express();


// establishing database connection
require('../db/mongoose');
app.use(auth);

const server = new ApolloServer({
    typeDefs, resolvers, context: (expressRequest: RequestCustom) => {
        const req = expressRequest;
        const { isAuth, user } = req;
        return {
            req, isAuth, user, ...appModels
        }
    }
});

server.applyMiddleware({ app })

app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});