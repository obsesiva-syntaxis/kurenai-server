//Utils
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DateTimeResolver } = require('graphql-scalars');
require('dotenv').config({ path: '.env' });

//models
const User = require('../models/User');
const Event = require('../models/Event');
const Post = require('../models/Post');



const newToken = (user, key, expiresIn) => {
    const { id, email, name, avatarUrl } = user;
    return jwt.sign({ id, email, name, avatarUrl }, key, { expiresIn });
}

const resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        //------------ User ------------
        getUsers: async () => {
            try {
                const result = await User.find({});
                return result;
            } catch (err) {
                console.log(err);
            }
        },
        getUser: async (_, { id }, ctx) => {
            try {
                const result = await User.findById(id);
                return result;
            } catch (error) {
                console.log('Usuario no encontrado');
            }
        },
        getUserAuth: async (_, {}, ctx) => {
            try {
                return ctx.user;
            } catch (err) {
                console.log(err);
            }
        },
        //------------ Event ------------
        getEvents: async (_, { }, ctx) => {
            try {
                const result = Event.find({});
                return result;
            } catch (err) {
                console.log(err);
            }
        },
        getEventById: async (_, { id }, ctx) => {
            try {
                const result = await Event.findById(id);
                return result;
            } catch (err) {
                console.log(err);
            }
        },
        //------------ Post ------------
        getPosts: async () => {
            try {
                const result = Post.find({});
                return result; 
            } catch (err) {
                console.log(err);
            }
        },
        
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const { email, password } = input;
            //Validator I: Si ya Existe
            const userFounded = await User.findOne({ email });
            if (userFounded) { throw new Error('El usuario ya esta registrado'); }
            //hashing the pwd
            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hash(password, salt);
            //save in db
            try {
                const newUser = new User(input);
                const result = await newUser.save();
                return result;
            } catch (err) {
                console.log(err);
            }
        },
        authUser: async (_, { input }) => {
            const { email, password } = input;
            //Validator I: Si no Existe
            const userFounded = await User.findOne({ email });
            if (!userFounded) { throw new Error('El usuario no se encuentra en nuestros datos'); }
            //Validator II: compare password
            const validPass = await bcryptjs.compare(password, userFounded.password);
            if (!validPass) { throw new Error('Password incorrecto'); }
            //Authenticar with new token
            return {
                token: newToken(userFounded, process.env.JWT_KEY, '3h')
            }
        },
        modifyUser: async (_, { id, input }, ctx) => {
            //Validator III: compare id of user auth
            if (id !== ctx.user.id.toString()) {
                throw new Error('Los datos ingresados no coinciden con el usuario autenticado');
            }

            //modify the items
            // const salt = await bcryptjs.genSaltSync(10);
            // input.password = await bcryptjs.hash(password, salt);
            try {
                const result = await User.findOneAndUpdate({ _id: id }, input, { new: true });
                //then show result
                return result;
            } catch (err) {
                console.log(err);
            }
        },
        createEvent: async (_, { input }, ctx) => {
            //Validator IV: user who create event must be exist 
            if (!ctx.user) {
                throw new Error('Un usuario registrado debe crear el evento');
            }
            const newEvent = new Event(input);
            // newEvent.start
            try {
                const result = await newEvent.save();
                return result;
            } catch (err) {
                console.log(err);
            }

        },
        updateEvent: async (_, { id, input }, ctx) => {
            if (!ctx.user) {
                throw new Error('Un usuario registrado debe crear el evento');
            }
            try {
                const result = await Event.findOneAndUpdate({ _id: id }, input, { new: true });
                console.log(result);
                return result;
            } catch (err) {
                console.log(err);
            }
        },
        deleteEvent: async (_, { id }, ctx ) => {
            if (!ctx.user) {
                throw new Error('Un usuario registrado debe crear el evento');
            }
            try {
                await Event.findByIdAndRemove({ _id: id });
                return "Evento Eliminado!"
            } catch (err) {
                console.log(err);
            }
        },
        createPost: async (_, { input }, ctx) => {
            if(!ctx.user){
                throw new Error('Un usuario registrado debe crear el post');
            }
            const newPost = new Post(input);
            // newEvent.start
            try {
                const result = await newPost.save();
                return result;
            } catch (err) {
                console.log(err);
            }
        }
    },
}

module.exports = resolvers;

