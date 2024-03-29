const Post = require('../models/Post');

async function getPosts() {
    try {
        const results = await Post.find().populate('user').sort({ postDate: -1 }).limit(10);
        return results; 
    } catch (err) {
        console.log(err);
    }
}

async function createPost( input, ctx ) {
    
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

async function deletePost( id, ctx ) {
    try {
        if(!ctx.user){
            throw new Error('Un usuario registrado debe crear el post');
        }
        await Post.findByIdAndRemove( id );
        return 'Post Eliminado';
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getPosts,
    createPost,
    deletePost,
}