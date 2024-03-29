const { DateTimeResolver } = require('graphql-scalars');
const { GraphQLUpload } = require('graphql-upload');
require('dotenv').config({ path: '.env' });

const userController = require('../controllers/user');
const eventController = require('../controllers/event');
const postController = require('../controllers/post');

const resolvers = {
    Upload: GraphQLUpload,
    DateTime: DateTimeResolver,
    Query: {
        //User
        getUsers: () => userController.getUsers(),
        getUser: (_, { id }) => userController.getUser( id ),
        getUserAuth: (_, {}, ctx) => userController.getUserAuth( ctx ),
        //Events
        getEvents: () => eventController.getEvents(),
        getEventById: (_, { id }) => eventController.getEventById( id ),
        lastEventsAdded: (_, {}) => eventController.lastEventsAdded(),
        search: (_, { search }) => eventController.search( search ),
        todayEvent: () => eventController.todayEvent(),
        tomorrowEvent: () => eventController.tomorrowEvent(),
        //Post
        getPosts: () => postController.getPosts(),
    },
    Mutation: {
        //USER
        createUser: (_, { input }) => userController.createUser( input ),
        authUser: (_, { input }) => userController.authUser( input ),
        modifyUser: (_, { input }, ctx) => userController.modifyUser( input, ctx ),
        updateAvatar: (_, { file }, ctx) => userController.updateAvatar( file, ctx ),
        deleteUser: (_, { id }, ctx) => userController.deleteUser( id, ctx ),
        //Event
        createEvent: (_, { input }, ctx) => eventController.createEvent( input, ctx ),
        updateEvent: (_, { id, input }, ctx) => eventController.updateEvent( id, input, ctx ),
        deleteEvent: (_, { id }, ctx ) => eventController.deleteEvent( id, ctx ),
        //Post
        createPost: (_, { input }, ctx) => postController.createPost( input, ctx ),
        deletePost: (_, { id }, ctx) => postController.deletePost(id, ctx),
    },
}

module.exports = resolvers;

