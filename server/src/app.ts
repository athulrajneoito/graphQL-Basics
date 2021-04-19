import cors from 'cors';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../schema/schema'
const app = express();

require('../db/mongoose');

app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema
}))

const PORT = process.env.port||4000;

app.listen(PORT , ()=>{
    console.log(`running in ${PORT}`);
    
});