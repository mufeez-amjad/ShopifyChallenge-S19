const { ApolloServer } = require('apollo-server');

import mongoose from 'mongoose';
import schema from './schema';

const PORT = 3000;

// configure mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shopify-challenge', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, resp){
    console.log("Connected to MongoDB");
});

const app = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
});

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
})