import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';
const app = express();
const PORT = 3000;

// configure mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shopify-challenge', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, resp){
    console.log("Connected to MongoDB");
});

//set default route
app.get('/', (req, res) => {
    return res.json({
        msg: 'Shopify Backend Challenge'
    })
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}));

app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
})