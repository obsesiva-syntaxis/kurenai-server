const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

require('dotenv').config({ path: '.env' });

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: process.env.PORT || 4000,
                    credentials: true
                }
            ]
        }
    }
}

//prepare apollo server
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, _) => {
    if (err) {
        console.log(err);
    } else {
        console.log('DATABAS3 CONNECTED !!!!');
        server();
    }
});

async function server(){
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.auth;
            if(token){
                try {
                    const user = jwt.verify(
                        token.replace('Bearer ', ''),
                        process.env.JWT_KEY
                    );
                    return {
                        user,
                    }
                } catch (err) {
                    console.log('########### ERROR ###########');
                    console.log(err);
                    req.headers.auth = null;
                    throw new Error('Invalid Token');
                }
            }
        }
    });

    await serverApollo.start();
    const app = express();

    app.use(cors(
        config.application.cors.server
    ));

    app.use(graphqlUploadExpress());
    serverApollo.applyMiddleware({ app });
    await new Promise((r) => app.listen({
        port: process.env.PORT || 4000
    }, r));

    console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${serverApollo.graphqlPath}`);
}

