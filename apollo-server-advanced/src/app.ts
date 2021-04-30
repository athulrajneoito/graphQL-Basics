
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from '../graphql/typeDefs';
import resolvers from "../graphql/resolvers";
import { schemaDirectives } from '../graphql/directives'
import * as appModels from '../models';
import { authMidddleware } from '../middlewares/auth';
import { RequestCustom } from '../interfaces';


const PORT = process.env.port || 4000;


const app = express();


// establishing database connection
require('../db/mongoose');
app.use(authMidddleware);

const server = new ApolloServer({
    typeDefs, resolvers, schemaDirectives, context: ({ req }) => {

        const cusreq:RequestCustom = req as RequestCustom;
        const { isAuth, user } = cusreq;
        return {
            cusreq, isAuth, user, ...appModels
        }
    }
});

server.applyMiddleware({ app })

app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});