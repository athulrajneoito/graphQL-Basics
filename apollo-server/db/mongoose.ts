import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/GraphQLServerBasics', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
mongoose.connection.once('open',()=>{
    console.log('db connected')
})
