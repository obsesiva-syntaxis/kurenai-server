const { DateTimeResolver } = require('graphql-scalars');
require('dotenv').config({ path: '.env' });

const userController = require('../controllers/user');
const eventController = require('../controllers/event');
const postController = require('../controllers/post');

const resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        getUsers: () => userController.getUsers(),
        getUser: (_, { id }) => userController.getUser( id ),
        getUserAuth: (_, {}, ctx) => userController.getUserAuth( ctx ),
        getEvents: () => eventController.getEvents(),
        getEventById: (_, { id }) => eventController.getEventById( id ),
        lastEventsAdded: (_, {}) => eventController.lastEventsAdded(),
        getPosts: () => postController.getPosts(),
    },
    Mutation: {
        createUser: (_, { input }) => userController.createUser( input ),
        authUser: (_, { input }) => userController.authUser( input ),
        modifyUser: (_, { input }) => userController.modifyUser( input ),
        createEvent: (_, { input }, ctx) => eventController.createEvent( input, ctx ),
        updateEvent: (_, { id, input }, ctx) => eventController.updateEvent( id, input, ctx ),
        deleteEvent: (_, { id }, ctx ) => eventController.deleteEvent( id, ctx ),
        createPost: (_, { input }, ctx) => postController.createPost( input, ctx ),
    },
}

module.exports = resolvers;

