const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar DateTime

    #Types
    type Post {
        id: ID,
        name: String,
        message: String,
        postDate: DateTime,
        avatarUrl: String,
        userId: ID,
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
        user: ID,
        userName: String,
        hours: Int,
    }

    type User {
        id: ID,
        name: String,
        email: String,
        avatarUrl: String,
        password: String,
    }

    type Token {
        token: String,
    }

    #inputs
    input PostInput {
        name: String!,
        message: String!,
        postDate: DateTime,
        avatarUrl: String!,
        userId: ID!,
    }

    input UserInput {
        name: String!,
        email: String!,
        password: String,
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
    },
    #Mutation
    type Mutation {
        #POST
        createPost(input: PostInput): Post,

        #USER
        createUser(input: UserInput): User,
        authUser(input: AuthInput): Token,
        modifyUser(id: ID!, input: UserInput): User,

        #EVENT
        createEvent(input: EventInput): Event,
        updateEvent(id: ID!, input: EventInput): Event,
        deleteEvent(id: ID!): Event,
    },
`;

module.exports = typeDefs;