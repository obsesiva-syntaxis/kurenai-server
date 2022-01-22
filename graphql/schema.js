const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Upload
    scalar DateTime

    #Types
    type Post {
        id: ID,
        message: String,
        postDate: DateTime,
        user: User,
    }

    type Event {
        id: ID,
        title: String,
        insta: String,
        rut: String,
        name: String,
        initPayment: Int,
        totalPayment: Int,
        imgUrl: String,
        email: String,
        address: String,
        birdDate: DateTime,
        phoneNumber: String,
        start: DateTime,
        end: DateTime,
        bgColor: String,
        desc: String,
        user: User,
        hours: Int,
    }

    type User {
        id: ID,
        name: String,
        type: String,
        email: String,
        avatarUrl: String,
        password: String,
    }

    type Token {
        token: String,
    }

    type UpdateAvatar {
        status: Boolean,
        urlAvatar: String,
    }

    #inputs
    input PostInput {
        message: String!,
        postDate: DateTime,
        user: ID!,
    }

    input UserInput {
        name: String,
        email: String,
        type:String,
        password: String,
        avatarUrl: String,
    }

    input UserModifyInput {
        name: String,
        email: String,
        currentPassword: String,
        newPassword: String,
        avatarUrl: String,
    }

    input AuthInput {
        email: String!,
        password: String!,
    }

    input EventInput {
        title: String!,
        insta: String!,
        rut: String,
        name: String,
        initPayment: Int,
        totalPayment: Int,
        imgUrl: String,
        email: String,
        address: String,
        birdDate: DateTime,
        phoneNumber: String,
        start: DateTime,
        end: DateTime,
        bgColor: String,
        desc: String,
        user: ID!,
        userName: String,
        hours: Int,
    } 

    #Query
    type Query {
        #POST
        getPosts: [Post],
        #USER
        getUsers: [User],
        getUser(id: ID!): User,
        getUserAuth: User,
        #EVENT
        getEvents: [Event],
        getEventById(id: ID!): Event,
        lastEventsAdded: [Event],
        search( search: String ): [Event],
    },
    #Mutation
    type Mutation {
        #POST
        createPost(input: PostInput): Post,

        #USER
        createUser(input: UserInput): User,
        authUser(input: AuthInput): Token,
        modifyUser(input: UserModifyInput): Boolean,
        updateAvatar( file: Upload ): UpdateAvatar,

        #EVENT
        createEvent(input: EventInput): Event,
        updateEvent(id: ID!, input: EventInput): Event,
        deleteEvent(id: ID!): Event,
    },
`;

module.exports = typeDefs;