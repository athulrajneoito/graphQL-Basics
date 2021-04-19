import { ApolloServer } from 'apollo-server';
import apolloConfig from '~config/apollo';


const  PORT  = process.env.port || 4000

// establishing database connection
require('../db/mongoose')

const SERVER = new ApolloServer(apolloConfig);

SERVER.listen(PORT).then(( url:any ) => {
    console.log(`🚀 Server ready at ${url}`);
});
