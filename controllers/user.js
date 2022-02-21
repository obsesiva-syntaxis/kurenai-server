//Utils
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const awsUploadImage = require('../utils/aws-upload-image');
const User = require('../models/User');

const newToken = (user, key, expiresIn) => {
    const { id, email, name, avatarUrl, type } = user;
    return jwt.sign({ id, email, name, avatarUrl, type }, key, { expiresIn });
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
    if (userFounded) { throw new Error('Datos incorrectos!'); }
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
    if (!userFounded) { throw new Error('Datos incorrectos!'); }
    //Validator II: compare password
    const validPass = await bcryptjs.compare(password, userFounded.password);
    if (!validPass) { throw new Error('Datos incorrectos!'); }
    //Authenticar with new token
    return {
        token: newToken(userFounded, process.env.JWT_KEY, '3h')
    }
}

async function modifyUser(input, ctx) {
    const { id } = ctx.user;
    try {
        if (input.currentPassword && input.newPassword) {
            const userFound = await User.findById(id);
            const passwordSuccess = await bcryptjs.compare(
                input.currentPassword,
                userFound.password
            )
            if (!passwordSuccess) throw new Error('Datos incorrectos!');
            const salt = await bcryptjs.genSaltSync(10);
            const newPasswordCrypt = await bcryptjs.hash(input.newPassword, salt);
            await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
        } else {
            await User.findByIdAndUpdate(id, input);
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateAvatar( file, ctx ) {
    const { id } = ctx.user;
    const { createReadStream, mimetype } = await file;
    const ext = mimetype.split('/')[1];
    const imageName = `avatar/${ id }.${ext}`;
    const fileData = createReadStream();

    try {
        const result = await awsUploadImage(fileData, imageName);
        console.log(result);
        await User.findByIdAndUpdate(id, { avatarUrl: result });
        return {
            status: true,
            urlAvatar: result,
        }
    } catch (err) {
        return {
            status: true,
            urlAvatar: null,
        }
    }
}

async function deleteUser( id, ctx ){
    try{
        await User.findByIdAndRemove( id );
        return 'Usuario eliminado';
    } catch( err ){
        console.log(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    getUserAuth,
    createUser,
    authUser,
    modifyUser,
    updateAvatar,
    deleteUser,
}