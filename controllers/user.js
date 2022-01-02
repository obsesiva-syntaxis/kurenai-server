//Utils
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const awsUploadImage = require('../utils/aws-upload-image');
const User = require('../models/User');

const newToken = (user, key, expiresIn) => {
    const { id, email, name, avatarUrl } = user;
    return jwt.sign({ id, email, name, avatarUrl }, key, { expiresIn });
}

async function getUsers() {
    try {
        const result = await User.find({});
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const result = await User.findById(id);
        return result;
    } catch (error) {
        console.log('Usuario no encontrado');
    }
}

async function getUserAuth(ctx) {
    try {
        return ctx.user;
    } catch (err) {
        console.log(err);
    }
}

async function createUser(input) {
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
}

async function authUser(input) {
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
}

async function modifyUser(input) {
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
}

async function updateAvatar( file, ctx ) {
    const { id } = ctx.user;
    console.log(id);

    return null;
}

module.exports = {
    getUsers,
    getUser,
    getUserAuth,
    createUser,
    authUser,
    modifyUser,
}