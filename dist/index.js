'use strict';

var _schema = require('./schema.js');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer;

require('babel-polyfill');

var mongoose = require('mongoose');


// configure mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password123@ds111188.mlab.com:11188/shopify', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (err, resp) {
    console.log("Connected to MongoDB");
});

var app = new ApolloServer({
    schema: _schema2.default,
    introspection: true,
    playground: true
});

app.listen({ port: process.env.PORT || 4000 }).then(function (_ref) {
    var url = _ref.url;

    console.log('\uD83D\uDE80 Server ready at ' + url);
});
//# sourceMappingURL=index.js.map