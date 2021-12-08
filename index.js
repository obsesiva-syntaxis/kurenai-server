const { ApolloServer } = require('apollo-server');
const connect = require('./database/dbConfig');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const figlet = require('figlet');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

connect();

//prepare apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {

        const token = req.headers['auth'] || '';
        if (token) {
            try {
                const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY);
                console.log('user auth: ', user);
                return { user };
            } catch (err) {
                console.log(err);
            }
        }
    }
});

//init apollo server
server.listen().then(async ({ url }) => {
    await figlet('SERVER ON', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

    console.log('---------------------------------')
    console.log(`>>>>>>>>>>>>>>> ${url}`);
});

